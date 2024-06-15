package omods.core.controller;

import lombok.RequiredArgsConstructor;
import omods.core.dto.AuthRequest;
import omods.core.dto.AuthResponse;
import omods.core.dto.UserDetails;
import omods.core.dto.UserDto;
import omods.core.service.impl.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(path = "/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @CrossOrigin
    @PostMapping("/register")
    public ResponseEntity<String> registerNewUser(@RequestBody UserDto userDto){
        return userService.registerNewUser(userDto);
    }

    //initially user will have also token
    @CrossOrigin
    @PostMapping("/complete-profile")
    public ResponseEntity<AuthResponse> completeProfile(
            @RequestParam(name = "email", required = false) String email,
            @RequestParam(name = "job", required = false) String job,
            @RequestParam(name = "location", required = false) String location,
            @RequestParam(name = "role", required = false) String role,
            @RequestParam(name = "topic", required = false) String topic,
            @RequestParam(name = "image", required = false) MultipartFile image
    ){
      return userService.completeProfile(email, job, location, role,topic, image);
    }

    @CrossOrigin
    @PostMapping("/forget-password")
    public ResponseEntity<String> forgetPassword(@RequestParam String email){
        return userService.forgetPassword(email);
    }

    @CrossOrigin
    //login goes here
    @PostMapping("/authenticate")
    public ResponseEntity<AuthResponse> authenticate(@RequestBody AuthRequest authRequest){
        return userService.authenticate(authRequest);
    }

    @CrossOrigin
    @GetMapping("/user-details")
    public ResponseEntity<List<UserDetails>> getUserProfile(){
        return userService.getUsersProfile();
    }

    @CrossOrigin
    @GetMapping("/{userId}")
    public ResponseEntity<Object> getUser(@PathVariable("userId") String userId){
        return userService.findUser(userId);
    }
}
