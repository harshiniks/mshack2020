import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Organizations from './js/Organizations.jsx';
import Team from './js/Team';
import TeamMembers from './js/TeamMembers';
import MemberKudos from './js/MemberKudos';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
     <Route exact path="/" component={App} />
     <Route path="/Organizations" component={Organizations} />
     <Route path="/Team" component={Team} />
     <Route path="/Members" component={TeamMembers} />
     <Route path="/MemberKudos" component={MemberKudos} />
   </Switch>
   </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
