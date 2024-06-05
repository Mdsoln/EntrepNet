package omods.core.repo;

import omods.core.entity.FileMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FileMappingRepository extends JpaRepository<FileMapping, Long> {
    Optional<FileMapping> findByOriginalFilename(String originalFilename);
}
