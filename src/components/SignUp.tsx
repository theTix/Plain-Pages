//react
import { useEffect, useRef, useReducer } from "react"

//react-router-dom
import { NavLink } from "react-router-dom";

//react-icons
import { FaCheck, FaInfoCircle, FaTimes } from "react-icons/fa";

//assets
import Background from "./../assets/background.mp4"

//firebase
import { doCreateUserWithEmailAndPassword } from "../firebase/auth";

//styles
import "./../styles/SignUp.css";

const INITIAL_STATE: InitialStateType = {
  user: "",
  validName: false,
  userFocus: false,
  email: "",
  validEmail: false,
  emailFocus: false,
  pass: "",
  validPass: false,
  passFocus: false,
  repeatPass: "",
  validRepeat: false,
  repeatPassFocus: false,
  success: false,
  error: ""
};

type InitialStateType = {
  user: string,
  validName: boolean,
  userFocus: boolean,
  email: string,
  validEmail: boolean,
  emailFocus: boolean,
  pass: string,
  validPass: boolean,
  passFocus: boolean,
  repeatPass: string,
  validRepeat: boolean,
  repeatPassFocus: boolean,
  success: boolean,
  error: string
};

type ActionType = 
  | {type: "TAKE_INPUT", payload: {name: string, value: string}}
  | {type: "HANDLE FOCUS/BLUR", payload: {name: string, value: boolean}}
  | {type: "CHECK_VALIDITY", payload: {name: string}}
  | {type: "CHECK_REPEAT_VALIDITY"}
  | {type: "VALID_ENTRY"}
  | {type: "INVALID_ENTRY", payload: {value: string}};

const reducer = (state: InitialStateType,action: ActionType) => {
  switch(action.type){
    case "TAKE_INPUT":
      return {
        ...state,
        [action.payload.name]: action.payload.value
      }
    case "HANDLE FOCUS/BLUR":
      return {
        ...state,
        [`${action.payload.name}Focus`]: action.payload.value
      }
    case "CHECK_VALIDITY":
      return {
        ...state,
        [`valid${action.payload.name}`]: action.payload.name === "Name" ? USER_REGEX.test(state.user) : action.payload.name === "Email" ? EMAIL_REGEX.test(state.email) : PASS_REGEX.test(state.pass)
      }
    case "CHECK_REPEAT_VALIDITY":
      return {
        ...state,
        validRepeat: state.pass === state.repeatPass
      }
    case "VALID_ENTRY":
      return {
        ...state,
        success: true
      }
    case "INVALID_ENTRY":
      return {
        ...state,
        error: action.payload.value
      }
  }
}

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,24}$/;
const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
const PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;


{/* <p>Must include uppercase and lowercase letters, a number and a special character.<br /></p>
<p>Allowed special characters: <span aria-label="exclamation-mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span></p> */}

