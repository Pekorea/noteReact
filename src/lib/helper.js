import { db } from "./firebase";
import {
  query,
  setDoc,
  doc,
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
  getDoc,
  updateDoc,
  deleteDoc,
  where,
} from "firebase/firestore";

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
      isFavorited: false,
      isLocked: false,
      timeStamps: serverTimestamp(),
    });
    return colRef;
  } catch (e) {
    throw e;
  }
}
export async function getLock(userId) {
  if (!userId) return [];
  try {
    let notes = [];
    const collectionref = query(
      collection(db, "users", userId, "notes"),
      where("isLocked", "==", true)
    );
    const querySnapshot = await getDocs(collectionref);
    querySnapshot.forEach((doc) => {
      notes.push(...doc.data());
    });
    if (notes && notes.indexOf) {
      return notes;
    } else {
      getLock(userId);
    }
    return notes;
  } catch (e) {
    console.error("Error fetching Locked notes: ", e);
    throw new Error(e);
  }
}

export async function getFave(userId) {
  if (!userId) return [];
  try {
    let notes = [];
    const collectionref = query(
      collection(db, "users", userId, "notes"),
      where("isFavorited", "==", true)
    );

    const querySnapshot = await getDocs(collectionref);
    querySnapshot.forEach((doc) => {
      notes.push({ ...doc.data(), id: doc.id });
    });

    return notes;
  } catch (e) {
    console.error("Error fetching Favorite notes: ", e);
    throw new Error(e);
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

export async function getOneNote(noteId, userId) {
  const docRef = doc(db, "users", userId, "notes", noteId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
    //return docSnap.data();
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
  return null;
}

export async function updateNote(noteId, userId, data) {
  const docRef = doc(db, "users", userId, "notes", noteId);
  const docSnap = await updateDoc(docRef, {
    ...data,
  });

  console.log(docSnap);
}

export async function deleteNote(noteId, userId) {
  const docref = doc(db, "users", userId, "notes", noteId);
  await deleteDoc(docref);
}
