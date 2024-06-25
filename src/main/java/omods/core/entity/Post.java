package omods.core.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "post")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Post {
    @Id
    @SequenceGenerator(
            name = "post_sequence",
            sequenceName = "post_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "post_sequence"
    )
    private Long postId;

    //user can have many posts and each post is related to only one user
    @ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "userID")
    private User user;

    @Column(name = "description", nullable = false)
    private String postContent;
    @Column(name = "image_url", nullable = false)
    private String postImage;
    @Column(name = "posted_from"/*, nullable = false*/)
    private String location;
    @Column(name = "createdAt", nullable = false)
    private LocalDateTime postCreatedAt;
    @Column(name = "updatedAt")
    private LocalDateTime postUpdatedAt;
    @PrePersist
    public void onCreate(){
        postCreatedAt = LocalDateTime.now().withNano(0);
    }

    @PreUpdate
    public void onUpdate(){
        postUpdatedAt= LocalDateTime.now().withNano(0);
    }

}
