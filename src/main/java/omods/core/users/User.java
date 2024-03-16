package omods.core.users;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import omods.core.constants.Roles;

@Entity
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class User {
    private long userID;
    private String name;
    private String email;
    private String mobile;
    @Column(name = "password", nullable = false)
    private String psw;
    @Enumerated(EnumType.STRING)
    private Roles roles;
}
