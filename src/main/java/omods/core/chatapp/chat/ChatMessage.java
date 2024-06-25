package omods.core.chatapp.chat;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Entity
public class ChatMessage {
    @Id
    @SequenceGenerator(
            name = "chatapp_sequence",
            sequenceName = "chatapp_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "chatapp_sequence"
    )
    private Long id;

    private String chatId;
    private String receiver;
    private String content;
    private String sender;
    private LocalDateTime timestamp;
}
