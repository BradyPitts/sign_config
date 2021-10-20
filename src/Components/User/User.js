import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {logout} from '../../redux/userReducer';
import {getUserData} from '../../redux/dataReducer';

class User extends Component{

  componentDidMount(){
    console.log(`User Data Stashed? : ${this.props.data.userDataStashed}`)
    if(!this.props.data.userDataStashed){
      console.log(`Fetching data for user #${this.props.user.user_id}`)
      this.props.getUserData(this.props.user.user_id)
    }
    else{
      // console.log(this.props.data.userData)
      this.setState({userData: this.props.data.userData})
    }
  }

  
  HandleText(input){
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
      if((this.state.userData[char]-lettersUsedLoop[char]) < 0){
        // console.log((this.state.userData[char]-lettersUsedLoop[char]))
        insufLetLoop[char] = (lettersUsedLoop[char]-this.state.userData[char])
      }
    })

    console.log(lettersUsedLoop)
    console.log(insufLetLoop)
    // console.log(this.props.data.userData)
    this.setState({lettersUsed:lettersUsedLoop, insufLet:insufLetLoop})
  }



  render(){
    // console.log(`User data stashed? : ${this.props.data.userDataStashed}`)
    // console.log(this.props.data.userData)
    return(
      <div id='about'>
        <p>User page</p>
        <Link to='/Edit' className='links'>Edit Data</Link>
        <button onClick={() => this.props.logout()} >Log out</button>

        <input type='text' placeholder='Type Here' onChange={e => this.HandleText(e.target.value)} />
        <h3>Letters Used</h3>
        <p>{JSON.stringify(this.state?.lettersUsed), null, 10}</p>
        <h3>Insufficent Letters (if any)</h3>
        <p>{JSON.stringify(this.state?.insufLet), null, 4}</p>


        {this.props.user.isLoggedIn ? <Redirect to='/User' />: <Redirect to ='/Signin' /> }


        {this.props.data.userDataStashed ? <Redirect to='/User' /> : <Redirect to='/Edit' />}
      </div>
    )
  }
};

 
function mapStateToProps(state){
  return{
    data: state.data,
    user: state.user
  }
}

export default connect(mapStateToProps, {getUserData, logout}) (User)