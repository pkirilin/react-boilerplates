import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { CounterPage } from './features/counter/pages';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/counter">Counter</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route exact path="/counter">
          <CounterPage></CounterPage>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
