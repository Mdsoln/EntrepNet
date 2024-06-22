package omods.core.dto;


import lombok.Getter;
import lombok.Setter;
import omods.core.constants.Roles;

@Setter
@Getter
public class UserResponse {
    private String name;
    private String email;
    private Roles roles;
    private String imagePath;

    public UserResponse() {
    }

    public UserResponse(String name, String email, Roles roles, String imagePath) {
        this.name = name;
        this.email = email;
        this.roles = roles;
        this.imagePath = imagePath;
    }
}
