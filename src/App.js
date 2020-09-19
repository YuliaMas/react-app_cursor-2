import React, {Component} from 'react';
import './contacts/normalize.css';
import './App.css';
import Contacts from "./contacts/contacts";
import MyTimer from "./components/Timer/MyTimer";

class App extends Component{
  render() {
    return (
        <div className="App">
          < Contacts />
          <MyTimer time="50000" step="1000" autoStart="true"
                   onTick={(time) => console.log("Залишилось часу: " + time/1000)}
                   onTimeEnd={() => console.log("Час вийшов!")}
                   onTimeStart={(timeLeft) => console.log("Таймер запущено!")}
                   onTimePause={(timeLeft) => console.log("Таймер на паузі!")}
          />
        </div>

    );
  }
}
export default App;
