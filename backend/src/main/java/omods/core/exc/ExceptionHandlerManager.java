package omods.core.exc;


public class ExceptionHandlerManager extends RuntimeException{

    public ExceptionHandlerManager(String message) {
        super(message);
    }

    public ExceptionHandlerManager(String message, Throwable cause) {
        super(message, cause);
    }
}
