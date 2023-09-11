import '../designs/homemindev.css';
import '../designs/home.css';
//import { PopupboxContainer, PopupboxManager } from 'react-popupbox';
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { AiFillDelete, AiFillLock } from "react-icons/ai";
import { Toaster, toast } from 'react-hot-toast';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthProvided from '../lib/auth';
import AuthCheck from '../components/AuthComp';
import { useQuery } from '@tanstack/react-query';
import { GetData } from '../lib/helper';
function Locked() {
  const [toggle, setToggle] = useState('');
  const { userId } = AuthProvided();
  /*const { data, isLoading } = useQuery({
    queryKey: ['todos', userId],
    queryFn: () => GetData(userId),
  });
  if (isLoading) return <h1>loading</h1>;
  console.log(data);*/


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
             {/*key={item.id} {data &&
                data.map((item) => (
                  <div className='acN'>
                      <h3>{item.title}</h3>
                      <hr className='hrN'></hr>
                      <p>{item.body}</p>
                    </div>
                    <div className='btn_div'>
                    <button className='btn1'><AiFillLock/></button>
                    <button className='btn2'><BsFillBookmarkHeartFill/></button>
                    <button className='btn3'><AiFillDelete/>Delete</button>
                    </div>
                  //check line 57 i put the current date with time code there
                  </div>
                  
                )):
                <div className='no_notes'> 
                  <h1>No Locked Notes🔒📒</h1>
                </div>
                ))}*/}

      
            </div>
          </div>
        </div>
      </AuthCheck>
    </div>
  );
}

export default Locked;
