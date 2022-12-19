import { useState } from "react";

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  //   const valueIsValid = enteredValue.trim() !== "";
  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  return {
    value: enteredValue,
    hasError: hasError,
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
// 1.9 Also need a way of letting the Components that uses this hook ("setEnteredValue" and "setIsTouched")

// ~~ ADDING A CUSTOM INPUT HOOK ~~
