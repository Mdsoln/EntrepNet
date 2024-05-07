package omods.core.chatapp.chatroom;


import jakarta.persistence.*;
import lombok.*;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Entity
public class ChatRoom {
    @Id
    @SequenceGenerator(
            name = "chatroom_sequence",
            sequenceName = "chatroom_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "chatroom_sequence"
    )
    private Long id;

    private String chatId;
    private String senderId;
    private String receiverId;
}
