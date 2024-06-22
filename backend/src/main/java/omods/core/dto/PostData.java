package omods.core.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class PostData {
    private String postContent;
    private String postedFrom;
    private MultipartFile imagePath;
}
