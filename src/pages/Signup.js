import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import AuthProvided from '../lib/auth';

export default function SignUp() {
  const [name, setName] = useState('');
  const [pass, setPassword] = useState('');

  const [email, setEmail] = useState('');
  const [view, setView] = useState(true);
  const { siginUp } = AuthProvided();

  const handlesub = async (e) => {
    e.preventDefault();
    siginUp(email, pass);
    toast('Successfully Registered', { duration: 3000, icon: '✔' });
  };

  return (
    <div className='cont'>
      <Header />
      <form onSubmit={handlesub}>
        <div className='mainContainer'>
          <Toaster />

          <div className='valds'>
            <div className='maincontvalds'>
              <div className='forms'>
                <div className='headercont'>
                  <h1 className='Signup'>SIGNUP</h1>
                  <hr></hr>
                </div>

                <div className='emailInputdiv'>
                  <input
                    type='text'
                    placeholder=''
                    className='nameInput'
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                  ></input>
                  <label>Name</label>
                </div>

                <div className='inputs'>
                  <div className='emailInputdiv'>
                    <input
                      type='email'
                      placeholder=''
                      className='emailInput'
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      required
                    ></input>
                    <label>Email</label>
                  </div>

                  <div className='passwordInputdiv'>
                    <input
                      value={pass}
                      onChange={(e) => setPassword(e.target.value)}
                      type={view ? 'password' : 'text'}
                      className='passwordInput'
                      required
                    ></input>
                    <label>Password</label>
                  </div>
                  <div className='checkbos'>
                    <Link className='linkto' to='/'>
                      <p>Login?</p>
                    </Link>
                    {/* <div>
                      <input
                        className='viewpass'
                        type='checkbox'
                        onChange={handleChecked}
                      ></input>
                      <label
                        className='view'
                        style={{ color: 'white', fontSize: 'small' }}
                      >
                        {view ? `Show` : `Hide`} password
                      </label>
                    </div> */}
                  </div>

                  <div className='logbtndiv'>
                    <button className='logbtn' type='submit'>
                      REGISTER
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='imgcont'>
            <h2 className='TN'>THE NOTEBOOK</h2>
          </div>
        </div>{' '}
      </form>
    </div>
  );
}
