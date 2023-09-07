import {TiThMenu} from 'react-icons/ti'
import {BiSearchAlt} from 'react-icons/bi'
import { useState } from 'react'

const Navbar = () => {
  const [searchT,setSearchT]=useState(false);
  const [onSearch,setOnSearch]=useState("");
  const [toggle,setToggle]=useState(false);

  const searching =(event)=>{
    setOnSearch(event.target.value)
  }
  const toggleOpen=()=>{
    setToggle(!toggle)
  }
  
  const isOpen =()=>{
    setSearchT(!searchT)
  }

  return (
    <div className="containerr" >
      
    <div className='navbar'>
      <div className='navcont'>
        <header className='navbar-head'>
          <TiThMenu onClick={toggleOpen} className='menubar'/>
          <h1 style={{
            fontSize:'larger',
            position:'relative',
            top:'10px'  
          }}
            
            >THE NOTEBOOK</h1>
        </header>
        <button onClick={isOpen} className='searchIcondiv'><BiSearchAlt className='searchIcon'/></button>
        <ul className='list-items'>
          <li>About</li>
        </ul>
      </div>
        
      <div className={searchT ? 'searchBar' : 'searchbar'}>
          <input
          type='search'
          value={onSearch}
          onChange={searching}
          placeholder='Search notes...'
          ></input>
          
        </div>
        
    </div>
    <div className={toggle?'hsidebarcont':'hsidebarconts'}>
        <ul className='sb-items'>
          <li>Your Account</li>
          <li>Favourites</li>
          <li>Locked notes</li>
          <li>Logout</li>

        </ul>
      </div>
    </div>
  )
}

export default Navbar