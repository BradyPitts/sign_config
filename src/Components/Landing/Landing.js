import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import './Landing.css';


class Landing extends Component{

  // componentDidMount(){
  //   this.setState({lettersUsed:{}})
  // }


  HandleText(input){
    console.log(input)
    // console.log(this.props.data.sampleChar);
    // const sampleCounter = []
    // this.props.sampleChar.map(i => console.log(this.props.sampleChar[i]))
    // this.props.sampleChar.map(i => sampleCounter.push(input.split([i]).length -1));
    // console.log('above if1')
    const sampleCounter = this.props.data.sampleChar.map((sampleChar) => (input.split(`${sampleChar}`).length -1));
    // console.log('above if2')
    // console.log(sampleCounter);
    // console.log('above if3')
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
    // if (this.state.lettersUsed === null){
    //   this.setState({message:'letters needed will show here'})
    // } else {
    //   this.setState({message:this.state.lettersUsed})
    // };
    // console.log(this.state?.lettersUsed)
    // const lettersList = this.state?.lettersUsed.map(lettersUsed) => {

    // }
    return(
      <div id='landing'>
        <h1>Sample Configurator</h1>
        <div id='buttton'>
        <Link to='/Signin' className='links'><button>Sign In</button></Link>
        </div>

        <br />

        <textarea type='text' placeholder='Type Here' onChange={e => this.HandleText(e.target.value)} />
        {/* {lettersList} */}
        {/* {this.state?.lettersUsed.map()} */}
        <h3>Letters Used</h3>
        <p>{JSON.stringify(this.state?.lettersUsed, null, 10)}</p>
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