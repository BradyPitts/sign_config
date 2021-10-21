import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {Bar} from 'react-chartjs-2';
import './Landing.css';

export default function Landing(){
  const [lettersUsed, setLettersUsed] = useState({});
  const [labels, setLabels] = useState([]);
  const [chartData, setChartData] = useState({});
  const sampleChar = useSelector(state => state.data.sampleChar)

  const HandleText = e =>{
    // console.log(e.target.value)
    const input = e.target.value
    const sampleCounter = sampleChar.map((sampleChar) => (input.split(`${sampleChar}`).length -1));

    const lettersUsedLoop = {};

    for (let i = 0; i < sampleChar.length; i++){
      if (sampleCounter[i] > 0){
        lettersUsedLoop[sampleChar[i]] = sampleCounter[i];
      }
    }
    // console.log(lettersUsedLoop)
    setLettersUsed(lettersUsedLoop);

    const labelsLoop = [];
    const valuesLoop = [];
    const colorLoop = [];

    Object.keys(lettersUsedLoop).map((char) =>{
      labelsLoop.push(char)
      // console.log(labelsLoop)
      valuesLoop.push(lettersUsedLoop[char])
      // console.log(valuesLoop)
      colorLoop.push('#'+Math.floor(Math.random()*16777215).toString(16));
    })


    setChartData({
      labels:labelsLoop,
      datasets:[
        {
          label:'Letters Used',
          data:valuesLoop,
          backgroundColor: colorLoop,
        }
      ]
    })
  };



  return(
    <div id='landing'>
      <h1>Sample Configurator</h1>
      <div id='buttton'>
      <Link to='/Signin' className='links'><button>Sign In</button></Link>
      </div>

      <br />

      <textarea type='text' placeholder='Type Here' onChange={HandleText} />
      {/* {lettersList} */}
      {/* {this.state?.lettersUsed.map()} */}
      {/* <h3>Letters Used</h3> */}
      {/* <p>{JSON.stringify(lettersUsed, null, 10)}</p> */}

      <p id='chart'>
        <Bar data={chartData}/>
      </p>
    </div>
  );
};