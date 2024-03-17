package omods.core.exc;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class EmailExceptionHandler {

    @ExceptionHandler(value = {EmailExistException.class})
    public ResponseEntity<Object> handleEmailDuplications(EmailExistException existException){
        ExceptionHandlerFields handlerFields = new ExceptionHandlerFields(
                existException.getMessage(),
                existException.getCause(),
                HttpStatus.BAD_REQUEST
        );
        return new ResponseEntity<>(handlerFields,HttpStatus.BAD_REQUEST);
    }
}
