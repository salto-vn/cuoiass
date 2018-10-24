import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/font/awesome/css/font-awesome.min.css';
import './assets/font/icomoon/style.css';
import './assets/css/metrotheme.css';
import './assets/css/placeholder.css';
import './assets/css/custom.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Routes } from './routes';

ReactDOM.render(
  <Routes />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
