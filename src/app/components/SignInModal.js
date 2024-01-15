import { useState } from "react";
import styles from "./SignInModal.module.css";

const SignInModal = ({ isOpen, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false); 
  const [rememberMe, setRememberMe] = useState(false);

  const handleSignInSubmit = (e) => {
    e.preventDefault();
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>Please Login To Continue</h2>
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
            <input type="text" placeholder="Username or email" />
            <input type="password" placeholder="Password" />
            <div className={styles.rememberMe}>
              <div>
                <label htmlFor="rememberMe">
                  <input id="rememberMe" type="checkbox" value="test" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
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
            <input type="email" placeholder="E-mail" />
            <input type="password" placeholder="Password" />
            <button type="submit" className={styles.signButton}>
              Sign Up
            </button>
          </form>
        )}
        <div className={styles.orSeparator}>or</div>
        <div className={styles.socialSign}>
          <button
            onClick={() => handleSocialSignIn("Google")}
            className={styles.google}
          >
            Google
          </button>
          <button
            onClick={() => handleSocialSignIn("Facebook")}
            className={styles.facebook}
          >
            Facebook
          </button>
          <button
            onClick={() => handleSocialSignIn("LinkedIn")}
            className={styles.linkedin}
          >
            LinkedIn
          </button>
          <button
            onClick={() => handleSocialSignIn("GitHub")}
            className={styles.github}
          >
            GitHub
          </button>
        </div>
        <div className={styles.footer}>Why Create an Account?</div>
      </div>
    </div>
  );
};

export default SignInModal;
