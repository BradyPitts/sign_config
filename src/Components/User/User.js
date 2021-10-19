import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {logout} from '../../redux/userReducer';
import {getUserData} from '../../redux/dataReducer';

class User extends Component{

  componentDidMount(){
    console.log(this.props.user.user_id)
    this.props.getUserData(this.props.user.user_id)
  }

  render(){
    console.log(`User data stashed? : ${this.props.data.userDataStashed}`)
    return(
      <div id='about'>
        <p>User page</p>
        <Link to='/Edit' className='links'>Edit Data</Link>
        <button onClick={() => this.props.logout()} >Log out</button>


        {/* {this.props.data.userDataStashed ? <Redirect to='/User' /> : <Redirect to='/Edit' />} */}


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

export default connect(mapStateToProps, {getUserData, logout}) (User)