import { combineReducers } from 'redux';
import base from './base';
import github from './github';

export default combineReducers({ base, github });
