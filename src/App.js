import React, { Component } from 'react';
import './App.css';
import { parse, definedWords } from './Parser/parse';

let testString = 
`
These are my notes for UBC calculus courses! I wrote them using the web application "context". Context allows users to create definitions, assign examples, and then quickly view the definitions and examples of defined terms. 

<Derivative|
The derivative of a function of a real variable measures the sensitivity to change of the function value (output value) with respect to a change in its argument (input value).|
\\frac{d}{dx}\\sin x = \\cos x|
\\frac{d}{dx}(3x^2+2)=6x|
How do you calculate a derivative in calculus?>

For example, I can hover over derivative because it has been previously defined.

<Vector|
Vectors are used to describe quantities with a magnitude (length) and a direction.|
A = [0,0,2]|
B = [9, 20, 1]|
A vector doesn't intrinsically have a position, although we can assign it one in context.>

<scalar-multiplication|
Multiplying a vector a by a scalar s results in a vector with length s times the length of a. The new vector sa points in the same direction if s is positive, and in the opposite direction if s is negative.|
A = 2[0,0,2]|
B = 5[9, 20, 1]|
If the length of a vector is 1 unit, then the length of 2a is 2. What is the length of -1a: is it 1, or -1?.>`
;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      str: '',
      bl: true
    };
  }

  componentDidMount(){
    document.title = "Context App"
  }

  render() {
    return (
      <div className="App">
        <section id="TOOLBAR">
          <ul>
            <img src={require("./widelogo.png")} alt="Our logo" height="40" width="160"></img>
            <li>
              <button className="buttoncompile" onClick={() => this.setState({str: document.getElementById("txtarea").value})}><span>compile</span></button>
              <button className="buttonviews" onClick={collapseOrNaw}><span>switch view</span></button>
              <a href="./Guide" target="_blank"><button className="buttonnormal"><span>how to use</span></button></a>
              <button className="buttonnormal" onClick={()=>this.setState({bl: !this.state.bl})}><span>toggle theme</span></button>
            </li>
          </ul>
        </section>

        <section id="EDITOR_AND_OUTPUT">

          <div className="split left">
            <textarea id="txtarea">{testString}</textarea> 
          </div>

          <div className={this.state.bl?"split right black":"split right white"}>
            {parse(this.state.str, definedWords(this.state.str), this.state.bl)}
          </div>

        </section>

      </div>
      
    );
  }
}


//you can collapse the left hand side now
function collapseOrNaw(){
  var currentSize = document.getElementsByClassName("split right").item(0).style.width;
  if(currentSize === "50%" || currentSize === ""){
    document.getElementsByClassName("split right").item(0).style.width = "75%";
    document.getElementsByClassName("split left").item(0).style.width = "0";
    document.getElementsByClassName("split right").item(0).style.right = "12.5%";
  }else if(currentSize === "75%"){
    document.getElementsByClassName("split right").item(0).style.width = "50%";
    document.getElementsByClassName("split left").item(0).style.width = "50%";
    document.getElementsByClassName("split right").item(0).style.right = "0";
  }
}



export default App;

