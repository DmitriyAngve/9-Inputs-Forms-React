// UseState
// import { useState } from "react";

// const useInput = (validateValue) => {
//   const [enteredValue, setEnteredValue] = useState("");
//   const [isTouched, setIsTouched] = useState(false);

//   //   const valueIsValid = enteredValue.trim() !== "";
//   const valueIsValid = validateValue(enteredValue);
//   const hasError = !valueIsValid && isTouched;

//   const valueChangeHandler = (event) => {
//     setEnteredValue(event.target.value);
//   };

//   const inputBlurHandler = (event) => {
//     setIsTouched(true);
//   };

//   const reset = () => {
//     setEnteredValue("");
//     setIsTouched(false);
//   };

//   return {
//     value: enteredValue,
//     isValid: valueIsValid,
//     hasError: hasError,
//     valueChangeHandler,
//     inputBlurHandler,
//     reset,
//   };
// };

// export default useInput;

// UseReducer
import { useReducer } from "react";

const initialInputState = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  if (action.type === "INPUT") {
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type === "BLUR") {
    return { isTouched: true, value: state.value };
  }
  if (action.type === "RESET") {
    return { isTouched: false, value: "" };
  }
  return inputStateReducer;
};

const useInput = (validateValue) => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    dispatch({ type: "INPUT", value: event.target.value });
  };

  const inputBlurHandler = (event) => {
    dispatch({ type: "BLUR" });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;

// ~~ ADDING A CUSTOM INPUT HOOK ~~
// STEP: 1
// 1.1 Add hook function
// 1.2 export as a default
// In this hook function, I wanna to manage the value of a given input ("[enteredName, setEnteredName]"); the touched state ("[enteredNameTouched, setEnteredNameTouche]"); infer it's validity ("enteredEmailIsValid", " enteredEmailIsInvalid"). The concrete validation logic should be passed into the hook ("enteredNameIsValid = enteredName.trim() !== """)
// 1.3 Create first "useState()": "const [enteredValue, setEnteredValue] = useState("")" Value for more generic
// 1.4 Create first " const [isTouched, setIsTouched] = useState(false)"
// 1.5 As a next step create (copy from SimpleInput.js) unfered state and gives those other names
// 1.5.1 "const valueIsValid = enteredValue.trim() !== """
// 1.5.2 "const hasError = !valueIsValid && isTouched"; "valueIsValid" combined with "isTouched" I find out whether we wanna show an error or not.
// We can expect a function as an argument to this custom hook function
// 1.6 "const useInput = (validateValue) =>{..." add function "validateValue" as a parameter
// 1.7 For more usefull this logic i replace: "const valueIsValid = validateValue(enteredValue)" - make more generic.
// 1.8 This hook could return something - it could return an object, could also be an array. Then this object return the value which is entered value (" value: enteredValue,"). Return hasError which holds the result stored in hasError. "hasError" (in modern JavaScript we just listing this hasError once).
// Also need a way of letting the Components that uses this hook ("setEnteredValue" and "setIsTouched")
// 1.9 Create "const valueChangeHandler = (event) =>{..." and "const inputBlurHandler = (event) => {...".
// 1.10 And when we return, I wanne expose those functions "return {   value: enteredValue, hasError: hasError, valueChangeHandler,    inputBlurHandler,};"
// These functions which are defined in the hook can be called from the place where to hook is being used.
// Let's use this CUSTOM HOOK in SimpleInput.js
// GO TO ---->>>> SimpleInput.js
// CAME FROM SimpleInput.js
// STEP: 3
// 3.1 add reset function where we simply call "setEnteredValue("")" and set this to empty string and "setIsTouched(false)"
// 3.2 And just need to expose that: add to "return" reset fucntion as a value in a reset key in that overall returned object.
// GO TO ---->>>> SimpleInput.js
// ~~ ADDING A CUSTOM INPUT HOOK ~~

// ~~ USEREDUCER FUNCTION ~~
// STEP: 1
// 1.1 Import useReducer
// 1.2 Add "useReducer" function: "const inputStateReducer = () => {..."
// 1.3 It takes two main arguments: the previous "state" snapshot, which will be provided and passed in automatically by React; "action" which will also be passed into this function automatically by React, but which is the "action" you dispatched somewhere in your code.
// 1.4 And then Return a new state snapshot. And we can return a default state snapshot, which we always return unless we change it in code we're about to add, and that could contain our" value: """, "isTouched: false"
// 1.5 In hook call"useReducer()" and pass our "inputStateReducer" function to "useReducer" and also provide our initial state, which is basically this state (returned in "inputStateReducer").
// 1.6 Add another constnat "initialInputState", which simply holds this object: "const initialInputState = { value: "", isTouched: false }"
// 1.7 Add second argument in "useReducer": "useReducer(inputStateReducer, initialInputState)"
// 1.8 UseReducer returns an array with exactly two elements. First element is always the state managed by the reducer and second element is always a dispatched fuction, which allows you to dispatch actions againts that reducer. ("const [inputState, dispatch] = useReducer()...")
// 1.9 For validating the value: "const valueIsValid = validateValue(inputState.value)". Inputstate will have a value property (from "initalInputState") because that is the structure our state.
// 1.10 For "hasError": get the touch state - "const hasError = !valueIsValid && inputState.isTouched"
// 1.11 Now when "valueChangeHandler" executes we wanna "dispatch" an "action" againts our reducer. Often is an object: with a "type" property wjich identifies the action, and set "type" to a string called "INPUT" and it can also carry a payload, and here I'll value property to this object, which holds "event.target.value" as a value ("dispatch({ type: "INPUT", value: event.target.value })")
// 1.12 We also wanna "dispatch" in the end "inputBlurHandler" ("dispatch({ type: "BLUR"})") value - no matter.
// 1.13 For "reset" we can "dispatch" an object where to type is reset.("dispatch({ type: "RESET" })")
// 1.14 In "return" we return a "value: inputState.value"
// Now need to handle three actions "type": "INPUT","BLUR"","RESET" in "useReducer"
// STEP: 2
// 2.1 Add "ifcheck" "if(action.type === "INPUT")" and other 3.
// 2.2 "return {value: action.value}" because in the input action case we will have a 'value: event.target.value' carries the entered value.
// I don't wanna set "isTouched" to true, because we have a keystroke the user didn't finish typing yet.
// 2.3 I will set "isTouched" to "state.isTouched" using the previous states "isTouched value" from "const = inputStateReducer = (state...."
// 2.4 In Blur case I wanna return new object, and here I wanna set "isTouched" to true, because that is what we do when the inputs blurs. It should be marked as touched. Don't care about the value here ("value: state.value") - using the existing value.
// 2.5 In reset I return an object where I said "isTouched" to false, and "value:"" " 9back to empty string to reset this.
// ~~ USEREDUCER FUNCTION ~~
