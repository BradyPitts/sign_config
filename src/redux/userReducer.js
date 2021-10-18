import axios from 'axios';


const initialState = {
  user_id: null,
  email: '',
  password: '',
  admin: false,
  isLoggedIn: false,
  newPassword: ''
  
};


const REQUEST_USER_DATA = 'REQUEST_USER_DATA'
const REGISTER_USER = 'REGISTER_USER'
const LOGIN_USER = 'LOGIN_USER'
const LOGOUT_USER = 'LOGOUT_USER'
// const CONTINUE_AS_GUEST = 'CONTINUE_AS_GUEST'
const SEND_NEW_PASSWORD = 'SEND_NEW_PASSWORD'

export const signUp = (email, password) => {
  console.log('signUp pressed')
  // const email = credentials.email;
  // const password = credentials.password;
  // const admin = credentials.admin;
  let userData = axios.post('/auth/signup', {email, password})
  .then(res =>res.data)
  .catch(err => {
    alert(`a sign up error has occured ${err}`);
    console.log(err)
  })
  return{
    type: REGISTER_USER,
    payload: userData
  }
};


export const login = (email, password) => {
  console.log(`login pressed`)
  console.log(email, password)
  let userData = axios.post('/auth/login', {email, password})
  .then(res => res.data)
  .catch(err => console.log(err))
  return{
    type: LOGIN_USER,
    payload: userData
  }
};


export const logout = () => {
  console.log('logout pressed')
  const userData = axios.delete('/auth/logout');
  return{
    type: LOGOUT_USER,
    payload: userData
  }
};

export const sendNewPassword = (email, newPassword) => {
    console.log(`new password pressed redux`)
    console.log(email, newPassword)
    let userData = axios.post('/auth/newPassword', {email, newPassword})
    .then(res => res.data)
    .catch(err => console.log(err))
    return{
      type: SEND_NEW_PASSWORD,
      payload: userData
    }
  };

  
export default function reducer(state = initialState, action){
  switch(action.type){
    case REQUEST_USER_DATA + "_FULLFILLED":
      console.log(action.payload)
      return {...state, user: action.payload};

    case REGISTER_USER + "_FULFILLED":
      console.log(action.payload)
      return{...state, user_id:action.payload.user.user_id, isLoggedIn:action.payload.isLoggedIn}

    case LOGIN_USER + "_FULFILLED":
      console.log(action.payload)
      return{...state, user_id:action.payload.user.user_id, admin:action.payload.user.admin, isLoggedIn:action.payload.isLoggedIn}

    case LOGOUT_USER + "_FULFILLED":
      return{initialState}

    case SEND_NEW_PASSWORD + "_FULFILLED":
      console.log(action.payload)
      return{...state, user_id:action.payload.user.user_id, admin:action.payload.user.admin, isLoggedIn:action.payload.isLoggedIn}

    default:
    // console.log(state)
      return state
  }
}