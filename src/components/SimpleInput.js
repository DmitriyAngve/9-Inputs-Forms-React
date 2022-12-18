import { useRef, useState } from "react";

const SimpleInput = (props) => {
  const nameInputRef = useRef();
  const [enteredName, setEnteredName] = useState("");
  // 1 Approach
  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };
  // 2 Approach
  const formSubmissionHandler = (event) => {
    event.preventDefault();

    console.log(enteredName);

    const enteredValue = nameInputRef.current.value;
    console.log(enteredValue);

    // nameInputRef.current.value = "";
    setEnteredName("");
  };

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className="form-control">
        <label htmlFor="name">Your Name</label>
        <input
          ref={nameInputRef}
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          value={enteredName}
        />
      </div>
      <div className="form-actions">
        <button>Submit</button>
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
