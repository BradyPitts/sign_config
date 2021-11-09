import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {login, signUp, sendNewPassword} from '../../redux/userReducer';
import './Signin.css';

export default function Signin(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isLoggedIn = useSelector(state => state.user.isLoggedIn)
  // const [newPassword, setNewPassword] = useState('');

  // const login = () => useSelector(state => state.login)  

  const dispatch = useDispatch();
  // console.log(dispatch)


  const handleEmail = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };
  
  const handlePassword = (e) => {
    console.log(e.target.value);
    setPassword(e.target.value);
  };
  
  const makePassword = (length) => {
    console.log('Forgot Password pressed')
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    console.log(result)
    // setNewPassword(result);
    alert('A new Password has been generated and sent to your Email.')
    return result
  };



  return(
    <div id='Signin'>

      <h1>Sign in</h1>

      <div className="form-group">
        <label>Email: </label>
        <input type="email" className="form-control" placeholder="Email" onChange={handleEmail} />
      </div>

      <div className="form-group">
        <label>Password: </label>
        <input type="password" className="form-control" placeholder="Password" onChange={handlePassword} />
      </div>

      <div id='buttons'>
        <button onClick={() => dispatch(login(email, password))}>Log In</button>

        <button onClick={() => dispatch(signUp(email, password))}>Sign Up</button>

        {/* <button onClick={() => dispatch(sendNewPass */}

        <Link to='/Sample' className='links' ><button>Try for Free Here</button></Link>
      </div>

      {isLoggedIn ? <Redirect to='/' />: <Redirect to ='/Signin' /> }
      
    </div>
  );
};