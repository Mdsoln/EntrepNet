package omods.core.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class UserDto {
    private String firstname;
    private String surname;
    private String email;
    private String mobile;
    private String psw;
    private String role;
}
