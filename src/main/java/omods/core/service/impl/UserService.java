package omods.core.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import omods.core.constants.Roles;
import omods.core.dto.ProfileDetails;
import omods.core.dto.UserDetails;
import omods.core.dto.UserDto;
import omods.core.exc.EmailExistException;
import omods.core.exc.ExceptionHandlerManager;
import omods.core.repo.ProfileRepo;
import omods.core.repo.UserRepository;
import omods.core.service.inter.UserServiceInterface;
import omods.core.service.notify.impl.NotificationServiceImpl;
import omods.core.users.Profile;
import omods.core.users.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService implements UserServiceInterface {

    private final UserRepository userRepository;
    private final ProfileRepo profileRepo;
    private final NotificationServiceImpl notification;

    @Override
    public ResponseEntity<String> registerNewUser(UserDto userDto) {
        try {
            User existUser = userRepository.findByEmail(userDto.getEmail());
            if (existUser != null){
                throw new EmailExistException("Already exists user with same email!");
            }

            User newUser = getNewUser(userDto);
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
    public ResponseEntity<String> completeProfile(ProfileDetails profileDetails) {
        try {
            User creator = userRepository.findByEmail(profileDetails.getEmail());
            if (creator == null){
                throw new ExceptionHandlerManager("User not found with email: "+ profileDetails.getEmail());
            }

            if (profileDetails.getUserClaims().isEmpty()) {
                throw new ExceptionHandlerManager("Missing user claims in profile details");
            }

            String userRole = profileDetails.getUserClaims().getFirst().getRole();
            String topic = profileDetails.getUserClaims().getFirst().getTopic();

            if (userRole.equalsIgnoreCase("MENTOR")){
                creator.setRoles(Roles.MENTOR);
            } else if (userRole.equalsIgnoreCase("ENTREPRENEUR")) {
                creator.setRoles(Roles.ENTREPRENEUR);
            } else {
                creator.setRoles(Roles.ADMIN);
            }

            userRepository.save(creator);

            Profile profile = Profile
                    .builder()
                    .job(profileDetails.getJob())
                    .topic(topic)
                    .locatedAt(profileDetails.getLocatedAt())
                    .user(creator)
                    .build();
            profileRepo.save(profile);

            return ResponseEntity.ok("Profile completed successfully");

        }catch (ExceptionHandlerManager handlerManager){
            throw new ExceptionHandlerManager("Error: "+handlerManager.getMessage());
        }catch (Exception e) {
            log.info("Error completing profile: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error");
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

 /*   @Override
    public ResponseEntity<List<UserDetails>> getUsersProfile() {
        try {
            List<User> = userRepository.findUserProfile();

        }
    }*/

    private static User getNewUser(UserDto userDto) {
        User newUser = new User();
        newUser.setName(userDto.getFirstname() + " " + userDto.getSurname());
        newUser.setEmail(userDto.getEmail());
        newUser.setPsw(userDto.getPsw());
        newUser.setMobile(userDto.getMobile());
        /*if (userDto.getRole().equalsIgnoreCase("MENTOR")){
            newUser.setRoles(Roles.MENTOR);
        } else if (userDto.getRole().equalsIgnoreCase("ENTREPRENEUR")) {
            newUser.setRoles(Roles.ENTREPRENEUR);
        }else {
            newUser.setRoles(Roles.ADMIN);
        }*/
        return newUser;
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
}
