import React, { Component } from 'react';
// import axios from 'axios';
import { HashRouter , Route, Switch } from 'react-router-dom';
import Container from './Container';
// import AuthComponent from './Components/AuthComponent';
// import AdminComponent from './Components/AdminComponent';
import LoginComponent from './Components/LoginComponent';
// import { rootRef } from './Firebase';


class App extends Component {


  componentDidMount() {
    // rootRef.ref('messages/').on('value', snapshot => {
    //   let msg = [];
    //   snapshot.forEach(childSnapshot => {
    //     msg.push(childSnapshot.val())
    //   })

    //   this.setState({messages: msg})
    // })
  }



  // fetchData() {
    // axios.get('https://jsonplaceholder.typicode.com/users/')
    // .then((res) => {
    //   this.setState({users : res.data})
    // })
    // .catch((err) => {
    //   console.log(err)
    // })
  // }
  

  render() {
    return (
     <HashRouter>
       
      <Switch>
        {//<ChatComponent sendMessage={this.sendMessage} onRef={ref => (this.child = ref)} messages={this.state.messages}/>
      }


        <Route exact path="/2016141807" component={LoginComponent} />
        {/* <Route exact path="/admin" component={AdminComponent} /> */}
        <Route path="/" component={Container} />

      </Switch>
      </HashRouter>
    );
  }
}

export default App;
