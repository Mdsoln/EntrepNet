package omods.core.controller;


import lombok.RequiredArgsConstructor;
import omods.core.service.impl.PostServiceImpl;
import omods.core.entity.Post;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(path = "/api/v1/post")
@RequiredArgsConstructor
public class PostCreationController {
   private final PostServiceImpl postService;

   @CrossOrigin
   @PostMapping("/createPost")
   public ResponseEntity<Post> createPost(
           @RequestParam(name = "post", required = false) String post,
           @RequestParam(name = "postedFrom", required = false) String postedFrom,
           @RequestParam(name = "file1", required = false) MultipartFile file1
           ){//list of images or one image
      return postService.createPost(post, postedFrom, file1);
   }


   @CrossOrigin
   @GetMapping("/recentPosts")
   public ResponseEntity<List<Post>> getRecentPosts(){
      List<Post> recentPosts = postService.getRecentPosts();
      return ResponseEntity.ok(recentPosts);
   }

   @CrossOrigin
   @GetMapping("/image/{imageName}")
   public ResponseEntity<String> getImage(@PathVariable String imageName){
      return postService.getImagePath(imageName);
   }
}
