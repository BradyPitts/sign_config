import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {logout} from '../../redux/userReducer';
import {getUserData, saveData} from '../../redux/dataReducer';
import './Edit.css';
class Edit extends Component{

  componentWillMount(){
    // this.props.getUserData(this.props.user.user_id)
    // console.log(this.props.user.user_id)
    if(!this.props.data.userDataStashed){
      console.log('Initializing user data slate') 
      const noData = {};
      for (let i = 0; i < this.props.data.sampleChar.length; i++){
        noData[this.props.data.sampleChar[i]] = 0;
      }
      this.setState({userData:noData})
    } else {
      this.setState({userData:this.props.data.userData})}
  }

  HandleValue(char, int){
    console.log(char, int)
    const charInt = this.state.userData;
    charInt[char] = parseInt(int)
    this.setState({userData:charInt})
  }

  HandleData(data){
    return Object.keys(data).map((char) => {
      return(
    // Object.keys(this.state?.userData).map()
        <div id='drops'>
          <label for='characters'>{char}: </label>
          <select id='characters' name='number' onChange={e => this.HandleValue(char, e.target.value)}>
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




  render(){

    

    // console.log(this.state?.userData)
    return(
      <div id='edit'>
        <h1>Edit page</h1>

        <div id='nav'>
          <Link to='/User' className='links'><button>Home</button></Link>
          <button onClick={() => this.props.logout()} >Log out</button>
        </div>

        {/* <ul> */}
        <div className='select'>
          {/* {this.state.dataInput} */}
          {this.HandleData(this.state?.userData)}
        </div>
        {/* </ul> */}

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