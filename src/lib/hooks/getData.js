import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
export default function useGetData(userid) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    if (!userid) return;
    setLoading(true);
    const subColRef = collection(db, 'users', userid, 'notes');
    const unsub = onSnapshot(
      subColRef,
      (snap) => {
        const newArray = [];
        snap.forEach((doc) => newArray.push(doc.data()));
        setNotes(newArray);
        setLoading(false);
      },

      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsub();
  }, [userid]);
  return {
    notes,
    loading,
    error,
  };
}
