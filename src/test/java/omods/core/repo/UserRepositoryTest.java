package omods.core.repo;

import omods.core.dto.UserDto;
import omods.core.service.impl.UserService;
import omods.core.users.User;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
class UserRepositoryTest {
    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;
    @Test
    public void saveNewUser(){
        UserDto userDto = new UserDto(
                "Muddy","Fakih","muddyfakih98@gmail.com",
                "0717611117","mdsoln123","ENTREPRENEUR"
        );

        ResponseEntity<String> responseEntity = userService.registerNewUser(userDto);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("You have successfully created your account", responseEntity.getBody());

    }

}