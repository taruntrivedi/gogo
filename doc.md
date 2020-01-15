# FunEduLearn API v0.5

  

**Host**: `https://api2.funedulearn.com`

  

**Notes:**

- Every request and response is in JSON format.
- Institute code for testing is "EXMPL".
- If any request's response is `Status: 5xx` at any point, please contact me [
here](mailto:harshsinghmandan@gmail.com), so I can look into it.

  

# Routes:

  

## Authentication routes:

  

-  **Login/Signup:**

  

**POST**  `/auth/login`: Log-in with credentials. 2 step process:

  

Step 1:

- Send these parameters in the body: 
```json
{
	"phone_number": "9461794955",
	"type":"t",
	"method":"check",
	"institute_code":"EXMPL"
}
```
- Responses can be:

If user does not exists
```json
{
	"code":  200,
	"status":  "success",
	"new_user":  true
}
```
If user exists
```json
{
	"code":  200,
	"status":  "success",
	"new_user":  true
}
```
If code is wrong
```json
{
	"code":  400,
	"status":  "error",
	"error":  "Wrong Institution code"
}
```

Step 2:

- Send request to Firebase for SMS authentication.

- If new_user is **true**. Send these params in body
```json
{
	"method":  "signup",
	"phone_number":  "9461794955",
	"type":  "t",
	"institute_code": "EXMPL",
	"name": "Harsh",
	"firebase_uid": "aseu2783888yv5s4657dsa8dasjbhdas"
}
```
- If new_user is **false**. Send these parameters in body
```json
{
	"method":  "login",
	"phone_number":  "9461794955",
	"type":  "t",
	"institute_code": "EXMPL",
	"firebase_uid": "aseu2783888yv5s4657dsa8dasjbhdas"
}
```
-  These are the possible responses:

If **firebase_uid** is incorrect
```json
{
	"code":  "401",
	"status":  "error",
	"error":  "Couldn't verify UID"
}
```
If **type** is incorrect
```json
{
	"code":  "400",
	"status":  "error",
	"error":  "Invalid type value"
}
```
If everything is correct:
```json
{
	"code":  "200",
	"status":  "success",
	"jwttoken": "aea8488484820ufkjbf98sd6d8sf8df8",
	"user": {
		"name":"Harsh"
		"phone_number: "9461794955",
		"profileimage": "default.png",
		...
	}	
}
```
**NOTE:** The profile image is to be used as: api2.funedulearn.com/images/{profileimage}

## User routes:

PS: All User routes require an **Authorization** header.

---
WIP
WIP
WIP
## End
