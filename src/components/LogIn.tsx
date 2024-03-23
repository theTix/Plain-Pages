//react
import { useContext, useEffect, useReducer, useRef} from "react"

//react-router-dom
import { NavLink } from "react-router-dom";

//assets
import Background from "./../assets/background.mp4";

//context
import userContext, { useAuth } from "../contexts/context";

//firebase
import { doSignInWIthEmailAndPassword } from "../firebase/auth";


//styles
import "../styles/LogIn.css";

const INITIAL_STATE: InitialStateType = {
  user: "",
  email: "",
  pass: "",
  error: false,
  success: false
}

type InitialStateType = {
  user: string,
  email: string,
  pass: string,
  error: boolean,
  success: boolean
}

type ActionType = 
  | {type: "HANDLE_INPUT", payload: {name: string, value: string}}
  | {type: "VALID_ENTRY"}
  | {type: "INVALID_ENTRY"}
  | {type: "CLEAR_INFO"};


const reducer = (state: InitialStateType, action: ActionType) => {
  switch(action.type) {
    case "HANDLE_INPUT":
      return {
        ...state,
        [action.payload.name]: action.payload.value
      }
    case "VALID_ENTRY":
      return {
        ...state,
        success: true
      }
    case "INVALID_ENTRY":
      return {
        ...state,
        error: true
      }
    case "CLEAR_INFO":
      return {
        ...state,
        user: "",
        email: "",
        pass: ""
      }
    default:
      return {
        ...state
      }
  }
}


const LogIn: React.FC = () => {
  const userRef = useRef<HTMLInputElement>(null);

  const { setAuthorized } = useAuth();
  const { setUsername } = useContext(userContext);

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    if(userRef.current) {
      userRef.current.focus();
    }
  }, []);

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try{
      await doSignInWIthEmailAndPassword(state.email, state.pass);
      dispatch({type: "VALID_ENTRY"});
      setAuthorized(true);
      setUsername(state.user);
    } catch {
      dispatch({type: "INVALID_ENTRY"});
    }
    dispatch({type: "CLEAR_INFO"});
  }

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
          <h1>You're Successfully Logged In!</h1>
          <section className="below-form-note">
            <p>Please go to</p>
            <NavLink to="/">Home</NavLink>
          </section>
        </section>
      ) : (
        <section className="authentication-container">
          <h1>Log in</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">
              <p>Username:</p>
            </label>
            <input 
              type="text" 
              placeholder="Username"
              name="user"
              onChange={(e) => dispatch({type: "HANDLE_INPUT", payload: {name: e.target.name, value: e.target.value}})}
              value={state.user}
              ref={userRef}
              autoComplete="off"
              id="username"
              aria-required
              required
            />
            
            <label htmlFor="email">
              <p>E-mail: </p>
            </label>
            <input 
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              autoComplete="email"
              onChange={(e) => dispatch({type: "HANDLE_INPUT", payload: {name: e.target.name, value: e.target.value}})}
              value={state.email}
              aria-required
              required
            />
          
            <label htmlFor="pass">
              <p>Password:</p>
            </label>
            <input 
              type="password" 
              id="pass"
              name="pass"
              placeholder="Password"
              onChange={(e) => dispatch({type: "HANDLE_INPUT", payload: {name: e.target.name, value: e.target.value}})}
              value={state.pass}
              aria-required
              required
            />
            <p className={state.error ? "invalid" : "hide"}>Incorrect information. Please try again.</p>

            <button className="authentication-btn btn-enabled">Log In</button>
          </form>
          <section className="below-form-note">
            <p>Don't Have An Account?</p>
            <span>
              <NavLink to="/signup">Sign Up</NavLink>
              <NavLink to="/">Home</NavLink>
            </span>
          </section>
        </section>
      )}

    </div>
  )
}

export default LogIn