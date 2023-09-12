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
  if (!userid) return [];
  try {
    let notes = [];
    const subColRef = collection(db, "users", userid, "notes");
    const data = await getDocs(subColRef);
    data.forEach((doc) => {
      notes.push({ ...doc.data(), id: doc.id });
    });
    if (notes && notes.indexOf) {
      return notes;
    } else {
      GetData(userid);
    }

    return notes;
  } catch (e) {
    throw new Error(e);
  }
}
