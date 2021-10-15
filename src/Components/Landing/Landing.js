import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Landing.css';


class Landing extends Component{




  HandleText(input){
    console.log(input)
    console.log(this.props.data.sampleChar);
    // const sampleCounter = []
    // this.props.sampleChar.map(i => console.log(this.props.sampleChar[i]))
    // this.props.sampleChar.map(i => sampleCounter.push(input.split([i]).length -1));
    const sampleCounter = this.props.data.sampleChar.map((sampleChar) => (input.split(`${sampleChar}`).length -1));
    console.log(sampleCounter);

    for (let i = 0; i < this.props.data.sampleChar.length; i++){
      
    }
  }


  render(){
    // let lettersUsed = charCount
    return(
      <div id='landing'>
        <p>landing page</p>
        <input type='text' placeholder='Type Here' onChange={e => this.HandleText(e.target.value)} />
        {lettersUsed}
      </div>
    )
  }
};

function mapStateToProps(state){
  return{
    data: state.data
  }
}

export default connect(mapStateToProps) (Landing)