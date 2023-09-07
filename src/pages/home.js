import '../designs/homemindev.css'
import '../designs/home.css'
import {PopupboxContainer,PopupboxManager} from 'react-popupbox'
import Navbar from '../components/navbar'
import { Toaster, toast } from 'react-hot-toast'
import {GrAdd} from 'react-icons/gr'
import { useState } from 'react'
import {Link} from 'react-router-dom'

function Home() {
  const [toggle,setToggle]= useState("")

  const newForm=()=>{
    
  }
  
  /*
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
    <div className="cont">
      <Toaster/>
        <Navbar/>
        <PopupboxContainer />
        <div className='mainNc'>
        <div className='notescont'>
          <div className='anotes'>
            <h1 style={{display:'flex',fontSize:'larger',fontSize: '22px',justifyContent:'center'}}>NOTES</h1>
            <hr style={{marginBottom:'20px',border:'2px dashed white'}}></hr>
            <div className='notes'>

              <div className='acN'>
              <h3>Title</h3>
              <hr className='hrN'></hr>
              <p>Today, i went to the farm, and i saw a lion.</p>
              </div> 
             
            </div>

            
            <div className='abdiv'>
              <Link to='/noteform'><button className='addbutton' ><GrAdd/></button></Link>
            </div>
            
          </div>
            
        </div>
        </div>
        
    </div>
  )
}

export default Home