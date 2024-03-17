package omods.core.service.inter;

import omods.core.dto.UserDto;
import org.springframework.http.ResponseEntity;

public interface UserServiceInterface {

    ResponseEntity<String> registerNewUser(UserDto userDto);

}
