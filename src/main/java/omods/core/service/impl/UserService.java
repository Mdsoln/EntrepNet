package omods.core.service.impl;

import lombok.RequiredArgsConstructor;
import omods.core.constants.Roles;
import omods.core.dto.UserDto;
import omods.core.exc.EmailExistException;
import omods.core.repo.UserRepository;
import omods.core.service.inter.UserServiceInterface;
import omods.core.users.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService implements UserServiceInterface {

    private final UserRepository userRepository;
    @Override
    public ResponseEntity<String> registerNewUser(UserDto userDto) {
        try {
            User existUser = userRepository.findByEmail(userDto.getEmail());
            if (existUser != null){
                throw new EmailExistException("Already exists user with same email!");
            }

            User newUser = new User();
            newUser.setName(userDto.getFirstname() + " " + userDto.getSurname());
            newUser.setEmail(newUser.getEmail());
            newUser.setPsw(userDto.getPsw());
            newUser.setMobile(userDto.getMobile());
            if (userDto.getRole().equalsIgnoreCase("MENTOR")){
                newUser.setRoles(Roles.MENTOR);
            } else if (userDto.getRole().equalsIgnoreCase("ENTREPRENEUR")) {
                newUser.setRoles(Roles.ENTREPRENEUR);
            }else {
                newUser.setRoles(Roles.ADMIN);
            }

            userRepository.save(newUser);
            return ResponseEntity.ok("You have successfully created your account");
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to save user: " + e.getMessage());
        }
    }
}
