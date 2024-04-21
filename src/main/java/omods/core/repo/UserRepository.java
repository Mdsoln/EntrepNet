package omods.core.repo;

import omods.core.users.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
     User findByEmail(String email);

     @Query("SELECT u FROM User u")
     List<User> findUserProfile();

}
