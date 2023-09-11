import '../designs/homemindev.css';
import '../designs/home.css';
import { PopupboxContainer, PopupboxManager } from 'react-popupbox';
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { AiFillDelete, AiFillLock } from "react-icons/ai";
import { Toaster, toast } from 'react-hot-toast';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthProvided from '../lib/auth';
import AuthCheck from '../components/AuthComp';
import { useQuery } from '@tanstack/react-query';
import { GetData } from '../lib/helper';
function Home() {
  const current_date = new Date();
  const current_day = current_date.getDate();
  const current_month = current_date.getMonth() + 1;
  const current_year = current_date.getFullYear();
  const current_time = current_date.getHours() + ":" + current_date.getMinutes();
  const date = `${current_day}/${current_month}/${current_year}-${current_time}`
  //console.log(`${current_day}/${current_month}/${current_year}-${current_time}`);

  const [toggle, setToggle] = useState('');
  const { userId } = AuthProvided();
  const [display, setDisplay] = useState(true);
  const { data, isLoading } = useQuery({
    queryKey: ['todos', userId],
    queryFn: () => GetData(userId),
  });
  /*
  if (data!==null){
    setDisplay(true);
  }
  else{
    setDisplay(false)
  }*/
  
  if (isLoading) return <h1>loading</h1>;
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
 //<p>{current_date}</p>
  return (
    <div className='cont'>
      <Toaster />

      <PopupboxContainer />
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
                NOTES
              </h1>
              <hr
                style={{ marginBottom: '20px', border: '2px dashed white' }}
              ></hr>
              <div className='notelist'>
              {
              data.length>0 ?//this block of code needs async await guy
                data.map((item) => (
                  <div className='notes' key={item.id}>
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
                  
                  </div>
                  
                )):
                <div className='no_notes'> 
                  <h1>Create a note📒🖋</h1>
                </div>
               }
              </div>
            
            </div>
          </div>
        </div>
      </AuthCheck>
    </div>
  );
}

export default Home;
