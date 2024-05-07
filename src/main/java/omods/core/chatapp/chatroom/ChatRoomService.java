package omods.core.chatapp.chatroom;

import lombok.RequiredArgsConstructor;
import omods.core.repo.ChatRoomRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChatRoomService {

    private final ChatRoomRepository chatRoomRepo;


    public Optional<String> getChatRoomId(
            String senderId,
            String receiverId,
            boolean createNewRoomIfNotExists
    ){
        return chatRoomRepo.findBySenderIdAndReceiverId(senderId, receiverId)
                .map(ChatRoom::getChatId)
                .or(()->{
                    if (createNewRoomIfNotExists){
                        var chatId = createChatId(senderId, receiverId);
                        return Optional.of(chatId);
                    }
                    return Optional.empty();
                });
    }

    private String createChatId(String senderId, String receiverId) {
        var charId = String.format("%s_%s", senderId,receiverId);

        ChatRoom senderRecipient = ChatRoom.builder()
                .chatId(charId)
                .senderId(senderId)
                .receiverId(receiverId)
                .build();

        ChatRoom recipientSender = ChatRoom.builder()
                .chatId(charId)
                .senderId(receiverId)
                .receiverId(senderId)
                .build();

        chatRoomRepo.save(senderRecipient);
        chatRoomRepo.save(recipientSender);

        return charId;
    }
}
