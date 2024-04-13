package omods.core.controller;


import lombok.RequiredArgsConstructor;
import omods.core.service.impl.PostServiceImpl;
import omods.core.users.Post;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(path = "/api/v1/post")
@RequiredArgsConstructor
public class PostCreationController {
   private final PostServiceImpl postService;

   @PostMapping("/createPost")
   public ResponseEntity<Post> createPost(
           @RequestParam(name = "postContent", required = false) String postContent,
           @RequestParam(name = "postedFrom", required = false) String postedFrom,
           @RequestParam(name = "imagePath", required = false) MultipartFile imagePath
           ){
      return postService.createPost(postContent, postedFrom, imagePath);
   }
}
