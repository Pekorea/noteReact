  import {useState} from 'react'
    import {Toaster, toast} from 'react-hot-toast'

export default function Forgotten_password(){
    const handlefp=(e)=>{
        e.preventDefault();
        reset();
    }  
    const reset =()=>{toast('the reset password link has been sent to your email',{duration: 3000, icon:'🔑'})}
    return(
        <div>
            <Toaster/>
            <form onSubmit={handlefp}>
                <div>
                    <h1 className="fheader">
                        Forgotten Password 
                    </h1>
                    <input type="email"
                    required
                    className="Einput"
                    >
                    </input>
                    <label
                    className="Elabel">
                        Email:

                    </label>
                    <button
                    className="subbutton"
                    type="submit">
                        Submit
                    </button>


                </div>
            </form>
        </div>
    )
}