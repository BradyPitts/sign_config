import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {logout} from '../../redux/userReducer';
import {getUserData} from '../../redux/dataReducer';
import './User.css';

function User(){
  const [ifany, setIfany] = useState('');
  const [lettersUsed, setLettersUsed] = useState('');
  const [insufLet, setInsufLet] = useState('');

  useEffect(() =>{
    console.log(`User Data Stashed? : ${this.props.data.userDataStashed}`)
    if(!this.props.data.userDataStashed){
      console.log(`Fetching data for user #${this.props.user.user_id}`)
      this.props.getUserData(this.props.user.user_id)
    }
    // else{
      // console.log(this.props.data.userData)
      // this.setState({userData: this.props.data.userData})
    // }
    setIfany(false);
  });

  
  const HandleText = (input) => {
    console.log(input)
    const userCounter = {};
    Object.keys(this.props.data.userData).map((char) => (userCounter[char] = input.split(`${char}`).length -1));
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
      if((this.props.data.userData[char]-lettersUsedLoop[char]) < 0){
        // console.log((this.state.userData[char]-lettersUsedLoop[char]))
        insufLetLoop[char] = (lettersUsedLoop[char]-this.state.userData[char])
      }
    })

    console.log(lettersUsedLoop)
    console.log(insufLetLoop)
    // console.log(this.props.data.userData)
    setLettersUsed(lettersUsedLoop)
    setInsufLet(insufLetLoop)

    // console.log(Object.keys(insufLetLoop).length)
    if(Object.keys(insufLetLoop).length > 0){
      setIfany(true)
    } else {setIfany(false)}
    
  }




  return(
    <div id='home'>
      {/* <p>User page</p> */}

      <div id='nav'>
        <Link to='/Edit' className='links'><button id='link'>Edit Data</button></Link>
        <button onClick={() => this.props.logout()} >Log out</button>
      </div>

      <textarea type='text' placeholder='Type Here' onChange={e => HandleText(e.target.value)} />
      <h3>Letters Used</h3>
      <p>{JSON.stringify(lettersUsed, null, 1)}</p>


      {ifany ? 
      <>
      <h3>Insufficent Letters</h3>
      <p className='insuf'>{JSON.stringify(insufLet, null, 1)}</p>
      </>
      : <div></div>}


      {this.props.user.isLoggedIn ? <Redirect to='/User' />: <Redirect to ='/Signin' /> }


      {/* {this.props.data.userDataStashed ? <Redirect to='/User' /> : <Redirect to='/Edit' />} */}
    </div>
  );
};


 
function mapStateToProps(state){
  return{
    data: state.data,
    user: state.user
  }
}

export default connect(mapStateToProps, {getUserData, logout}) (User)