package omods.core.service.inter;

import omods.core.dto.PostResponseDto;
import omods.core.entity.Post;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;


public interface PostService {

    ResponseEntity<PostResponseDto> createPost(String senderID, String postContent, String postedFrom, MultipartFile imagePath);

    ResponseEntity<String> getImagePath(String imageName);
}
