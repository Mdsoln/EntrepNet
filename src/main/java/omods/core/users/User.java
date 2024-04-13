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
    @Id
    @SequenceGenerator(
            name = "user_sequence",
            sequenceName = "user_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "user_sequence"
    )
    private Long userID;

    @OneToOne(mappedBy = "user", cascade = CascadeType.PERSIST)
    private Profile profile;

    private String name;
    private String email;
    private String mobile;

    @Column(name = "password", nullable = false)
    private String psw;

    @Enumerated(EnumType.STRING)
    private Roles roles;
}
