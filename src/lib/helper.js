import { db } from './firebase';
import { setDoc, doc } from 'firebase/firestore';

export async function addUser(user) {
  try {
    const newUser = await setDoc(doc(db, 'users', user), {
      userid: user,
    });
    return newUser;
  } catch (e) {
    console.log(e);
  }
}
