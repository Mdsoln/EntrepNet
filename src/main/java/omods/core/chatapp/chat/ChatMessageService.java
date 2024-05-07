package omods.core.chatapp.chat;


import lombok.RequiredArgsConstructor;
import omods.core.chatapp.chatroom.ChatRoomService;
import omods.core.repo.ChatMessageRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatMessageService {

    private final ChatMessageRepository chatMessageRepo;
    private final ChatRoomService chatRoomService;

    public ChatMessage save(ChatMessage chatMessage){
        var charId = chatRoomService.getChatRoomId(
                chatMessage.getSender(),
                chatMessage.getReceiver(),
                true
        ).orElseThrow();
        chatMessage.setChatId(charId);
        chatMessageRepo.save(chatMessage);
        return chatMessage;
    }

    public List<ChatMessage> findChatMessage(
            String senderId, String recipientId
    ){
        var charId = chatRoomService.getChatRoomId(
                senderId,
                recipientId,
                false
        );

        return charId.map(chatMessageRepo::findByChatId)
                .orElse(new ArrayList<>());
    }
}
