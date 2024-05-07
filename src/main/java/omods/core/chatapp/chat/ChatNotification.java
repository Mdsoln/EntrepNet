package omods.core.chatapp.chat;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatNotification {

    private Long id;
    private String senderId;
    private String receiverId;
    private String content;
}
