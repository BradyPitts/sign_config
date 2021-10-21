import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {logout} from '../../redux/userReducer';
import {saveData} from '../../redux/dataReducer';
import './Edit.css';
export default function Edit(){
  const [newUserData, setNewUserData] = useState('');
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const user_id = useSelector(state => state.user.user_id);
  const userDataStashed = useSelector(state => state.data.userDataStashed);
  const userData = useSelector(state => state.data.userData);
  const sampleChar = useSelector(state => state.data.sampleChar)
  const dispatch = useDispatch();

  useEffect(() =>{
    // this.props.getUserData(this.props.user.user_id)
    // console.log(this.props.user.user_id)
    if(!userDataStashed){
      console.log('Initializing user data slate') 
      const noData = {};
      for (let i = 0; i < sampleChar.length; i++){
        noData[sampleChar[i]] = 0;
      }
      setNewUserData(noData)
      return;
    } 
    // else {setNewUserData(userData)}
  });

  const HandleValue = (char, int) =>{
    console.log(char, int)
    const charInt = userData;
    charInt[char] = parseInt(int)
    setNewUserData(charInt)
  }

  const HandleData = (data) =>{
    return Object.keys(data).map((char) => {
      return(
    // Object.keys(this.state?.userData).map()
        <div id='drops'>
          <label for='characters'>{char}: </label>
          <select id='characters' name='number' onChange={e => HandleValue(char, e.target.value)}>
            <option value='' disabled selected>{data[char]}</option>
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
            <option value={10}>10</option>
            <option value={11}>11</option>
            <option value={12}>12</option>
            <option value={13}>13</option>
            <option value={14}>14</option>
            <option value={15}>15</option>
            <option value={16}>16</option>
            <option value={17}>17</option>
            <option value={18}>18</option>
            <option value={19}>19</option>
            <option value={20}>20</option>
          </select>
        </div>
      )
    })
  };


  return(
    <div id='edit'>
      <h1>Edit page</h1>

      <div id='nav'>

        <Link to='/User' className='links'><button>Home</button></Link>
        
        <button onClick={() => dispatch(saveData(user_id, newUserData))}>Save Data</button>
        
        <button onClick={() => dispatch(logout())} >Log out</button>

      </div>

      {/* <ul> */}
      <div className='select'>
        {/* {this.state.dataInput} */}
        {HandleData(userData)}
      </div>
      {/* </ul> */}


      {isLoggedIn ? <Redirect to='/Edit' />: <Redirect to ='/Signin' /> }
    </div>
  );
};