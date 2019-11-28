import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';
import {HashRouter} from 'react-router-dom';
import store from './store';
import {Provider} from 'react-redux';

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <App/>
        </HashRouter> 
</Provider>,
document.getElementById('root'));


serviceWorker.unregister();
