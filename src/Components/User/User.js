import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {logout} from '../../redux/userReducer';

class User extends Component{

  render(){
    return(
      <div id='about'>
        <p>User page</p>
        <Link to='/Edit' className='links'>Edit Data</Link>
        <button onClick={() => this.props.logout()} >Log out</button>

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

export default connect(mapStateToProps, {logout}) (User)