package omods.core.repo;

import omods.core.constants.Status;
import omods.core.dto.UserResponse;
import omods.core.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
     User findByEmail(String email);

     @Query("SELECT u FROM User u")
     List<User> findUserProfile();

     @Query("SELECT NEW omods.core.dto.UserResponse(u.name, u.email, u.roles, p.imagePath) " +
             "FROM User u " +
             "JOIN u.profile p " +
             "WHERE u.regNo = :queryId ")
     UserResponse findByUserId(@Param("queryId") String userId);

     Optional<User> findByRegNo(String userRegNo);

     List<User> findByStatus(Status status);

}
