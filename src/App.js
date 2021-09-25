import React from 'react';
import './App.css';
import CounterValue from './component/CounterValue';

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      counter: 1,
      inputText: '',
      setOpen: true,
    }
  }

  componentMount(){
    fetch('https://interview-8e4c5-default-rtdb.firebaseio.com/front-end/202011046.json').then(res=>res.json())
    .then(response => {
      console.log(response);
      if(response){
        this.setState({counter:response})
      }
    })
  }

  modifyAPI = (counter) => {
    fetch('https://interview-8e4c5-default-rtdb.firebaseio.com/front-end.json',{
      method:"PUT",
      body:JSON.stringify({'202011046':counter})
    }).then(res=>res.json())
    .then(response=> {
      console.log(response)
      this.setState({setOpen : true});
    })
  }; 

  onChange = (event) => {
    this.setState({setOpen : false});    
    let inputText = event.target.value;
    this.setState({counter: parseInt(inputText) || 1});  
    this.modifyAPI(inputText);  
  }

  increment = () => {
    if(this.state.counter < 1000){
      this.setState({setOpen : false});
      let counter = this.state.counter +1;
      this.setState({counter})
      this.modifyAPI(counter);
    }
  }

  decrement = () => {
    if (this.state.counter > 1){
      this.setState({setOpen : false});
      let counter = this.state.counter -1;
      this.setState({counter})
      this.modifyAPI(counter);
    } 
  }

  render() {
    const{setOpen} = this.state;
    return (
      <>
      <div>
      { !setOpen && <div><div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>Saving Counter Value</div>}
      </div>

      <div className="App">        
        <button id="b1" onClick={this.decrement}>-</button>
        <input onChange= {this.onChange} value={this.state.counter}/>
        <button id="b2" onClick={this.increment}>+</button>
        <CounterValue counter ={this.state.counter} />
      </div>
      </>
    )
  }
}

export default App;