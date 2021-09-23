const nums = [
  {
    id: "zero",
    value: 0
  },
  {
    id: "one",
    value: 1
  },
  {
    id: "two",
    value: 2
  },
  {
    id: "three",
    value: 3
  },
  {
    id: "four",
    value: 4
  },
  {
    id: "five",
    value: 5
  },
  {
    id: "six",
    value: 6
  },
  {
    id: "seven",
    value: 7
  },
  {
    id: "eight",
    value: 8
  },
  {
    id: "nine",
    value: 9
  }
];

const operators = [
  {
    id: "add",
    value: "+"
  },
  {
    id: "subtract",
    value: "-"
  },
  {
    id: "multiply",
    value: "X"
  },
  {
    id: "divide",
    value: "/"
  }
];

const NumPad = ({id, value, handleClick, style}) => {
  return(
    <button id = {id} onClick={handleClick(value)} style={style}>
      {value.toString()}
    </button>
  );
}

const Operator = ({id, value, handleClick, style}) => {
  return(
  <button id = {id} onClick={handleClick(value)} style={style}>
      {value}
   </button>
  );
}

const Equals = ({handleClick}) => {
  return(
  <button id="equals" onClick={handleClick()} style = {{gridArea: "equals", backgroundColor: "blue", color: "white"}}>
    =
  </button>      
  );
}

const Decimal = ({handleClick}) => {
  return(
  <button id="decimal" onClick = {handleClick()} style = {{gridArea: "decimal", backgroundColor: "#303030", color: "white"}}>
    .
  </button>      
  );
}

const Clear = ({handleClick}) =>{
  return(
  <button id="clear" onClick = {handleClick()} style = {{gridArea: "clear", backgroundColor: "red", color: "white"}}>
    AC
  </button>
  )
}

const Display = ({value}) => {
  return(
  <button id="display" style={{gridArea: "display", backgroundColor: "black", color: "white", textAlign:"right"}}>{value? value:"0"}</button>
  )
}
class Calculator extends React.Component{
  
  constructor(props){
    super(props)
    this.state = {input: "", zeros: 0, decimals: 0}
    this.handleInputNum = this.handleInputNum.bind(this);
    this.handleInputOp = this.handleInputOp.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleInputDecimal = this.handleInputDecimal.bind(this);
    this.handleEquals = this.handleEquals.bind(this);
  }
  handleInputNum(value){
    return () => {
      if(value == 0){
        if(this.state.zeros == 0){
          this.setState({
            input: this.state.input + value.toString(),
            zeros : 1
          });
        }
      }
      else{
        this.setState({
          input: this.state.input + value.toString(),
          zeros : 0
        });
      }
    };
  }
  handleClear(){
    return () => {
      this.setState({
        input: "",
        zeros : 0,
        decimals: 0
      });
    }
  }
  handleInputOp(value){
    return () => {
      this.setState({
        input: this.state.input + value,
        zeros : 0,
        decimals: 0
      });
    }
  }
  handleInputDecimal(){
    return () => {
      if(this.state.decimals == 0){
        this.setState({
          input: this.state.input + '.',
          zeros: 0,
          decimals: 1
        })
      }
    }
  }
  handleEquals(){
    return () => {
      let pattern = /([0-9]+\.?[0-9]*)|(\.[0-9]+)|\+|\-|X|\//g;
      let operatorPattern = /\+|\-|X|\//;
      let matches = this.state.input.match(pattern);
      const structure = new Array();
      let i = matches.length - 1;
      while(operatorPattern.test(matches[i])){
        i = i - 1;
      }
      while(i >= 0){
        let num = parseFloat(matches[i]);
        i = i - 1;
        while(i >= 0 && matches[i] === "-"){
          num = -1 * num;
          i = i - 1;
        }
        structure.unshift(num);
        if(i >= 0){
          if(operatorPattern.test(matches[i])){
            structure.unshift(matches[i]);
            i = i - 1;
            while(i >= 0 && operatorPattern.test(matches[i])){
              i = i - 1;
            }
          }
          else{
            structure.unshift("+");
          }
        }
      }
      let result = structure[0];
      for(let j = 1; j < structure.length; j = j + 2){
        if(structure[j] == '+'){
          result = result + structure[j + 1];
        }
        else if(structure[j] == 'X'){
          result = result * structure[j + 1];
        }
        else{
          result = result / structure[j + 1];
        }
      }
      this.setState({input: result.toString()});
    }
  }
  render(){
    return(
      <div>
        <div id = "nums">
          {nums.map(n => (
          <NumPad id = {n.id} value = {n.value} handleClick={this.handleInputNum} style={{gridArea: n.id, backgroundColor: "#303030", color: "white"}}/>))}
          {operators.map(n => (
          <Operator id = {n.id} value = {n.value} handleClick={this.handleInputOp} style={{gridArea: n.id, backgroundColor: "#303030", color: "white"}}/>))}
          <Equals handleClick = {this.handleEquals}/>
          <Clear handleClick = {this.handleClear}/>
          <Decimal handleClick = {this.handleInputDecimal}/>
          <Display value = {this.state.input}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Calculator />, document.getElementById("container"));
