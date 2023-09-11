import '../designs/homemindev.css';
import '../designs/home.css';
import { PopupboxContainer, PopupboxManager } from 'react-popupbox';

import { Toaster, toast } from 'react-hot-toast';
import { GrAdd } from 'react-icons/gr';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthProvided from '../lib/auth';
import AuthCheck from '../components/AuthComp';
import { useQuery } from '@tanstack/react-query';
import { GetData } from '../lib/helper';
function Home() {
  const [toggle, setToggle] = useState('');
  const { userId } = AuthProvided();
  const { data, isLoading } = useQuery({
    queryKey: ['todos', userId],
    queryFn: () => GetData(userId),
  });
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
              {data &&
                data.map((item) => (
                  <div className='notes' key={item.id}>
                    <div className='acN'>
                      <h3>{item.title}</h3>
                      <hr className='hrN'></hr>
                      <p>{item.body}</p>
                    </div>
                  </div>
                ))}

              <div className='abdiv'>
                <Link to='/noteform'>
                  <button className='addbutton'>
                    <GrAdd />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </AuthCheck>
    </div>
  );
}

export default Home;
