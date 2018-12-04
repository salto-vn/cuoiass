import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Routes } from './routes';

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
ReactDOM.render(
    <Routes />
  , document.getElementById('root') as HTMLElement
);
registerServiceWorker();
