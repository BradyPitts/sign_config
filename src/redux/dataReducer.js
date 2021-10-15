import axios from 'axios';

const initialState = {

  sampleChar: ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','1','2','3','4','5','6','7','8','9','0','.',',',`'`,'!','$','%','&','?','#','@',':','/','+','-'],
  
  // sampleCounter: sampleCounter.push(input.split([sampleChar.map()]).length -1),

  // sampleCounter: [
    // input.split('a').length -1,
    // input.split('b').length -1,
  // ],

  userData: [],

  // userCount: ,

  userDataStashed: false
    
}

const GET_USER_DATA = 'GET_USER_DATA'
const SAVE_USER_DATA = 'SAVE_USER_DATA'

export const getUserData = () =>{
  console.log('Get User Data Reducer Ping')
}

export const saveUserData = () =>{
  console.log('Save Data Reducer Ping')
}

export default function reducer(state = initialState, action){
  console.log(action.type)
  switch(action.type){
    case GET_USER_DATA + '_PENDING':
      console.log('Get Data Pending')
      return {...state};

    case GET_USER_DATA + '_FULFILLED':
      console.log('Get Data Fulfilled')
      console.log(action.payload)
      return {...state, userData: action.payload};

    case  SAVE_USER_DATA + '_PENDING':
      console.log('Save Data Pending')
      return {...state};

    case SAVE_USER_DATA + '_FULFILLED':
      console.log('Save Data Fulfilled')
      // console.log(action.payload)
      return {...state};


    default:
      return state;
  }
}