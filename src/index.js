import React from 'react';
import ReactDOM from 'react-dom'

import AppStorage from './components/services/Storage';
import { App } from './components/App/App';

const ratedFilmsStorage = new AppStorage('rated-films', window.localStorage);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App ratedFilmsStorage={ratedFilmsStorage} />
  </React.StrictMode>
)