import { useEffect, useState } from 'react';

import { getOneNote, updateNote } from '../lib/helper';
import { serverTimestamp } from 'firebase/firestore';

import { Toaster, toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import Loading from './loading';

const Updateform = () => {
  const nav = useNavigate();
  const { id, userId } = useParams();
  const query = useQueryClient();
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function getData() {
      setData(await getOneNote(id, userId));
      setLoading(false);
    }
    return () => getData();
  }, [id, userId]);
  console.log(data);
  /*const { data, isLoading } = useQuery({
    queryKey: ["todos", userId],
    queryFn: () => GetData(userId),
  });
 
  console.log(data);

  //const { userId } = AuthProvided();
  /* const mutation = useMutation({
    //mutationFn: () => AddNote({ title, body }, userId),
  });*/

  //const textcontent= textObject.value
  if (isLoading) return <Loading />;
  const updatenotes = (e) => {
    e.preventDefault();
    console.log(e.target.title.value);
    const title = e.target.title.value;
    const body = e.target.body.value;
    if (title.length === 0 || body.length === 0) {
      toast('Fill the Text fields appropriately!', {
        duration: 2000,
        icon: '🚩🚩',
      });
    } else if (title.length < 3 || title.length > 35) {
      toast('Title minlength is 3 and max is 15', {
        duration: 2000,
        icon: '❗❗',
      });
    } else if (body.length < 3) {
      toast('Text minlength is 3', {
        duration: 2000,
        icon: '❗❗',
      });
    } else if (body.length > 3500) {
      toast('TEXT maxlength is 3500 Characters', {
        duration: 2000,
        icon: '❗❗',
      });
    } else {
      updateNote(id, userId, { title, body, timeStamps: serverTimestamp() });
      query.invalidateQueries({ queryKey: ['notes'] });
      toast('Note Updated!', { duration: 1200, icon: '✔' });
      setTimeout(() => {
        nav('/home');
      }, 1500);
    }
  };

  return (
    <div>
      <Toaster />
      <div className='noteform'>
        <form onSubmit={updatenotes} className='notesform'>
          <h1>UPDATE NOTE</h1>
          <hr></hr>
          <input
            minLength={3}
            type='text'
            defaultValue={data?.title}
            placeholder='TITLE...'
            className='titlebox'
            maxLength={30}
            name='title'
          />
          <div className='textbox_div'>
            <textarea
              minLength={2}
              defaultValue={data?.body}
              type='text'
              rows={10}
              maxLength={3500}
              placeholder='Enter your text here'
              className='textbox'
              name='body'
            />
          </div>

          <div className='notesbtn_div'>
            <button className='Savebtn' type='submit'>
              UPDATE
            </button>
            <button className='buttun' type='button'>
              CLEAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Updateform;
