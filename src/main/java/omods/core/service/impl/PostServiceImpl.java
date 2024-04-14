package omods.core.service.impl;

import lombok.RequiredArgsConstructor;
import omods.core.exc.ExceptionHandlerManager;
import omods.core.repo.PostRepo;
import omods.core.service.inter.PostService;
import omods.core.users.Post;
import org.springframework.dao.DataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepo postRepo;

    @Override
    public ResponseEntity<Post> createPost(String postContent, String postedFrom, MultipartFile imagePath) {
        try {

            if (imagePath.isEmpty() || postContent.isEmpty() || postedFrom.isEmpty()){
                throw new ExceptionHandlerManager("Error: "+ "All fields are required");
            }

            Post newPost = new Post();
            newPost.setPostContent(postContent);
            newPost.setLocation(postedFrom);
            newPost.setPostImage(storeImages(imagePath));

            postRepo.save(newPost);
            return ResponseEntity.ok(newPost);

        } catch (ExceptionHandlerManager | IOException exception){
            throw new ExceptionHandlerManager("Error: "+exception);
        } catch (Exception exception){
            throw new RuntimeException("Error: " + exception);
        }
    }

    @Override
    public List<Post> getRecentPosts() {
        try {
            return postRepo.findRecentPosts();
        }catch (DataAccessException dataAccessException){
            throw new ExceptionHandlerManager("Error: " + dataAccessException);
        }
    }


    public String storeImages(MultipartFile imageUrl) throws IOException {
        if (imageUrl == null || imageUrl.isEmpty()) {
            throw new IllegalArgumentException("Image file is null or empty");
        }

        String uploadDirectory = "src/resources/images";
        String imageName = StringUtils.cleanPath(Objects.requireNonNull(imageUrl.getOriginalFilename()));

        if (imageName.contains("..")) {
            throw new IllegalArgumentException("Invalid file format");
        }

        Path uploadPath = Paths.get(uploadDirectory);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        Path filePath = uploadPath.resolve(imageName);
        Files.copy(imageUrl.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return "/resources/images/" + imageName;
    }

}
