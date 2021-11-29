import App from './components/App';
import ReactDOM from 'react-dom';
import React from 'react';
import GlobalStyle from './global/GlobalStyle';

ReactDOM.render(
  <React.Fragment>
    <GlobalStyle />
    <App />
  </React.Fragment>,
  document.getElementById('app')
);
