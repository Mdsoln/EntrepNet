package omods.core.dto;

import lombok.Data;

import java.util.List;

@Data
public class ProfileDetails {
    private String email;
    private String job;
    private String locatedAt;
    private List<UserClaims> userClaims;
}
