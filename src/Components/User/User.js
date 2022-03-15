import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {Bar} from 'react-chartjs-2';
import {logout} from '../../redux/userReducer';
import {getUserData} from '../../redux/dataReducer';
import './User.css';

export default function User(){
  const [ifany, setIfany] = useState('');
  const [lettersUsed, setLettersUsed] = useState('');
  const [insufLet, setInsufLet] = useState('');
  const [chartData, setChartData] = useState({});
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const user_id = useSelector(state => state.user.user_id);
  const userDataStashed = useSelector(state => state.data.userDataStashed);
  const userData = useSelector(state => state.data.userData);
  const dispatch = useDispatch();

  useEffect(() =>{
    let useEffCount = 0;
    console.log(`User Data Stashed? : ${userDataStashed}`)
    console.log(useEffCount > 0)
    if(!userDataStashed && !useEffCount > 0){
      console.log(`Fetching data for user #${user_id}`)
      dispatch(getUserData(user_id));
      useEffCount += 1;
      return;
    }
  });

  
  const HandleText = (e) => {
    const input = e.target.value
    console.log(input)
    const userCounter = {};
    Object.keys(userData).map((char) => (userCounter[char] = input.split(`${char}`).length -1));
    // console.log(userCounter)

    const lettersUsedLoop = {};
    Object.keys(userCounter).map((char) =>{
      // console.log(char, userCounter[char])
      if(userCounter[char] > 0){
        // console.log(userCounter[char])
        lettersUsedLoop[char] = userCounter[char];
      }
    })

    const insufLetLoop = {};
    Object.keys(lettersUsedLoop).map((char) =>{
      if((userData[char]-lettersUsedLoop[char]) < 0){
        // console.log((this.state.userData[char]-lettersUsedLoop[char]))
        insufLetLoop[char] = (lettersUsedLoop[char]-userData[char])
      }
    })

    console.log(lettersUsedLoop)
    console.log(insufLetLoop)
    // console.log(this.props.data.userData)
    setLettersUsed(lettersUsedLoop)
    setInsufLet(insufLetLoop)

    // console.log(Object.keys(insufLetLoop).length)
    console.log(Object.keys(insufLetLoop).length)
    if(Object.keys(insufLetLoop).length > 0){
      setIfany(true)
    } else {setIfany(false)}

    
    const labelsLoop = [];
    const valuesLoop = [];
    const colorLoop = [];

    Object.keys(lettersUsedLoop).map((char) =>{
      labelsLoop.push(char)
      console.log(labelsLoop)
      valuesLoop.push(lettersUsedLoop[char])
      console.log(valuesLoop)
      colorLoop.push('#'+Math.floor(Math.random()*16777215).toString(16));
    })


    setChartData({
      labels:labelsLoop,
      datasets:[
        {
          label:'Letters Used',
          data:valuesLoop,
          backgroundColor: colorLoop,
        }
      ]
    })
    
  }



// console.log(ifany)
  return(
    <div id='home'>
      {/* <p>User page</p> */}

      <div id='nav'>
        <Link to='/Edit' className='links'><button id='link'>Edit Data</button></Link>
        <button onClick={() => dispatch(logout())} >Log out</button>
      </div>

      <h3>Type below and automaticaly compare to your saved character sets.</h3>

      <textarea type='text' placeholder='Type Here' onChange={HandleText} />
      {/* <h3>Letters Used</h3>
      <p>{JSON.stringify(lettersUsed, null, 1)}</p> */}
      <p id='chart'>
        <Bar data={chartData}/>
      </p>


      {ifany ? 
      <>
      <h2>Insufficent Letters</h2>
      <p className='insuf'>{JSON.stringify(insufLet, null, 1)}</p>
      </>
      : <div></div>}


      {isLoggedIn ? <Redirect to='/' />: <Redirect to ='/Signin' /> }


      {/* {userDataStashed ? <Redirect to='/User' /> : <Redirect to='/Edit' />} */}
    </div>
  );
};