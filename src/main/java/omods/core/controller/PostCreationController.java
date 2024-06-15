package omods.core.controller;


import lombok.RequiredArgsConstructor;
import omods.core.dto.PostResponseDto;
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
   public ResponseEntity<PostResponseDto> createPost(
           @RequestParam(name = "senderID") String senderID,
           @RequestParam(name = "post", required = false) String post,
           @RequestParam(name = "postedFrom", required = false) String postedFrom,
           @RequestParam(name = "file1", required = false) MultipartFile file1
           ){//list of images or one image
      return postService.createPost(senderID,post, postedFrom, file1);
   }

   @CrossOrigin
   @GetMapping("/image/{imageName}")
   public ResponseEntity<String> getImage(@PathVariable String imageName){
      return postService.getImagePath(imageName);
   }

   @CrossOrigin
   @GetMapping("/recentPosts")
   public List<PostResponseDto> getRecentPosts() {
      return postService.getRecentPosts();
   }
}
