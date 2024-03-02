//react
import { useContext, useEffect, useRef, useState } from "react"

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


const LogIn: React.FC = () => {
  const userRef = useRef<HTMLInputElement>(null);

  const { setAuthorized } = useAuth();

  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess]= useState(false);

  const { setUsername } = useContext(userContext);

  useEffect(() => {
    if(userRef.current) {
      userRef.current.focus();
    }
  }, []);

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUsername(user);
    setUser("");
    setEmail("");
    setPass("");
    await doSignInWIthEmailAndPassword(email, pass);
    setSuccess(true);
    setAuthorized(true);
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
      {success ? (
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
              onChange={(e) => setUser(e.target.value)}
              value={user}
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
              placeholder="Email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              aria-required
              required
            />
          
            <label htmlFor="pass">
              <p>Password:</p>
            </label>
            <input 
              type="password" 
              id="pass"
              placeholder="Password"
              onChange={(e) => setPass(e.target.value)}
              value={pass}
              aria-required
              required
            />

            <button className="authentication-btn btn-enabled">Log In</button>
          </form>
          <section className="below-form-note">
            <p>Don't Have An Account?</p>
            <NavLink to="/signup">Sign Up</NavLink>
          </section>
        </section>
      )}

    </div>
  )
}

export default LogIn