package omods.core.exc;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class HandlerException {

    @ExceptionHandler(value = {ExceptionHandlerManager.class})
    public ResponseEntity<Object> handlerException(
            ExceptionHandlerManager handlerManager
    ){
        ExceptionHandlerFields handlerFields = new ExceptionHandlerFields(
                handlerManager.getMessage(),
                handlerManager.getCause(),
                HttpStatus.BAD_REQUEST
        );

        return new ResponseEntity<>(handlerFields, HttpStatus.BAD_REQUEST);
    }
}
