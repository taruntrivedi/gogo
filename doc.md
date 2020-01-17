
# FELB2BNode

FunEduLearn Coaching Tech

  

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

  

**POST**  `/auth/login`: Log-in with credentials. Three step process:

  

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
	"new_user":  false
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
		"profileimage": "default.png"
		...
	}	
}
```
**NOTE:** The profile image is to be used as: api2.funedulearn.com/images/{profileimage}

---
- Logout Route:
Process of logging out contains three steps: 
1. Logout using FIrebaseAuth 
2. Send a request to Server
3. Destroy or discard the jwttoken from the device.

- Route to call on second step: **GET** /auth/logout
Required Parameter is just one: **authorization** should be present in the header.

---

## User routes:

PS: All User routes require an **Authorization** header.

---
- Get user profile  
**GET** /user/profile  - This will return the user profile. User profile will be different as per the usee type.

---
- Get all the students **(Only for teachers with appropriate permission)**
**GET** /user/students - Returns a list of all the students in your institution. 
---
- Create new student **(Only for teachers with appropriate permission)**
**POST** /user/new_student - Creates a new student from the teacher's end.
Required parameters:
```json
{
"name":"New Student",
"phone_number":"9999999999"
}
```

Possible responses can be: 

- If new student creation is successful.
```json
{
"code":200,
"status":"success",
"new_student": {...}
}
```

- If student already exists.
```json
{
"code":400,
"status":"error",
"error":"Student already exists"
}
```

- If a field is missing in the body.
```json
{
"code":400,
"status":"error",
"error":"Missing fields"
}
```
---
- Get list of all teachers: **(Only for teachers with appropriate permission)**
**GET** /user/teachers - Returns a list of all the teachers in your institute.
---
- Invite a new teacher or add a new teacher (Only for teachers with appropriate permission)
**POST** /user/new_teacher - Creates/Invites new teacher to the organization.

Required parameters:
```json
{
"name":"New Student",
"phone_number":"9999999999"
"permissions": ["attendance, material"]
}
```

Possible responses can be: 

- If new student creation is successful.
```json
{
"code":200,
"status":"success",
"new_teacher": {...}
}
```

- If student already exists.
```json
{
"code":400,
"status":"error",
"error":"Teacher already exists"
}
```

- If a field is missing in the body.
```json
{
"code":400,
"status":"error",
"error":"Missing field"
}
```

## Batches  Roues:
- Get all the batches
**POST**: /batches - Returns all the batches on a specified date.

Required parameter is: 
```json
{
"date":"2014-09-02T08:05:23.653Z" //ISO_INSTANT format in Android
}
```
---
- Create a new batch
**POST**: /batches/new - Create a new batch

Required parameters are: 
```json
{
"name":"Batch 2012"
"teacher_id":  "7qayxyyd7sfsvfsdnb", //Send teacher's _id
"subject":  "english", //This comes from a predefined list
"start_date":  "2014-09-02T08:05:23.653Z",
"end_date":  "2014-09-02T08:05:23.653Z"
"fee": {
	"amount": 12000,
	"installments": [{
		"id": "1", //1 means 1st installment. If one do not wish to enable installments, just insert 1 object in this array. If multiple installments are there, insert multiple installments with incrementing "id"
		"last_date": "2014-09-02T08:05:23.653Z"
		"amount": 12000
	}]
}
"time": {
	"mo": {
		"enable": true,
		"time": "720" //time is in minutes ranging from 0-1440
	},
	"tu": {
		"enable": true,
		"time": "720" //time is in minutes ranging from 0-1440
	},
	"we": {
		"enable": true,
		"time": "720" //time is in minutes ranging from 0-1440
	},
	"th": {
		"enable": true,
		"time": "720" //time is in minutes ranging from 0-1440
	},
	"fr": {
		"enable": true,
		"time": "720" //time is in minutes ranging from 0-1440
	},
	"sa": {
		"enable": false,
		"time": "720" //time is in minutes ranging from 0-1440
	},
	"su": {
		"enable": false,
	},
}
}
```
In case the teacher wants to create instalments for the fee, the fee structure will be: 
```json
{
"fee": {
	"amount": 12000,
	"installments": [{
		"id": "1", //1 means 1st installment. If one do not wish to enable installments, just insert 1 object in this array. If multiple installments are there, insert multiple installments with incrementing "id"
		"last_date": "2014-09-02T08:05:23.653Z"
		"amount": 6000
	},
	{
		"id": "2",
		"last_date": "2014-09-02T08:05:23.653Z"
		"amount": 6000
	}]
}
}
```

Responses can be: 

- If batch creation is successful
```json
{
"code": 200,
"status": "success",
"new_batch": {...} //Created batch
}
```
- If the structure of fee/time is incorrect
```json
"code":400
"status":"error",
"error":"Incorrect structure"
```
- If there are any missing fields
```json
"code":400
"status":"error",
"error":"Missing fields"
```
---
- Add/Edit students into batch:
**POST**: /batches/edit_students - Add/remove students.  You have to first get the details of the existing batch. Now if a student is removed you have to add it into the **remove** array and if a student is added you have to add it into the **add** array. 
Note: **If there are no students to remove you can just send the add array and vice versa.**

Required parameters are: 

```json
{
"batch_id":"7ausfhsjfh86as8asf",
"add": [
	{
		"id": "aa887df87sdfsdjdfys8df8s" // _id of the students
	},
	{
		"id": "aa887df87sdfsdjdfys8df8s" // _id of the students
	},
],
"remove": [
	{
		"id": "aa887df87sdfsdjdfys8df8s" // _id of the students
	},
],
}
```

## Attendance
- Get attendance of a batch for a specific date
**POST** /attendance/ - Returns attendance of a batch on a specific date.

Required parameters are: 
```json
{
	"batch_id":"7a7s7a78as9dasdada" //_id of a batch
	"date": "2014-09-02T08:05:23.653Z" //ISO_INSTANT FORMAT
}
```

---
- Update/Take attendance (Based on teacher permission):
**POST**: /attendance/update - Updated attendance of the batch. By default every student is marked as absent.
Send only those arrays which are updated. 
```json
{
	"attendance_id":"7ahsfasjfs7fasasd", //_id of a attendance
	"students":[
	{
		"id":"aasf68dsfjhshhs", //_id of a student (this is there when you request attendace)
		"present": true
	},
		{
		"id":"aysaf8as8f8asjhas9", //_id of a student (this is there when you request attendace)
		"present": true
	},
]
}
```
Possible Responses:
- If the structure of  is incorrect
```json
"code":400
"status":"error",
"error":"Incorrect structure"
```
- If there are any missing fields
```json
"code":400
"status":"error",
"error":"Missing fields"
```

---
- Call off a class WIP WIP

## Fees
- Get fee details **(Only for teachers with appropriate permission)**
**GET** /fees - Returns the complete Fee details. (Dues, Upcoming, Paid)
---
- New Payment: **(Only for teachers with appropriate permission)**
**POST** /fees/new_payment

Required parameters are: 
```json
{
"amount": 6000,
"type": 0 //Keep this 0 for now
"student_id": "78dfsd89f7as9f7s9f7sd" //_id of a student
"installment_details": {
	"complete": true, //This will be false if the amount is less than the required installment is. It means that this installment was not complete and there is still some money due.
	"batch_id": "8as6d8asd79as89das", //_id of the batch
	"id": 1, //This is the installment ID (Created in Batches). It tells which installment is this
	}
}
```
Responses can be:
- If the structure of  is incorrect
```json
"code":400
"status":"error",
"error":"Incorrect structure"
```
- If there are any missing fields
```json
"code":400
"status":"error",
"error":"Missing fields"
```

## Study Material
- Get study material for a class:
**POST** /material -  Returns all the study materials.
Required parameter is: 
```json
{
"batch_id":"8788d7fsd9f8sd9fs90df" //_id of a batch
}
```
---
- Upload New Study Material (Permission based, only for teacher)
**POST** /material/upload - Upload a file.
**NOTE:** This is a form-data request, not a JSON request.

Required Parameters are:

| KEY | VALUE|
| --- | --- |
| file        | /sdcard/doc.pdf   |
| description | Syllabus for 2020 |
|    batch_id |  79as9f979as9fa9s |
|        name |      Syllabus2020 |


## Courses Routes
WIP

## Tests Routes
WIP
## End
