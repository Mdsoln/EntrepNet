package omods.core.service.inter;

import omods.core.dto.PostData;
import omods.core.users.Post;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface PostService {

    ResponseEntity<Post> createPost(String postContent, String postedFrom, MultipartFile imagePath);
}
