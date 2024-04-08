



Path: /api/v1/user

Endpoint:
    URL: /register
    Method: POST

Purpose:
    Registers a new user in the system.

Request Body:
    Data Type: UserDto
    Fields:
        firstname (string): The user's first name.
        surname (string): The user's surname.
        email (string): The user's email address.
        mobile (string): The user's mobile number.
        psw (string): The user's password.
        role (string): The user's role (MENTOR, ENTREPRENEUR, or ADMIN).

Responses:
    Success:
        Status Code: 200 OK
        Body: "You have successfully created your account"
    Email Already Exists:
        Status Code: 400 Bad Request
        Body: "Already exists user with same email!"
    Internal Server Error:
        Status Code: 500 Internal Server Error
        Body: "Failed to save user: {error message}"

Logic:

    The endpoint receives a POST request with a UserDto object in the request body.
    It calls the registerNewUser method in the UserService.
    The UserService checks for existing users with the same email address.
    If no existing user is found:
        Creates a new User object from the UserDto.
        Sets the user's role based on the provided role string.
        Saves the new user to the database.
        Returns a success response with the message "You have successfully created your account".
    If an existing user with the same email is found, an EmailExistException is thrown, resulting in a 400 Bad Request response.
    If any other errors occur during user creation, a 500 Internal Server Error response is returned with an error message.
