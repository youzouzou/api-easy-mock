import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Detail from './pages/Detail'

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/" exact render={() => <Home />}></Route>
      <Route path="/home" render={() => <Home />}></Route>
      <Route path="/detail/:data" render={() => <Detail />}></Route>
    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
