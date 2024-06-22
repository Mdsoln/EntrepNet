package omods.core.chatapp.chat;


import lombok.RequiredArgsConstructor;
import omods.core.constants.Status;
import omods.core.entity.User;
import omods.core.repo.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class ChatService {

    private final UserRepository userRepo;


    public void disconnect(User user){
        User existUser = userRepo.findByRegNo(user.getRegNo());
        if (existUser != null){
            existUser.setStatus(Status.OFFLINE);
        }
    }

    public List<User> findConnectedUsers(){
        return userRepo.findByStatus(Status.ONLINE);
    }
}
