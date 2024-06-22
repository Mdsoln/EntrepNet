package omods.core.dto;


import lombok.Getter;
import lombok.Setter;
import omods.core.constants.Roles;

import java.time.LocalDateTime;

@Getter
@Setter
public class PostResponseDto {
    private Long postId;
    private String postContent;
    private String postImage;
    private String location;
    private LocalDateTime postCreatedAt;
    private String userName;
    private String userEmail;
    private String userMobile;
    private String userJob;
    private String userPicture;
    private Roles userRole;
}
