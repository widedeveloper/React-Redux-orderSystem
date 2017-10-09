import {createStore, applyMiddleware} from 'redux';
import { createLogger } from 'redux-logger'

import config from './redux/reducers'

const middlewares = applyMiddleware(createLogger())
const store = createStore(config ,middlewares)


export default store