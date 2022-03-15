import axios from 'axios';

const initialState = {

  sampleChar: ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','1','2','3','4','5','6','7','8','9','0','.',',',`'`,'!','$','%','&','?','#','@',':','/','+','-','(','"','='],

  advancedChar:{
    lower:{a:0,b:0,c:0,d:0,e:0,f:0,g:0,h:0,i:0,j:0,k:0,l:0,m:0,n:0,o:0,p:0,q:0,r:0,s:0,t:0,u:0,v:0,w:0,x:0,y:0,z:0},
    upper:{A:0,B:0,C:0,D:0,E:0,F:0,G:0,H:0,I:0,J:0,K:0,L:0,M:0,N:0,O:0,P:0,Q:0,R:0,S:0,T:0,U:0,V:0,W:0,X:0,Y:0,Z:0},
    special:{'1':0,'2':0,'3':0,'4':0,'5':0,'6':0,'7':0,'8':0,'9':0,'0':0,'.':0,',':0,"'":0,'!':0,'$':0,'%':0,'&':0,'?':0,'#':0,'@':0,':':0,'/':0,'+':0,'-':0,'(':0,'"':0,'=':0}
  },
  
  // sampleCounter: sampleCounter.push(input.split([sampleChar.map()]).length -1),

  // sampleCounter: [
    // input.split('a').length -1,
    // input.split('b').length -1,
  // ],

  userData: {},

  // userCount: ,

  userDataStashed: false
    
}

const GET_USER_DATA = 'GET_USER_DATA'
const SAVE_USER_DATA = 'SAVE_USER_DATA'

export const getUserData = (id) =>{
  // console.log('Get User Data Reducer Ping')
  let data = axios.post('/api/data', {id})
  .then(res => res.data)
  .catch(err => {
    alert(`Server failed to retreive your data `)
    console.log(err)
  })
  // console.log(data);
  return{
    type: GET_USER_DATA,
    payload: data
  }
}

export const saveData = (id, userData) =>{
  console.log('Save Data Reducer Ping')
  // console.log(userData)
  axios.put('/api/data', {id, userData})
  .then(res => res.data)
  .catch(err => console.log(err))
  return{
    type: SAVE_USER_DATA,
    userDataStashed: true
  } 
}

export default function reducer(state = initialState, action){
  // console.log(action.type)
  switch(action.type){
    case GET_USER_DATA + '_PENDING':
      console.log('Get Data Pending')
      return {...state};

    case GET_USER_DATA + '_FULFILLED':
      console.log('Get Data Fulfilled')
      console.log(action.payload)
      if (action.payload !== undefined) {
        return {...state, userDataStashed:action.payload.userDataStashed, userData: action.payload.data.user_data};
      } else {
        return {...state, userDataStashed:false};
      }
      

    // case GET_USER_DATA + '_FAILED':
    //   ;

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