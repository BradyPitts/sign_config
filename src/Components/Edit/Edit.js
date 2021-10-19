import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {logout} from '../../redux/userReducer';
import {getUserData, saveData} from '../../redux/dataReducer';

class Edit extends Component{

  componentDidMount(){
    if(!this.props.data.userDataStashed){
      console.log('Initializing user data slate') 
      // this.props.getUserData(this.props.user.user_id);
      const noData = {};
      // this.props.data.sampleChar.map((char) =>{
      //   noData[char] = 0
      // })
      for (let i = 0; i < this.props.data.sampleChar.length; i++){
        noData[this.props.data.sampleChar[i]] = 0;
      }
      this.setState({userData:noData, userDataStashed:true})
    }
    // this.HandleData(this.props.data.sampleChar);
  }

  HandleValue(char, int){
    const charInt = {};
    charInt[char] = int
    this.setState({userData:charInt})
    console.log(charInt)
  }

  HandleData(data){
    // console.log('HandleData called')
    // console.log(data)
    return data.map((char) =>{
      return(  
        <li>
          <label for='characters'>{char}: </label>
          <select id='characters' name='number' onChange={e => this.HandleValue(char, e.target.value)}>
            <option value='0'>0</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
            <option value='6'>6</option>
            <option value='7'>7</option>
            <option value='8'>8</option>
            <option value='9'>9</option>
            <option value='10'>10</option>
            <option value='11'>11</option>
            <option value='12'>12</option>
            <option value='13'>13</option>
            <option value='14'>14</option>
            <option value='15'>15</option>
          </select>
        </li>
      )
    })
    // console.log(inputMap)
    // this.setState({dataInput:inputMap})
  };




  render(){

    console.log(this.state?.userData)
    // console.log(this.props.data.sampleChar)
    
    // const input = this.props.data.sampleChar.map((sampleChar) =>{
    //   <li>
    //     <label for='characters'>{sampleChar}</label>
    //     <select id='characters' name='number'>
    //       <option value='0'>0</option>
    //       <option value='1'>1</option>
    //       <option value='2'>2</option>
    //       <option value='3'>3</option>
    //       <option value='4'>4</option>
    //       <option value='5'>5</option>
    //       <option value='6'>6</option>
    //       <option value='7'>7</option>
    //       <option value='8'>8</option>
    //       <option value='9'>9</option>
    //       <option value='10'>10</option>
    //       <option value='11'>11</option>
    //       <option value='12'>12</option>
    //       <option value='13'>13</option>
    //       <option value='14'>14</option>
    //       <option value='15'>15</option>
    //     </select>
    //   </li>
    // });

    // console.log(this.state.dataInput)
    return(
      <div id='about'>
        <p>Edit page</p>
        <Link to='/User' className='links'>Home</Link>
        <button onClick={() => this.props.logout()} >Log out</button>

        <ul>
          {/* {this.state.dataInput} */}
          {this.HandleData(this.state?.userData)}
        </ul>

        <button onClick={() => this.props.saveData(this.props.user.user_id, this.state?.userData)}>Save Data</button>

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

export default connect(mapStateToProps, {getUserData, saveData, logout}) (Edit)