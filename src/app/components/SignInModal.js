import { useState } from "react";
import styles from "./SignInModal.module.css";
import { signIn, signInWithGoogle, signUp } from "../../services/authService";

const SignInModal = ({setIsLoggedIn, isLoggedIn, setIsFirstLogin, isFirstLogin}) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginFalse, setLoginFalse] = useState(false);

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password, rememberMe);
      if (rememberMe) {
        localStorage.setItem("rememberMe", true);
      }
      setIsLoggedIn(true);
      setIsFirstLogin(false);
  
     
    } catch (error) {
      // Handle any errors that occurred during sign-in
      console.error("Error during sign-in:", error);
      setLoginFalse(true); // Optionally set login state to false in case of error
      // You might also want to display an error message to the user here
    }
  };
  
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      setIsFirstLogin(true);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Signup failed:", error.message);
    }
  };

  const handleGoogleSignIn = async() => {
    console.log("Google Sign In");
    try{
      await signInWithGoogle();
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Google Sign In failed:", error.message);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>Please Login To Continue</h2>
        {loginFalse&&!isSignUp  ? ("Incorrect username or password") : ("")}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${!isSignUp ? styles.active : ""}`}
            onClick={() => setIsSignUp(false)}
          >
            Sign In
          </button>
          <button
            className={`${styles.tab} ${isSignUp ? styles.active : ""}`}
            onClick={() => setIsSignUp(true)}
          >
            Sign Up
          </button>
        </div>
        {!isSignUp ? (
          // Sign In Form
          <form className={styles.signForm} onSubmit={handleSignInSubmit}>
            <input
              type="text"
              placeholder="Username or email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className={styles.rememberMe}>
              <div>
                <label htmlFor="rememberMe">
                  <input
                    id="rememberMe"
                    type="checkbox"
                    value="test"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  Remember me
                </label>
              </div>
              <label className={styles.forgotPassword} htmlFor="forgotPassword">
                Forgot Password
              </label>
            </div>
            <button type="submit" className={styles.signButton}>
              Sign In
            </button>
          </form>
        ) : (
          // Sign Up Form
          <form className={styles.signForm} onSubmit={handleSignUpSubmit}>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className={styles.signButton}>
              Sign Up
            </button>
          </form>
        )}
        <div className={styles.orSeparator}>or</div>
        <div className={styles.socialSign}>
          <button
            onClick={() => handleGoogleSignIn("Google")}
            className={styles.google}
          >
            Google
          </button>
        </div>
        <div className={styles.footer}>Why Create an Account?</div>
      </div>
    </div>
  );
};

export default SignInModal;
