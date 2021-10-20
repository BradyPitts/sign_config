import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {login, signUp, sendNewPassword} from '../../redux/userReducer';
import './Signin.css';

class Signin extends Component{

  handleEmail(value) {
    console.log(value);
    this.setState({ email: value });
  }
  
  handlePassword(value) {
    console.log(value);
    this.setState({ password: value });
  }

  makePassword = (length) => {
    console.log('Forgot Password pressed')
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
    charactersLength));
    }
    console.log(result)
    this.setState({newPassword: result});
    alert('A new Password has been generated and sent to your Email.')
    return result
}


  render(){
    console.log(`User signed in? : ${this.props.user.isLoggedIn}`)
    // if(this.props.user.isLoggedIn === true){
    //   console.log('redirecting...');
    //   <Redirect to='User' />
    // }
    return(
      <div id='Signin'>
        <h1>Sign in</h1>
        <div className="form-group">
          <label>Email: </label>
          <input type="email" className="form-control" placeholder="Email" onChange={e => this.handleEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Password: </label>
          <input type="password" className="form-control" placeholder="Password" onChange={e => this.handlePassword(e.target.value)} />
        </div>

        <div id='buttons'>
          <button onClick={() => this.props.login(this.state.email, this.state.password)}>Log In</button>

          <button onClick={() => this.props.signUp(this.state.email, this.state.password)}>Sign Up</button>

          <button onClick={() => this.props.sendNewPassword(this.state.email, this.makePassword(8))}>Forgot Password</button>

          <Link to='/' className='links' ><button>Back to Sample Page</button></Link>
        </div>

        {this.props.user.isLoggedIn ? <Redirect to='/User' />: <Redirect to ='/Signin' /> }
        
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

export default connect(mapStateToProps, {login, signUp, sendNewPassword}) (Signin)