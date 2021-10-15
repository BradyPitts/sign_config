import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Landing.css';


class Landing extends Component{

  // componentDidMount(){
  //   this.setState({lettersUsed:[]})
  // }


  HandleText(input){
    console.log(input)
    // console.log(this.props.data.sampleChar);
    // const sampleCounter = []
    // this.props.sampleChar.map(i => console.log(this.props.sampleChar[i]))
    // this.props.sampleChar.map(i => sampleCounter.push(input.split([i]).length -1));
    console.log('above if1')
    const sampleCounter = this.props.data.sampleChar.map((sampleChar) => (input.split(`${sampleChar}`).length -1));
    console.log('above if2')
    // console.log(sampleCounter);
    console.log('above if3')
    const lettersUsedLoop = {};
    // console.log(this.props.data.sampleChar.length)

    for (let i = 0; i < this.props.data.sampleChar.length; i++){
      if (sampleCounter[i] > 0){
        lettersUsedLoop[this.props.data.sampleChar[i]] = sampleCounter[i];
      }
    }
    // let k = 0;
    // for (let i = 0;i < this.props.data.sampleChar.length; i++){
    //   if (sampleCounter[i] === 0){
    //     continue;
    //   }
    //   else{
    //     lettersUsedLoop[k] = [this.props.data.sampleChar[i], sampleCounter[i]];
    //     k++;
    //   }
    // }
    console.log(lettersUsedLoop)
    this.setState({lettersUsed:lettersUsedLoop})
    // console.log(this.state.lettersUsed)
  }


  render(){
    // let lettersUsed = charCount
    // console.log(this.state.lettersUsed);
    return(
      <div id='landing'>
        <h1>landing page</h1>
        <input type='text' placeholder='Type Here' onChange={e => this.HandleText(e.target.value)} />
        {/* <p>{this.state.lettersUsed}</p> */}
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