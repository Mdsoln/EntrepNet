package omods.core.service.impl;

import lombok.RequiredArgsConstructor;
import omods.core.dto.PostResponseDto;
import omods.core.entity.FileMapping;
import omods.core.entity.Profile;
import omods.core.entity.User;
import omods.core.exc.ExceptionHandlerManager;
import omods.core.repo.FileMappingRepository;
import omods.core.repo.PostRepo;
import omods.core.repo.UserRepository;
import omods.core.service.inter.PostService;
import omods.core.entity.Post;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepo postRepo;
    private final FileMappingRepository fileMappingRepository;
    private final UserRepository userRepository;

    @Override
    public ResponseEntity<PostResponseDto> createPost(String senderID,String postContent, String postedFrom, MultipartFile imagePath) {
        try {
            //check if user is present in our database
            User poster = userRepository.findByRegNo(senderID);
            if (poster == null){
                throw new ExceptionHandlerManager("Oops!! no matches with provided user ID");
            }
            //check if payload contains non null values
            if (postContent == null || imagePath.isEmpty() || postContent.isEmpty() /*|| postedFrom.isEmpty()*/){
                throw new ExceptionHandlerManager("All fields are required");
            }
            //store the image and get its name
            String image = storeImages(imagePath);
            // we create a post here if all checks pass with user
            Post newPost = new Post();
            newPost.setPostContent(postContent);
            newPost.setLocation(postedFrom);
            newPost.setPostImage(image);
            newPost.setUser(poster);

            postRepo.save(newPost);
            //saved post details
            PostResponseDto dto = new PostResponseDto();
            dto.setPostContent(postContent);
            dto.setPostImage("/images/"+image);
            dto.setLocation(postedFrom);
            dto.setPostCreatedAt(LocalDateTime.now().withNano(0));
            //user details
            dto.setUserName(poster.getName());
            dto.setUserEmail(poster.getEmail());
            dto.setUserMobile(poster.getMobile());
            dto.setUserRole(poster.getRoles());
            dto.setUserJob(poster.getProfile().getJob());
            dto.setUserPicture("/images/"+poster.getProfile().getImagePath());

            return ResponseEntity.ok(dto);

        } catch (ExceptionHandlerManager exception ){
            throw new ExceptionHandlerManager("Error: "+exception.getMessage());
        } catch (Exception exception){
            throw new RuntimeException("Error: " + exception.getMessage());
        }
    }


    @Override
    public ResponseEntity<String> getImagePath(String imageName) {
        Optional<String> image_path = postRepo.findByPostImage(imageName);
        if (image_path.isPresent()){
            String imagePath = "/images/" + imageName;
            return ResponseEntity.status(HttpStatus.FOUND).body(imagePath);
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Oops! image not found");
        }
    }


    public String storeImages(MultipartFile imageUrl) throws IOException {
        if (imageUrl == null || imageUrl.isEmpty()) {
            throw new IllegalArgumentException("Image file is null or empty");
        }

        String uploadDirectory = "src/main/resources/static/images";
        String originalFilename = StringUtils.cleanPath(Objects.requireNonNull(imageUrl.getOriginalFilename()));

        if (originalFilename.contains("..")) {
            throw new IllegalArgumentException("Invalid file format");
        }

        // Check and handle filename length
        //HERE WE CHECK IF ALSO THE IMAGE NAME IS TOO LONG THAN 255 VARCHAR e.g.P SCREENSHOTS
        String truncatedFilename = originalFilename;
        int maxLength = 255;
        if (originalFilename.length() > maxLength) {
            // Get the file extension
            String fileExtension = "";
            int dotIndex = originalFilename.lastIndexOf(".");
            if (dotIndex > 0 && dotIndex < originalFilename.length() - 1) {
                fileExtension = originalFilename.substring(dotIndex);
                truncatedFilename = originalFilename.substring(0, maxLength - fileExtension.length()) + fileExtension;
            } else {
                truncatedFilename = originalFilename.substring(0, maxLength);
            }
        }

        Path uploadPath = Paths.get(uploadDirectory);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        Path filePath = uploadPath.resolve(truncatedFilename);
        Files.copy(imageUrl.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        // Save the mapping in the database
        FileMapping fileMapping = new FileMapping();
        fileMapping.setOriginalFilename(originalFilename);
        fileMapping.setTruncatedFilename(truncatedFilename);
        fileMappingRepository.save(fileMapping);

        return truncatedFilename;
    }


    public List<PostResponseDto> getRecentPosts() {
        List<Post> posts = postRepo.findRecentPosts();
        return posts.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    private PostResponseDto convertToDto(Post post) {
        PostResponseDto dto = new PostResponseDto();
        dto.setPostId(post.getPostId());
        dto.setPostContent(post.getPostContent());
        dto.setPostImage(post.getPostImage());
        dto.setLocation(post.getLocation());
        dto.setPostCreatedAt(post.getPostCreatedAt());

        User user = post.getUser();
        Profile profile = user.getProfile();

        dto.setUserName(user.getName());
        dto.setUserEmail(user.getEmail());
        dto.setUserMobile(user.getMobile());
        dto.setUserRole(user.getRoles());
        dto.setUserJob(profile.getJob());
        dto.setUserPicture(profile.getImagePath());

        return dto;
    }
}
