import '../designs/homemindev.css';
import '../designs/home.css';
//import { PopupboxContainer, PopupboxManager } from 'react-popupbox';
import { Toaster, toast } from 'react-hot-toast';
import { PopupboxContainer, PopupboxManager } from 'react-popupbox';
import { BsFillBookmarkHeartFill } from 'react-icons/bs';
import { AiFillDelete, AiFillLock } from 'react-icons/ai';
import { useContext, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AuthProvided from '../lib/auth';
import AuthCheck from '../components/AuthComp';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getLock, deleteNote, updateNote } from '../lib/helper';
import useGetData from '../lib/hooks/getData';
import { AuthContext } from '../lib/context';
import Loading from './loading';


function Locked() {
  const [toggle, setToggle] = useState('');
  const { userId } = useContext(AuthContext);
  const lock = getLock(userId)
  const { data, isLoading, isFetching } = useGetData(userId);
  
  console.log(lock)
  if (isLoading) return <Loading/>;
  console.log(data);


  /*
  console.data(data.docs);
  const closePopupbox = () => {
    PopupboxManager.close();
  };

  const openPopupbox = () => {
    const content = (
      <div>
        <p>This is a modal popup!</p>
        <button onClick={closePopupbox}>Close</button>
      </div>
    );

    PopupboxManager.open({ content });
  };*/

  return (
    <div className='cont'>
      <Toaster />

      <AuthCheck>
        <div className='mainNc'>
          <div className='notescont'>
            <div className='anotes'>
              <h1
                style={{
                  display: 'flex',
                  fontSize: 'larger',
                  fontSize: '22px',
                  justifyContent: 'center',
                }}
              >
                LOCKED NOTES
              </h1>
              <hr
                style={{ marginBottom: '20px', border: '2px dashed white' }}
              ></hr>
              <div className='notes' >
                   
                </div>
                {!data.length ? (
                  <div className='no_notes'>
                    <h1>Create a note📒🖋</h1>
                  </div>
                ) : (
                  data.map((item, i) => (
                    <div className='notes' key={item.id}>
                      <Link
                        className='acN'
                        to={`/${userId}/updateform/${item.id}`}
                      >
                        <h3>{item.title}</h3>
                        <hr className='hrN'></hr>
                        <p>{item.body}</p>
                      </Link>
                      <div className='btn_div'>
                        <button
                          className='btn1'
                          onClick={(e) =>
                            updateNote(item.id, userId, {
                              isLocked: !item.isLocked,
                            })
                          }
                        >
                          <AiFillLock
                            style={{
                              backgroundColor: item.isLocked ? 'red' : '',
                            }}
                          />
                        </button>
                        <button
                          className='btn2'
                          onClick={(e) =>
                            updateNote(item.id, userId, {
                              isFavorited: !item.isFavorited,
                            })
                          }
                        >
                          <BsFillBookmarkHeartFill
                            style={{
                              backgroundColor: item.isFavorited ? 'red' : '',
                            }}
                          />
                        </button>
                        <button
                          onClick={async (e) => {
                            await deleteNote(item.id, userId);
                          }}
                          className='btn3'
                          type='button'
                        >
                          <AiFillDelete />
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}

      
            </div>
          </div>
        </div>
      </AuthCheck>
    </div>
  );
}

export default Locked;
