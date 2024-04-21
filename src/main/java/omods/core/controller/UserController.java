package omods.core.controller;

import lombok.RequiredArgsConstructor;
import omods.core.dto.ProfileDetails;
import omods.core.dto.UserDetails;
import omods.core.dto.UserDto;
import omods.core.service.impl.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> registerNewUser(@RequestBody UserDto userDto){
        return userService.registerNewUser(userDto);
    }

    @PostMapping("/complete-profile")
    public ResponseEntity<String> completeProfile(@RequestBody ProfileDetails profileDetails){
      return userService.completeProfile(profileDetails);
    }

    @PostMapping("/forget-password")
    public ResponseEntity<String> forgetPassword(@RequestParam String email){
        return userService.forgetPassword(email);
    }

    //query name, Job, role, image

   /* @GetMapping("/user-details")
    public ResponseEntity<List<UserDetails>> getUserProfile(){
        return userService.getUsersProfile();
    }*/
}
