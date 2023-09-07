import {TiThMenu} from 'react-icons/ti'
import {BiSearchAlt} from 'react-icons/bi'

const Navbar = () => {

  
  return (
    <div className='navbar'>
        <header className='navbar-head'>
          <TiThMenu className='menubar'/>
          <h1 style={{
            fontSize:'larger',
            position:'relative',
            top:'10px'  
          }}
            
            >THE NOTEBOOK</h1>
        </header>
        <BiSearchAlt className='searchIcon'/>
        <ul className='list-items'>
          <li>About</li>
         

        </ul>
        
    </div>
  )
}

export default Navbar