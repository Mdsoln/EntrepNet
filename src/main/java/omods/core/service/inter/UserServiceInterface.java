package omods.core.service.inter;

import omods.core.dto.AuthRequest;
import omods.core.dto.AuthResponse;
import omods.core.dto.UserDetails;
import omods.core.dto.UserDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserServiceInterface {

    ResponseEntity<String> registerNewUser(UserDto userDto);
    
    ResponseEntity<String> forgetPassword(String email);

    ResponseEntity<List<UserDetails>> getUsersProfile();

    ResponseEntity<AuthResponse> completeProfile(String email, String job, String locatedAt, String role, MultipartFile imagePath);

    ResponseEntity<AuthResponse> authenticate(AuthRequest authRequest);

    ResponseEntity<Object> findUser(Long userId);

}
