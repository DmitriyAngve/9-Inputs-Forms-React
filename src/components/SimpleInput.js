import { useState } from "react";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  // For E-mail
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

  const enteredNameIsValid = enteredName.trim() !== "";
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  // Enfer the validity for E-mail
  const enteredEmailIsValid = enteredEmail.includes("@");
  const enteredEmailIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

  // Check vailidity without useEffect
  let formIsValid = false;
  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  // 1 Approach
  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  // For E-mail
  const emailInputChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  // Blur
  const nameInputBlurHandler = (event) => {
    setEnteredNameTouched(true);
  };

  // For E-mail
  const emailInputBlurHandler = (event) => {
    setEnteredEmailTouched(true);
  };

  // 2 Approach
  const formSubmissionHandler = (event) => {
    event.preventDefault();

    setEnteredNameTouched(true);

    if (!enteredNameIsValid) {
      return;
    }

    console.log(enteredName);

    setEnteredName("");
    setEnteredNameTouched(false);

    // For E-mail
    setEnteredEmail(""); // to reset that value
    setEnteredEmailTouched(false); // to reset that value
  };

  const nameInputClasses = enteredNameIsValid
    ? "form-control invalid"
    : "form-control";

  // For E-mail
  const emailInputClasses = enteredEmailIsInvalid
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          // ref={nameInputRef}
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
        />
        {nameInputIsInvalid && (
          <p className="error-text">Name must not be empty</p>
        )}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">E-Mail</label>
        <input
          type="email"
          id="email"
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
          value={enteredEmail}
        />
        {enteredEmailIsInvalid && (
          <p className="error-text">Please enter a valid email.</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;

// ~~ FORM SUBMISSION & GETTING USER INPUT VALUES ~~
// Let's start with fetching the entered value, the user input, there are two main ways for doing that: we can listen on every keystroke and store the value in some state variable, so to say, or use a ref to fetch the input once the user is done typing in a value.
// Use both this approaches
// STEP: 1
// 1.1 Import "useRef" and "useState".
// 1.2 Let's start with state: set up a new state: "const [enteredName, setEnteredName] = useState("");" In initially it's an empty string. Then we can update this with "setEntered" name on every keystroke, or on every change that occurs here on input element ("<input type="text" id="name" />")
// 1.3 We can add a "nameInputChangeHandler" function which receives the default event object (browser behaves -> once we bind this function to the onChange event on the input we automatically get an event object describing the event, and from there we can get the entered value)
// 1.4 In "nameInputChangeHandler" we'll be able to "setEnteredName" to "event.target.value" (this is how we can get access to this entered value in JavaScript)
// 1.5 Add in JSX code "onChange={nameInputChangeHandler}" (bind the name input change handler) -> so that on every keystroke, this is fired, and the "enteredName" state is updated.
// STEP: 2
// 1.1 Then we can add a second function: "formSubmissionHandler" (then the form is submitted) with "event" object.
// 1.2 Bind this function to "onSubmit={formSubmissionHandler}"
// 1.3 "event.preventDefault()" - if a form is submitted with a button iside of a form, a HTTP request is sent to the server serving this website. That happens automatically. We don't want this request to be sent, and on this "event" object, which we get automatically passed into this function since we've bounded to onSubmit, on this "event" object we can call "event.preventDefault()" to tell the browser to not do that default behavior, to not send this HTTP request, and instead to do nothing. If we don't do it, the page being reloaded in the end and restart the entire React app and we would lose our state.
// 1.4 Alternative approach would have been to just set a ref on the input and read the value from the input when we need it.
// 1.5 Add "const nameInputRef = useRef()"
// 1.6 Then we set name input ref as a ref to this input with the special ref prop, which allows us to set on any HTML element. ("<input  ref={nameInputRef}")
// 1.7 Now with that ref set up, when the form is submitted, we could have also gotten this entered value by reaching out to the name input ref, and accessing current. (on React refs, always have a current property, and it's this current property, which then holds the value you assigned to this ref). TPointer at <"input..." element, that would be stored in current. The value and current is that pointer at the inout element, we can also access "value", because input elements in JavaScript objects representing these HTML input elements always have a value property, which holds the value currently entered in that input ("const enteredValue = nameInputRef.current.value"). We can read that value from that input. And store it as a "enteredValue"
// Reason for using a state instead of a ref could be, if you want to reset the entered input -> let's do it
// 1.8 Call "setEnteredName("")" and set it an empty string. And all now need to do is bind the "enteredValue" back to the input through the value prop. (" value={enteredName}" in JSX)
// With fers, I could also use your ref and access the input element which is stored in that ref, and set value equal to an empty string. ("nameInputRef.current.value = "") It works, but not ideal (DONT MANIPULATE THE DOM)
// ~~ FORM SUBMISSION & GETTING USER INPUT VALUES ~~

// ~~ ADDING BASIC VALIDATION ~~
// How we could validate this and make sure that we show an error and don't log the values to the console if tryed to submit empty field?
// We can go to "formSubmissionHandler", and add "ifcheck"
// STEP: 1
// 1.1 Add "ifcheck": check if the "enteredName" from "useState("")" is empty. Add "trim()" to trim all spaces. The exact validation logic you need depends on the form input value you are expecting, if it's just some name, you might be fine with just checking hat it's not empty.
// 1.2 If we have an empty string here, then I don't want to continue with the next lines of code. Because here ("console.log(enteredName)") we are using the "enteredValue", and I don't want to do that if that value is empty --->>> add "return" which returns from this overall function and therefore cancels the function execution.
// STEP: 2
// We can manage more state for validation
// 2.1 Add "enteredNameIsValid" state with "useState(false)" - because initially the entered name is not valid. Set it to "true", then entered name is valid.
// 2.2 Then input is invalid a want to "setEnteredNameIsValid" to false because it is not valid. If we make it pass this "ifcheck", we can "setEnteredNameIsValid" to true.
// 2.3 Let's use "enteredNameIsValid" to show an error message. Add error below input in JSX code.
// 2.4 I only want to show this paragraph if "enteredNameIsValid" is false: "{!enteredNameIsValid && <p>Name must not be empty</p>}"
// 2.5 Add predefined CSS class: "<p className="error-text"..."
// 2.6 EDIT from 1.1 -> useState(true)" set to true for don't see error initially.
// 2.7 Let's swap css-classes from "form-control" to "invalid" if this input is invalid.
// 2.8 For it add new const: "const nameInputClasses = enteredNameIsValid ? "form-control" : "form-control invalid""
// 2.9 Add dynamic class name in JSX code:
// "<div className=nameInputClasses}>"
// ~~ ADDING BASIC VALIDATION ~~

//

// ~~ "WAS TOUCHED" STATE ~~
// "const [enteredNameIsValid, setEnteredNameIsValid] = useState(true);" - its incorrect, because after first load the page we can restart "useEffect" if we use it. In other words: "enteredNameIsValid" in begining - really?
// STEP: 1
// 1.1 Let's change to "false" because the input is invalid initially.
// 1.2 To avoid error message initially we add third state: "const [enteredNameTouched, setEnteredNameTouched] = useState(false)". False - because initially this input is untouched.
// 1.3 Now we can use "enteredNameTouched" in compination with "enteredNameIsValid" to show this error message and add invalid css class.
// 1.3.1 For that add new "const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched"
// 1.3.2 Replace: "{nameInputIsInvalid && (<p className="error-text">Name must not be empty</p> )}"
// 1.3.3 Replace: "const nameInputClasses = enteredNameIsValid ? "form-control invalid" : "form-control""
// 1.4 For form submitted: before checking validity we need set "setEnteredNameTouched(true)"
// ~~ "WAS TOUCHED" STATE ~~

// ~~ REACT TO LOSE FOCUS ~~
// STEP: 1
// 1.1 We might want to also validate on blur as it's called which means when the input loses focus. Add "onBlur"
// 1.2 Into JSXt code we add "onBlur={}" handler and that's a built in event which fires whenever this input loses focus. Add a new function for in handler
// 1.3 "const nameInputBlurHandler = event => {}" with default event. And when I wanna "bind" this "nameInputBlurHandler" to "onBlur" input
// 1.4 In "nameInputBlurHandler" I wanna do two things:
// 1.4.1 I wanna "setEnteredNameTouched(true)" to true, because if our input loses focus, it definitely was touched
// 1.4.2 In addition we might want to start validation (run "ifcheck" logic again) -> this logic -> "if (enteredName.trim() === "") {   setEnteredNameIsValid(false);}" COPY this code and put in "nameInputBlurHandler". So if we check the "enteredNname" which update with every keystroke still and we "setEnteredNameIsValid" false if that name is valid. Here no need "return", because is no code to execute after the "if" statement
// ~~ REACT TO LOSE FOCUS ~~

// ~~ REFACTORING AND DERIVING STATE ~~
// STEP: 1
// 1.1 Implement validate on every keystroke. Add "ifcheck" validation logic to the "nameInputChangeHandler" with another logic: "if (enteredName.trim() !== "") {setEnteredNameIsValid(true);}" here no need "return", because is no code to execute after the "if" statement
// 1.2 Now in "nameInputChengeHandler", though here we shouldn't use the "enteredName" state, but instead "event.target.value", because we do update the "enteredName" state with this "event.target.value", such state updates are then scheduled by react, they are not processed immediately, so in the next line thereafter, you don't have that latest state yet, hence here you would be reffering to an old state if I used "entredName"
// STEP: 2
// CleaninUP code.
// 2.1 Rid of pieci of code where I use "nameInputRef" ("const enteredValue = nameInputRef.current.value;"), because I'm using state here to get the value, there is no need to keep the input ref around
// 2.2 Rid of: "const nameInputRef = useRef()" and remove ref assignment in JSX code.
// 2.3 Rid of: "useEffect(() => {} if (enteredNameIsValid) {..."
// 2.4 Rid of: "const [enteredNameIsValid, setEnteredNameIsValid] = useState(false)" just need value and touched state., because "enteredNameIsValid" is simply something we can derive from "enteredName" state and since this entire component function will re-execute whenever a new value is entered we ensure "enteredNameIsValid" will always take into account the latest value and touched state. Because whenever one of these two states ("const [enteredName..." and "const [enteredNameTouched...") changes, "SimpleInput" Component function gets re-rendered
// 2.5 Here is "const enteredNameIsValid = " I wanna store the result of cheking "enteredName.trim() !== " "", because this is "enteredNameIsValid" and that should be true if this yields true "enteredName.trim() !== " "".
// 2.6 After this we can rid of all the parts of the code where we use "setEnteredNameIsValid", because deriving this result of "enteredNameIsValid" from already existing states like this is enough. We ensure that the component function gets re-rendered and gets reevaluated on every keystroke, which is exactly what we want.
// 2.7 In "nameInputBlurHandler" don't need validate too, get rid this. And we can rely on "enteredNameIsValid" state combined with "nameInputIsInvalid", which takes "enteredNameIsValid" constant into account (which is based on the "enteredName") and combines that with "enteredNameTouched".
// 2.8 These two lines of code work together ("enteredNameIsValid" and "nameInputIsInvalid"). We first find out if the "enteredName" was valid, and then we check if it's not valid and combine that information with "enteredNameTouched"
// 2.9 Now in "formSubmissionHandler" still wanna keep "ifcheck". Though, to cancel the form submission if the input is invalid, but we don't need to set the validity, get rid of ("setEnteredNameIsValid(false)"),
// 2.10 Instead here we can simply check if "enteredNameIsValid" is false: ("if (!enteredNameIsValid) {return;}") If it's not valid< I wanna return. This "formSubmissionHandler" also gets recreated when the component function is re-evaluated. So "formSubmissionHandler" function will have access to that latest inferred "entereNameIsValid" value.
// 2.11 Rid of: "setEnteredNameIsValid(true)" - because we got all the code related to that.
// 2.12 Now we wanna reset the touched state once we submit the form. In "formSubmissionHandler" after "setEnteredName("")" add "setEnteredNameTouched(false)" back to false, to reset the touched state
// ~~ REFACTORING AND DERIVING STATE ~~

//

// ~~ MANAGING THE OVERALL FORM VALIDITY ~~
// Case with may inputs and separate validity
// STEP: 1
// 1.1 Add a new state: "const [formIsValid, setFormIsValid] = useState(false)" initially is "false", because that form isn't valid initially.
// Now I wanna update this overall "formIsValid" updating function whenever one of the forum inputs changes, for that we could use "useEffect".
// 1.2 Import "useEffect"
// 1.3 Call "useEffect". In this "useEffect" I want to set the overall form validity. I'll add all the form inout validities I have in this form. Dont forget - we have only one entry ("enteredNameIsValid"). "  useEffect(() => {}, [enteredNameIsValid])"
// In this "useEffect" call I combine all my dependencies and check if thy are all valid. And if they are, I wanna set the overall form to valid.
// 1.4 Add "if(enteredNameIsValid)" and if that valid, then I'll set my overall form as valid "setFormISValid(true)". Else, if at least one of my inouts is valid (in my case only one) I'll set my overall form to invalid: "setFormIsValid(false)"
// 1.5 OPTIONAL: we can disable "submit" button if form is not valid. For this need add in JSX code: "<button disabled={!formIsValid}>Submit</button>"
// 1.5.1 Add style for this disable: in index.css "button:disabled,..."
// 1.6 OPTIONAL: let's impement without "useEffect()"
// 1.6.1 Get rid off: "const [formIsValid, setFormIsValid] = useState(false)"
// 1.6.2 Get rid off useState().
// 1.6.3 Add a new variable "let formIsValid = false" which by default is false let's say. Which we then set to true in this if case "formIsValid=true" . And no need else case.
// ~~ MANAGING THE OVERALL FORM VALIDITY ~~

//

// ~~ ADDING A CUSTOM INPUT HOOK ~~
//
// ~~ ADDING A CUSTOM INPUT HOOK ~~

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

//////////////////////////BEFORE CUSTOM HOOK////////////////////////
/*
// import { useEffect, useRef, useState } from "react";
// import { useState, useEffect } from "react";
import { useState } from "react";

const SimpleInput = (props) => {
  // const nameInputRef = useRef();
  // const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  // Check validity with useEffect
  // const [formIsValid, setFormIsValid] = useState(false);
  // Check vailidity without useEffect
  // const [formIsValid, setFormIsValid] = useState(false);

  // useEffect(() => {
  //   if (enteredNameIsValid) {
  //     console.log("Name Input is valid!");
  //   }
  // }, [enteredNameIsValid]);

  // For E-mail
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

  const enteredNameIsValid = enteredName.trim() !== "";
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  // Check validity with useEffect
  // useEffect(() => {
  //   if (enteredNameIsValid) {
  //     setFormIsValid(true);
  //   } else {
  //     setFormIsValid(false);
  //   }
  // }, [enteredNameIsValid]);

  // Enfer the validity for E-mail
  const enteredEmailIsValid = enteredEmail.includes("@");
  const enteredEmailIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

  // Check vailidity without useEffect
  let formIsValid = false;
  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  // 1 Approach
  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  // For E-mail
  const emailInputChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  // Blur
  const nameInputBlurHandler = (event) => {
    setEnteredNameTouched(true);
  };

  // For E-mail
  const emailInputBlurHandler = (event) => {
    setEnteredEmailTouched(true);
  };

  // 2 Approach
  const formSubmissionHandler = (event) => {
    event.preventDefault();

    setEnteredNameTouched(true);

    if (!enteredNameIsValid) {
      return;
    }

    console.log(enteredName);

    // const enteredValue = nameInputRef.current.value;
    // console.log(enteredValue);

    // nameInputRef.current.value = "";
    setEnteredName("");
    setEnteredNameTouched(false);

    // For E-mail
    setEnteredEmail(""); // to reset that value
    setEnteredEmailTouched(false); // to reset that value
  };

  const nameInputClasses = enteredNameIsValid
    ? "form-control invalid"
    : "form-control";

  // For E-mail
  const emailInputClasses = enteredEmailIsInvalid
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          // ref={nameInputRef}
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
        />
        {nameInputIsInvalid && (
          <p className="error-text">Name must not be empty</p>
        )}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">E-Mail</label>
        <input
          type="email"
          id="email"
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
          value={enteredEmail}
        />
        {enteredEmailIsInvalid && (
          <p className="error-text">Please enter a valid email.</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
*/
