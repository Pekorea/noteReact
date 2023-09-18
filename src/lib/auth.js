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
  const [user, setUser] = useState("");

  const siginUp = async (email, password, name) => {
    try {
      const userInfo = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userInfo.user.uid);

      await addUser(userInfo.user.uid, name);
    } catch (e) {
      throw e;
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
    } catch (e) {
      throw e;
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
    userId: user,
    signIn,
    siginUp,
    signOutF,
  };
}
