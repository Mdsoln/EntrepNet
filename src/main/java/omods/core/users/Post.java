package omods.core.users;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

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

    @Column(name = "description", nullable = false)
    private String postContent;
    @Column(name = "image_url", nullable = false)
    private String postImage;
    @Column(name = "posted_from", nullable = false)
    private String location;
    @Column(name = "createdAt", nullable = false)
    private LocalDate postCreatedAt;
    @Column(name = "updatedAt")
    private LocalDate postUpdatedAt;
    @PrePersist
    public void onCreate(){
        postCreatedAt = LocalDate.now();
    }

    @PreUpdate
    public void onUpdate(){
        postUpdatedAt= LocalDate.now();
    }

}
