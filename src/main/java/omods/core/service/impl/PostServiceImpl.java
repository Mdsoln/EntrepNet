package omods.core.service.impl;

import lombok.RequiredArgsConstructor;
import omods.core.entity.FileMapping;
import omods.core.exc.ExceptionHandlerManager;
import omods.core.repo.FileMappingRepository;
import omods.core.repo.PostRepo;
import omods.core.service.inter.PostService;
import omods.core.entity.Post;
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
    private final FileMappingRepository fileMappingRepository;

    @Override
    public ResponseEntity<Post> createPost(String postContent, String postedFrom, MultipartFile imagePath) {
        try {

            if (/*postedFrom == null */postContent == null || imagePath.isEmpty() || postContent.isEmpty() /*|| postedFrom.isEmpty()*/){
                throw new ExceptionHandlerManager("All fields are required");
            }

            Post newPost = new Post();
            newPost.setPostContent(postContent);
            newPost.setLocation(postedFrom);
            newPost.setPostImage(storeImages(imagePath));

            postRepo.save(newPost);
            return ResponseEntity.ok(newPost);

        } catch (ExceptionHandlerManager | IOException exception){
            throw new ExceptionHandlerManager("Error: "+exception.getMessage());
        } catch (Exception exception){
            throw new RuntimeException("Error: " + exception.getMessage());
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
        String originalFilename = StringUtils.cleanPath(Objects.requireNonNull(imageUrl.getOriginalFilename()));

        if (originalFilename.contains("..")) {
            throw new IllegalArgumentException("Invalid file format");
        }

        // Check and handle filename length

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

}
