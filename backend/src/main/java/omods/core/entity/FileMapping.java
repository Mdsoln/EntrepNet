package omods.core.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "file_mapping")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class FileMapping {
    @Id
    @SequenceGenerator(
            name = "files_sequence",
            sequenceName = "files_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "files_sequence"
    )
    private Long fileId;

    private String originalFilename;
    private String truncatedFilename;
}
