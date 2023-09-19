import { db } from "./firebase";
import { useState, useEffect } from "react";
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
  onSnapshot,
  orderBy,
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
      notes.push({ ...doc.data(), id: doc.id });
    });

    return notes;
  } catch (e) {
    console.error("Error fetching Locked notes: ", e);
    throw new Error(e);
  }
}

// export async function getFave(userId) {
//   if (!userId) return [];
//   try {
//     let notes = [];
//     const collectionref = query(
//       collection(db, "users", userId, "notes"),
//       where("isFavorited", "==", true)
//     );

//     const querySnapshot = await getDocs(collectionref);
//     querySnapshot.forEach((doc) => {
//       notes.push({ ...doc.data(), id: doc.id });
//     });

//     return notes;
//   } catch (e) {
//     console.error("Error fetching Favorite notes: ", e);
//     throw new Error(e);
//   }
// }

export function useGetFave(userid) {
  const [data, setData] = useState([]);
  const [isloading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);
    if (!userid) {
      // Return early if userid is falsy
      setLoading(false);
      return;
    }

    const subColRef = query(
      collection(db, "users", userid, "notes"),
      where("isFavorited", "==", true)
    );
    const unsub = onSnapshot(
      subColRef,
      (snap) => {
        const newArray = [];

        snap.forEach((doc) => newArray.push({ ...doc.data(), id: doc.id }));

        setData(newArray);
        setLoading(false);
      },

      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsub();
  }, [userid]);
  console.log(data);
  return {
    data,
    isloading,
    error,
  };
}

export function useGetLocked(userid) {
  const [data, setData] = useState([]);
  const [isloading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);
    if (!userid) {
      // Return early if userid is falsy
      setLoading(false);
      return;
    }

    const subColRef = query(
      collection(db, "users", userid, "notes"),
      where("isLocked", "==", true)
    );
    const unsub = onSnapshot(
      subColRef,
      (snap) => {
        const newArray = [];

        snap.forEach((doc) => newArray.push({ ...doc.data(), id: doc.id }));

        setData(newArray);
        setLoading(false);
      },

      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsub();
  }, [userid]);
  console.log(data);
  return {
    data,
    isloading,
    error,
  };
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
