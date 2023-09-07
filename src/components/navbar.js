import {TiThMenu} from 'react-icons/ti'
import {BiSearchAlt} from 'react-icons/bi'
import { useState } from 'react'

const Navbar = () => {
  const [searchT,setSearchT]=useState(false);
  const [onSearch,setOnSearch]=useState("");
  //const [search,setSearch]=useState("");

  const searching =(event)=>{
    setOnSearch(event.target.value)
  }
  
  const isOpen =()=>{
    setSearchT(!searchT)
  }

  return (
    <div>
    <div className='navbar'>
      <div className='navcont'>
        <header className='navbar-head'>
          <TiThMenu className='menubar'/>
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

          ></input>
          
        </div>
        
    </div>
    </div>
  )
}

export default Navbar