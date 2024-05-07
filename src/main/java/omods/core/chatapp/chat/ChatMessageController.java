package omods.core.chatapp.chat;

import lombok.RequiredArgsConstructor;
import omods.core.entity.User;
import omods.core.repo.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class ChatMessageController {

    private final ChatService chatService;
    private final UserRepository userRepo;


    @MessageMapping("/users.addUser")
    @SendTo("/users/topic")
    public User addUser(@Payload String userId){
        return userRepo.findByRegNo(userId);
    }

    @MessageMapping("/users.disconnectUser")
    @SendTo("/users/topic")
    public User disconnectUser(@Payload String userId){
        User connectedUser = userRepo.findByRegNo(userId);
        if (connectedUser != null){
            chatService.disconnect(connectedUser);
        }
        return connectedUser;
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> findConnectedUsers(){
        return ResponseEntity.ok(chatService.findConnectedUsers());
    }

}
