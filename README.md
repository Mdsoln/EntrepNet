**Path: /api/v1/user**

* **URL:** /register
* **Method:** POST

**Purpose:**

Registers a new user in the system.

**Request Body:**

* **Data Type:** UserDto
* **Fields:**
    * firstname (string):  The user's first name.
    * surname (string):  The user's surname.
    * email (string):  The user's email address.
    * mobile (string):  The user's mobile number.
    * psw (string):  The user's password.
    * role (string):  The user's role (MENTOR, ENTREPRENEUR, or ADMIN).

**Responses:**

* **Success:**
    * Status Code: 200 OK
    * Body: "You have successfully created your account"
* **Email Already Exists:**
    * Status Code: 400 Bad Request
    * Body: "Already exists user with same email!"
* **Internal Server Error:**
    * Status Code: 500 Internal Server Error
    * Body: "Failed to save user: {error message}"

**Endpoint:**  /complete-profile

**Method:** POST

**Description:** This endpoint allows users to complete their profile information after registration.

**Request Body:**

The request body should be a JSON object representing a `ProfileDetails` object with the following properties:

    * email (String): The user's email address.
    * job (String): The user's job title (optional).
    * locatedAt (String): The user's location (optional).
    * userClaims (List<UserClaims>): A list containing user claims (at least one claim is required).

**UserClaims Object:**

The `userClaims` list contains objects with the following properties:

    * role (String): The user's role (e.g., "MENTOR", "ENTREPRENEUR").
    * topic (String): The user's topic of expertise (optional).

**Response:**

On success, the endpoint returns a 200 OK status code with a JSON response body containing a message: "Profile completed successfully".

On error, the endpoint returns an appropriate HTTP status code with a JSON response body containing an error message. Possible error responses include:

    * 400 Bad Request:
        * Missing user in request body.
        * User not found by email.
        * Missing user claims in profile details.

    * 500 Internal Server Error: Unexpected error during profile completion.

**Example Request:**

```json
{
  "email": "john.doe@example.com",
  "job": "Software Engineer",
  "locatedAt": "New York, NY",
  "userClaims": [
    {
      "role": "MENTOR",
      "topic": "Machine Learning"
    }
  ]
}

**Example Response (Success):**

```json
{
  "message": "Profile completed successfully"
}

**Example Response (Error - Missing User Claims):**

```json
{
  "error": "Missing user claims in profile details"
}
