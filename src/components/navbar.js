import {TiThMenu} from 'react-icons/ti'

const Navbar = () => {
  console.log('I love love')
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
        <ul className='list-items'>
          <li>About</li>
         

        </ul>
        
    </div>
  )
}

export default Navbar