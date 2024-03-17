package omods.core.exc;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ExceptionHandlerFields {
    private String message;
    private Throwable cause;
    private HttpStatus httpStatus;
}
