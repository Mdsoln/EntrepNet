package omods.core.service.inter;

import omods.core.dto.ProfileDetails;
import omods.core.dto.UserDetails;
import omods.core.dto.UserDto;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserServiceInterface {

    ResponseEntity<String> registerNewUser(UserDto userDto);

    ResponseEntity<String> completeProfile(ProfileDetails profileDetails);

    ResponseEntity<String> forgetPassword(String email);

    /*ResponseEntity<List<UserDetails>> getUsersProfile();*/
}
