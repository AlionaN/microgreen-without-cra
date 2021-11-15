import React from 'react';
import appStore from '@/store/store';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { App } from '@/components/App';
import '@/general.scss';

ReactDOM.render(
  <Provider store={appStore}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
