package omods.core.repo;

import omods.core.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepo extends JpaRepository<Post,Long> {

    @Query("SELECT p FROM Post p ORDER BY p.postCreatedAt DESC")
    List<Post> findRecentPosts();
    //ten posts per page
    /*
    @Query("SELECT p FROM Post p WHERE SIZE(p) >= :minPosts ORDER BY p.createdAt DESC")
    List<Post> findRecentPosts(@Param("minPosts") int minPosts);
    * */
}
