$(document).ready(function () {
	
	/**
	 * This function is used for a Sign up button in the header
	 * It hides the login part of page and displays the signup part
	 * Also changes the style of the header buttons  
	 */
	$("#gotoSign").click(function () {
		document.title = "Sign Up";

		$("#loginMain").addClass("hidden");
		$("#gotoLogin").addClass("hiddenBtn");
		$("#gotoLogin").removeClass("activeBtn");

		$("#signMain").removeClass("hidden");
		$("#gotoSign").removeClass("hiddenBtn");
		$("#gotoSign").addClass("activeBtn");
	});

	/**
	 * This function is same as the previous one, but used for login header button
	 */
	$("#gotoLogin").click(function () {
		document.title = "Login";

		$("#loginMain").removeClass("hidden");
		$("#gotoLogin").addClass("activeBtn");
		$("#gotoLogin").removeClass("hiddenBtn");

		$("#signMain").addClass("hidden");
		$("#gotoSign").removeClass("activeBtn");
		$("#gotoSign").addClass("hiddenBtn");

		$("#signComplete").addClass("hidden");
	});

	/**
	 * It is used to make a input field look invalid 
	 */
	function valid(name) {
		if (name[0] != ".")
			$(name).css({ border: "white solid 1px" });
		else{ // this is true for only the genderContainer
			$(name).css({border: "none", width: "100%"});
		}
		$(name).addClass("check");
	}

	/**
	 * This function is used to style a valid input field
	 */
	function invalid(name) {
		$(name).css({ border: "red solid 1px" });
		$(name).removeClass("check");
	}

	// is used to check the validity of a email
	var validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

	/**
	 * This function is used when the user presses the LogIn button
	 * It checks the validity of the inputs and if the values of these fields are the same 
	 * as stored values from sessionStorage, then it displays the login successfull page
	 * But if the information is not correct then it writes the error message 
	*/
	$("#loginBtn").click(function () {
		let email = document.getElementById("emailLogField");
		let pwd = document.getElementById("pwdLogField");
		var flag = true; // is used to determine if all the fields were filled correctly


		//the valid input handling for email input field
		if (email.value == null || email.value == "") {
			email.setCustomValidity("Please enter your email");
			invalid("#emailLogField");
			flag = false;
		} 
		else if(email.value.match(validEmail)){
			email.setCustomValidity("");
			valid("#emailLogField");
		}
		else{
			email.setCustomValidity("");
			invalid("#emailLogField");
			flag = false;
		}

		//the valid input handling for password input field
		if (pwd.value == "" || pwd.value == null) {
			pwd.setCustomValidity("Please enter your password");
			invalid("#pwdLogField");
			flag = false;
		} else {
			pwd.setCustomValidity("");
			valid("#pwdLogField");
		}
		email.reportValidity();
		pwd.reportValidity();

		//the final conditions to check if the account information is correct 
		if (
			email.value === sessionStorage.getItem("email") &&
			pwd.value === sessionStorage.getItem("password")
		) {
			$("#loginComplete").removeClass("hidden");
			$("#loginMain").addClass("hidden");
			$("header").addClass("hidden");
		} else if (flag) {
			$("#descp").html("Credentials do not match!");
			$("#descp").css("color", "red");
		}
	});


	/**
	 * This function is used when the user presses the SignUp button
	 * It checks the validity of the inputs and if everything is alright
	 * then stores email and password inside the sessionStorage, 
	 * then it displays the signup successfull page
	*/
	$("#signBtn").click(function () {
		let firstName = document.getElementById("firstName");
		let lastName = document.getElementById("lastName");
		let other = document.getElementById("other"); // used for genderContainer
		let email = document.getElementById("emailSignField");
		let pwd = document.getElementById("pwdSignField");
		let confPwd = document.getElementById("pwdConfField");

		// these variables are all used to check the validity of input
		const lowLetters = /[a-z]/g;
		const uppLetters = /[A-Z]/g;
		const specialChars = /[!, #, $, @, %, *, ?, ', ", (, )]/;
		const nums = /[0-9]/g;
		const length = 6;

		// is used to determine if all the fields were filled correctly
		let flag = true; 

		//the valid input handling for first name input field
		if (firstName.value == null || firstName.value == "") {
			firstName.setCustomValidity("Please enter your First Name");
			invalid("#firstName");
			flag = false;
		} else if (firstName.value.match(nums)) {
			firstName.setCustomValidity(
				"First name cannot contain any numbers"
			);
			invalid("#firstName");
			flag = false;
		} else if (firstName.value.match(specialChars)) {
			firstName.setCustomValidity(
				"First name cannot contain any special characters"
			);
			invalid("#firstName");
			flag = false;
		} else if (
			firstName.value.toString()[0].toUpperCase() !=
			firstName.value.toString()[0]
		) {
			firstName.setCustomValidity(
				"First name should start with capital letter"
			);
			invalid("#firstName");
			flag = false;
		} else {
			firstName.setCustomValidity("");
			valid("#firstName");
		}

		//the valid input handling for last name input field
		if (lastName.value == null || lastName.value == "") {
			lastName.setCustomValidity("Please enter your Last Name");
			invalid("#lastName");
			flag = false;
		} else if (lastName.value.match(nums)) {
			lastName.setCustomValidity("Last name cannot contain any numbers");
			invalid("#lastName");
			flag = false;
		} else if (lastName.value.match(specialChars)) {
			lastName.setCustomValidity(
				"Last name cannot contain any special characters"
			);
			invalid("#lastName");
			flag = false;
		} else if (
			lastName.value.toString()[0].toUpperCase() !=
			lastName.value.toString()[0]
		) {
			lastName.setCustomValidity(
				"Last name should start with capital letter"
			);
			invalid("#lastName");
			flag = false;
		} else {
			lastName.setCustomValidity("");
			valid("#lastName");
		}

		//the valid input handling for gender radio input field
		if (
			!$("#female").is(":checked") &&
			!$("#male").is(":checked") &&
			!$("#other").is(":checked")
		) {
			other.setCustomValidity("Please choose your gender");
			invalid(".genderContainer");
			flag = false;
		} else {
			other.setCustomValidity("");
			valid(".genderContainer");
		}


		//the valid input handling for email input field
		if (email.value == null || email.value == "") {
			email.setCustomValidity("Please enter your email");
			invalid("#emailSignField");
			flag = false;
		} 
		else if(email.value.match(validEmail)){
			email.setCustomValidity("");
			valid("#emailSignField");
		}
		else{
			email.setCustomValidity("");
			invalid("#emailSignField");
			flag = false;
		}


		//the valid input handling for password input field
		if (pwd.value == null || pwd.value == "") {
			pwd.setCustomValidity("Please enter your password");
			invalid("#pwdSignField");
			flag = false;
		} else if (
			!pwd.value.match(lowLetters) ||
			!pwd.value.match(uppLetters) ||
			!pwd.value.match(nums) ||
			!pwd.value.match(specialChars) ||
			!pwd.value.length >= length
		) {
			pwd.setCustomValidity(
				"Requirement: at least 6 characters," +
					"one capital letter, one lowercase letter," +
					"at least one digit and one special character!"
			);
			invalid("#pwdSignField");
			flag = false;
		} else {
			pwd.setCustomValidity("");
			valid("#pwdSignField");
		}


		//the valid input handling for password Confirmation input field
		if (confPwd.value == null || confPwd.value == "") {
			confPwd.setCustomValidity("Please confirm your password");
			invalid("#pwdConfField");
			flag = false;
		} else if (pwd.value != confPwd.value) {
			confPwd.setCustomValidity("Passwords are not the same!");
			invalid("#pwdConfField");
			flag = false;
		} else {
			confPwd.setCustomValidity("");
			valid("#pwdConfField");
		}

		firstName.reportValidity();
		lastName.reportValidity();
		other.reportValidity();
		email.reportValidity();
		pwd.reportValidity();
		confPwd.reportValidity();

		/**
		 * If the all information is written correctly,
		 * It stores the email and password information inside the sessionStorage
		 * And then displays the successful SignUp message, while hiding other parts
		*/
		if (flag) {
			sessionStorage.setItem("email", email.value);
			sessionStorage.setItem("password", pwd.value);

			$("#signComplete").removeClass("hidden");
			$("#signMain").addClass("hidden");
			$("#loginMain").addClass("hidden");
		}
	});
});
