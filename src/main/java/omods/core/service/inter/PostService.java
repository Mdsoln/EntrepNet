package omods.core.service.inter;

import omods.core.entity.Post;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PostService {

    ResponseEntity<Post> createPost(String postContent, String postedFrom, MultipartFile imagePath);

    List<Post> getRecentPosts();
}
