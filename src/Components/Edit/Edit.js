import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {logout} from '../../redux/userReducer';

class Edit extends Component{

  render(){
    return(
      <div id='about'>
        <p>Edit page</p>
        <Link to='/User' className='links'>Home</Link>
        <button onClick={() => this.props.logout()} >Log out</button>

        {this.props.user.isLoggedIn ? <Redirect to='/Edit' />: <Redirect to ='/Signin' /> }
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

export default connect(mapStateToProps, {logout}) (Edit)