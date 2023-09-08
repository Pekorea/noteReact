import { db } from "./firebase";
import { setDoc, doc, addDoc, collection, getDocs } from "firebase/firestore";

export async function addUser(user, name) {
  try {
    const newUser = await setDoc(doc(db, "users", user), {
      userid: user,
      name: name,
    });
    return newUser;
  } catch (e) {
    console.log(e);
  }
}

export async function AddNote(note, userid) {
  try {
    const docRef = doc(db, "users", userid);
    const colRef = await addDoc(collection(docRef, "notes"), {
      ...note,
    });
    return colRef;
  } catch (e) {
    throw e;
  }
}

export async function GetData(userid) {
  try {
    const subColRef = collection(db, "users", userid, "notes");
    const data = await getDocs(subColRef);
    return data;
  } catch (e) {
    throw e;
  }
}
