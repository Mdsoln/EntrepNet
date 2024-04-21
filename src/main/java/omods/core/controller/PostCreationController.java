package omods.core.controller;


import lombok.RequiredArgsConstructor;
import omods.core.service.impl.PostServiceImpl;
import omods.core.users.Post;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

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
           ){//list of images or one image
      return postService.createPost(postContent, postedFrom, imagePath);
   }

   @GetMapping("/recentPosts")
   public ResponseEntity<List<Post>> getRecentPosts(){
      List<Post> recentPosts = postService.getRecentPosts();
      return ResponseEntity.ok(recentPosts);
   }
   
}
