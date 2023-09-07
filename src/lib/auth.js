import { useState, useEffect } from "react";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { addUser } from "./helper";

export default function AuthProvided() {
  const [user, setUser] = useState(null);

  const siginUp = async (email, password) => {
    try {
      const userInfo = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userInfo.user.uid);
      await addUser(userInfo.user.uid);
    } catch {
      console.error("Error signing in with password and email");
    }
  };

  const signIn = async (email, password) => {
    try {
      const signInUser = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(signInUser.user.uid);
    } catch {
      console.log("something went wrong");
    }
  };
  const signOutF = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch {}
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.uid);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe;
  }, []);

  return {
    userId: user && null,
    signIn,
    siginUp,
    signOutF,
  };
}
