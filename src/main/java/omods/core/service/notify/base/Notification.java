package omods.core.service.notify.base;

import ClickSend.ApiException;
import org.springframework.http.ResponseEntity;

public interface Notification {

    ResponseEntity<String> sendPassword(String newPassword, String mobile) throws ApiException;
}
