import {createStore} from 'redux';
import {devToolsEnhancer} from 'redux-devtools-extension/developmentOnly';

import rootReducer from './redux-reducers/root';

export default (initialState)=>{
    return createStore(rootReducer,initialState,devToolsEnhancer());
};