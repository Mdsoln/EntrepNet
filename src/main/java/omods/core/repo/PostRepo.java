package omods.core.repo;

import omods.core.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepo extends JpaRepository<Post,Long> {

    Optional<String> findByPostImage(String imageName);

    @Query("SELECT p FROM Post p JOIN FETCH p.user u " +
            "JOIN FETCH u.profile ORDER BY p.postCreatedAt DESC ")
    List<Post> findRecentPosts();

}