const SignUp: React.FC = () => {
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLInputElement>(null);

  const [state, dispatch]= useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    userRef.current?.focus();
  }, [])

  useEffect(() => {
    dispatch({type: "CHECK_VALIDITY", payload: {name: "Name"}})
  }, [state.user])

  useEffect(() => {
    dispatch({type: "CHECK_VALIDITY", payload: {name: "Email"}})
  }, [state.email])
  
  useEffect(() => {
    dispatch({type: "CHECK_VALIDITY", payload: {name: "Pass"}});
    dispatch({type: "CHECK_REPEAT_VALIDITY"})
  }, [state.pass, state.repeatPass])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    dispatch({type: "TAKE_INPUT", payload: {name: e.target.name, value: e.target.value}});
  }

  const handleFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    dispatch({type: "HANDLE FOCUS/BLUR", payload: {name: e.target.name, value: true}});
  }

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    dispatch({type: "HANDLE FOCUS/BLUR", payload: {name: e.target.name, value: false}})
  }

  const handleDisabledClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const check1 = USER_REGEX.test(state.user);
    const check2 = EMAIL_REGEX.test(state.email);
    const check3 = PASS_REGEX.test(state.pass);
    
    if(!check1 || !check2 || !check3) {
      dispatch({type: "INVALID_ENTRY", payload: {value: "Invalid entry."}})
    } else {
      dispatch({type: "VALID_ENTRY"});
      await doCreateUserWithEmailAndPassword(state.email, state.pass);
    }
  }

  console.log(state.success);

  return (
    <div className="authentication-background">
      <video 
        className="authentication-video-background" 
        autoPlay 
        muted 
        loop 
        playsInline 
        src={Background}
      />
      {state.success ? (
        <section className="authentication-container">
          <h1>You've Successfully Signed Up!</h1>
          <section className="below-form-note">
            <p>Please log in</p>
            <NavLink to="/login">Log In</NavLink>
          </section>
        </section>
      ) : (
        <section className="authentication-container">
          <p
            ref={errRef}
            aria-live="assertive"
            className={state.error !== "" ? "err-msg" : "offscreen"}
          ></p>
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="user">
              <span>Username: </span>
              <span className={state.validName ? "valid" : "hide"}>
                <FaCheck />
              </span>
              <span className={state.validName ? "hide" : "invalid"}>
                <FaTimes />
              </span>
            </label>
            <input 
              type="text" 
              id="user"
              ref={userRef}
              autoComplete="off"
              name="user"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              aria-invalid={state.validName ? "false" : "true"}
              aria-describedby="uidnote"
              required
            />
            <section
              id="uidnote"
              className={`instructions-note ${state.userFocus && state.user && !state.validName ? "instructions" : "offscreen"}`}
            >
              <p><FaInfoCircle /> 4 to 24 characters.</p>
              <p>Must begin with a letter.</p>
              <p>Letters, numbers, underscores and hyphens allowed.</p>
            </section>

            <label htmlFor="email">
              <span>E-mail: </span>
              <span className={state.validEmail ? "valid" : "hide"}>
                <FaCheck />
              </span>
              <span className={state.validEmail ? "hide" : "invalid"}>
                <FaTimes />
              </span>
            </label>

            <input 
              type="email" 
              id="email"
              name="email"
              autoComplete="off"
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              aria-invalid={state.validEmail ? "false" : "false"}
              aria-describedby="emailnote"
              required
            />
            <section 
              id="emailnote" 
              className={`instructions-note ${!state.validEmail && state.email && state.emailFocus ? "instructions" : "offscreen"}`}
            >
              <p><FaInfoCircle /> Please provide a valid email.</p>
            </section>

            <label htmlFor="pass">
              <span>Password: </span>
              <span className={state.validPass ? "valid" : "hide"}>
                <FaCheck />
              </span>
              <span className={state.validPass || !state.pass ? "hide" : "invalid"}>
                <FaTimes />
              </span>
            </label>

            <input 
              type="password" 
              id="pass"
              name="pass"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              aria-invalid={state.validPass ? "false" : "true"}
              aria-describedby="passnote"
              required
            />
            <section 
              id="passnote" 
              className={`instructions-note ${state.passFocus && !state.validPass ? "instructions" : "offscreen"}`}
            >
              <p><FaInfoCircle /> 8 to 24 characters.</p>
              <p>Must include uppercase and lowercase letters, a number and a special character.<br /></p>
              <p>Allowed special characters: <span aria-label="exclamation-mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span></p>
            </section>

            <label htmlFor="repeat-pass">
              <span>Confirm password: </span>
              <span className={state.validRepeat ? "valid" : "hide"}>
                <FaCheck />
              </span>
              <span className={state.validRepeat ? "hide" : "invalid"}>
                <FaTimes />
              </span>
            </label>

            <input 
              type="password" 
              id="repeat-pass"
              name="repeatPass"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              aria-invalid={state.validRepeat ? "false" : "true"}
              aria-describedby="confirmnote"
              required
            />
            <section
              id="confirmnote"
              className={`instructions-note ${!state.validRepeat && state.repeatPassFocus ? "instructions" : "offscreen"}`}
            >
              <p><FaInfoCircle /> <span>Must match the first password input field.</span></p>
            </section>

            <button
              disabled={!state.validName || !state.validEmail || !state.validPass || !state.validRepeat ? true : false}
              aria-disabled={!state.validName || !state.validEmail || !state.validPass || !state.validRepeat ? true : false}
              onClick={() => !state.validName || !state.validEmail || !state.validPass || !state.validRepeat ? handleDisabledClick : ""}
              className={`authentication-btn ${!state.validName || !state.validEmail || !state.validPass || !state.validRepeat ? "btn-disabled" : "btn-enabled"}`}
            >
              Sign Up
            </button>
          </form>

          <section className="below-form-note">
            <p>Already Have an Account?</p>
            <NavLink to="/login">Log In</NavLink>
          </section>
        </section>
      )}

    </div>
  )
}

export default SignUp