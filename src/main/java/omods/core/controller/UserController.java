package omods.core.controller;

import lombok.RequiredArgsConstructor;
import omods.core.dto.UserDto;
import omods.core.service.impl.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> registerNewUser(@RequestBody UserDto userDto){
        return userService.registerNewUser(userDto);
    }
}
