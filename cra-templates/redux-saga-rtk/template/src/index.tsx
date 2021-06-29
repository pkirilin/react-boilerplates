import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './app/store';

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <App></App>
    </Provider>
  </StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
