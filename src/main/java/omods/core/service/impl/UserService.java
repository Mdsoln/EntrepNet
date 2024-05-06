package omods.core.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import omods.core.constants.Roles;
import omods.core.dto.*;
import omods.core.exc.EmailExistException;
import omods.core.exc.ExceptionHandlerManager;
import omods.core.jwt.service.JwtService;
import omods.core.repo.ProfileRepo;
import omods.core.repo.UserRepository;
import omods.core.service.inter.UserServiceInterface;
import omods.core.service.notify.impl.NotificationServiceImpl;
import omods.core.users.Profile;
import omods.core.users.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Objects;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService implements UserServiceInterface {

    private final UserRepository userRepository;
    private final ProfileRepo profileRepo;
    private final NotificationServiceImpl notification;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    @Override
    public ResponseEntity<String> registerNewUser(UserDto userDto) {
        try {
            User existUser = userRepository.findByEmail(userDto.getEmail());
            if (existUser != null){
                throw new EmailExistException("Already exists user with same email!");
            }

            User newUser = new User();
            newUser.setName(userDto.getFirstname() + " " + userDto.getSurname());
            newUser.setRegNo(uniqueUserId());
            newUser.setEmail(userDto.getEmail());
            newUser.setPsw(passwordEncoder.encode(userDto.getPsw()));
            newUser.setMobile(userDto.getMobile());

            userRepository.save(newUser);
            return ResponseEntity.ok("Email: " + userDto.getEmail());

        }catch (EmailExistException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error: "+ e.getMessage());
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to save user: " + e.getMessage());
        }
    }


    @Override
    public ResponseEntity<String> forgetPassword(String email) {
        try {
            User existUser = userRepository.findByEmail(email);
            if (existUser == null){
                throw new EmailExistException("Error: Invalid email or User not found");
            }

            String newPassword = generateRandomPassword();
            existUser.setPsw(newPassword);
            userRepository.save(existUser);

            String response = String.valueOf(notification.sendPassword(newPassword,existUser.getMobile()));
            return ResponseEntity.ok(response);
        }
        catch (EmailExistException exception){
            throw new EmailExistException(exception.getMessage());
        }
        catch (Exception exception){
            throw new ExceptionHandlerManager(exception.getMessage());
        }

    }


    @Override
    public ResponseEntity<List<UserDetails>> getUsersProfile() {
        try {
            List<User> users = userRepository.findUserProfile();

            List<UserDetails> userDetailsList = users.stream()
                    .map(user -> new UserDetails(
                            user.getProfile() != null ? user.getProfile().getJob() : null,
                            user.getProfile() != null ? user.getProfile().getImagePath() : null,
                            user.getName(),
                            user.getRoles().toString()))
                    .collect(Collectors.toList());

            return ResponseEntity.ok(userDetailsList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @Override
    public ResponseEntity<AuthResponse> completeProfile(String email, String job, String locatedAt, String role, MultipartFile imagePath) {
        try {
            User creator = userRepository.findByEmail(email);
            if (creator == null){
                throw new ExceptionHandlerManager("Oops! email not matches with any user");
            }

            if (role.equalsIgnoreCase("MENTOR")){
                creator.setRoles(Roles.MENTOR);
            } else if (role.equalsIgnoreCase("ENTREPRENEUR")) {
                creator.setRoles(Roles.ENTREPRENEUR);
            }

            userRepository.save(creator);

            Profile profile = Profile
                    .builder()
                    .job(job)
                    .imagePath(storeImages(imagePath))
                    .locatedAt(locatedAt)
                    .user(creator)
                    .build();
            profileRepo.save(profile);

            var token = jwtService.generateToken(creator);
            return ResponseEntity.ok(AuthResponse.builder().token(token).build());

        }catch (ExceptionHandlerManager exceptions){
            AuthResponse authResponse = new AuthResponse(exceptions.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(authResponse);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public ResponseEntity<AuthResponse> authenticate(AuthRequest authRequest) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authRequest.getEmail(),
                            authRequest.getPassword()
                    )
            );

            var user = userRepository.findByEmail(authRequest.getEmail());
            var token = jwtService.generateToken(user);
            return ResponseEntity.ok(AuthResponse.builder().token(token).build());

        }catch (AuthenticationException handleExceptions){
            AuthResponse error = AuthResponse.builder().token("Error: "+handleExceptions.getMessage()).build();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }
    }

    @Override
    public ResponseEntity<Object> findUser(String userId) {
       UserResponse response = userRepository.findByUserId(userId);
        if (response == null){
            throw new ExceptionHandlerManager("User not found!");
        }

        String uploadDirectory = "static/images/";
        response.setImagePath(uploadDirectory+response.getImagePath());

        return ResponseEntity.ok(response);
    }

    private static String uniqueUserId() {
        int registrationUnitLength = 5;
        StringBuilder builder = new StringBuilder();

        Random random = new Random();
        for (int i=0; i < registrationUnitLength; i++){
            int digit = random.nextInt(10);
            builder.append(digit);
        }
        return "EN-"+builder;
    }

    private String generateRandomPassword(){
        int passwordLength = 5;
        StringBuilder builder = new StringBuilder();

        Random random = new Random();
        for (int i=0; i < passwordLength; i++){
            int digit = random.nextInt(10);
            builder.append(digit);
        }
        return builder.toString();
    }

    public String storeImages(MultipartFile imageUrl) throws IOException {
        if (imageUrl == null || imageUrl.isEmpty()) {
            throw new IllegalArgumentException("Image file is null or empty");
        }

        String uploadDirectory = "static/images";
        String imageName = StringUtils.cleanPath(Objects.requireNonNull(imageUrl.getOriginalFilename()));

        if (imageName.contains("..")) {
            throw new IllegalArgumentException("Invalid file format");
        }

        Path uploadPath = Paths.get(uploadDirectory);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        Path filePath = uploadPath.resolve(imageName);
        Files.copy(imageUrl.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return imageName;
    }
}
