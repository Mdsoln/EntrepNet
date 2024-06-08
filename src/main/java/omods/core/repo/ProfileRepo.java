package omods.core.repo;

import omods.core.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfileRepo extends JpaRepository<Profile, Long> {

    @Query("SELECT p.job FROM Profile p")
    Object findJob();
}
