package omods.core.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import omods.core.constants.Roles;
import omods.core.constants.Status;
import omods.core.dto.*;
import omods.core.exc.EmailExistException;
import omods.core.exc.ExceptionHandlerManager;
import omods.core.jwt.service.JwtService;
import omods.core.repo.ProfileRepo;
import omods.core.repo.UserRepository;
import omods.core.service.inter.UserServiceInterface;
import omods.core.service.notify.impl.NotificationServiceImpl;
import omods.core.entity.Profile;
import omods.core.entity.User;
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
import java.util.*;
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
            newUser.setStatus(Status.ONLINE);

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
    public ResponseEntity<AuthResponse> completeProfile(String email, String job, String location, String role,String topic, MultipartFile image) {
        try {
            User creator = userRepository.findByEmail(email);
            if (creator == null){
                throw new ExceptionHandlerManager("Oops! email not matches with any user");
            }

            creator.setRoles(role.equalsIgnoreCase("MENTOR") ? Roles.MENTOR : Roles.ENTREPRENEUR);

            userRepository.save(creator);

            Profile profile = Profile
                    .builder()
                    .job(job)
                    .imagePath(storeImages(image))
                    .locatedAt(location)
                    .topic(topic)
                    .user(creator)
                    .build();
            profileRepo.save(profile);

            Map<String, Object> extraClaims = new HashMap<>();
            extraClaims.put("role", creator.getAuthorities());
            extraClaims.put("userID", creator.getRegNo());
            extraClaims.put("name", creator.getName());
            extraClaims.put("phone", creator.getMobile());
            extraClaims.put("job", jwtService.getJob(creator.getUserID()));
            extraClaims.put("image", jwtService.getImages(creator.getUserID()));

            var token = jwtService.generateToken(extraClaims,creator);
            return ResponseEntity.ok(AuthResponse.builder().token(token).build());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        catch (AuthenticationException handleExceptions){
            AuthResponse error = AuthResponse.builder().token("Error: "+handleExceptions.getMessage()).build();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
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

    public String storeImages(MultipartFile image) throws IOException {
        try {
            if (image == null || image.isEmpty()) {
                throw new ExceptionHandlerManager("Image file is null or empty");
            }

            String uploadDirectory = "src/main/resources/static/images";
            String imageName = StringUtils.cleanPath(Objects.requireNonNull(image.getOriginalFilename()));

            if (imageName.contains("..")) {
                throw new IllegalArgumentException("Invalid file format");
            }

            Path uploadPath = Paths.get(uploadDirectory);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            Path filePath = uploadPath.resolve(imageName);
            Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            return imageName;
        }catch (ExceptionHandlerManager exc){
            throw new ExceptionHandlerManager("Error: "+ exc.getMessage());
        }
    }
}
