import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
//import redux
import { Provider } from 'react-redux'
// import store
import store from './store.js'

export default class Index extends React.Component {

    render() {
        return(
            <Provider store = {store}>
                <App />
            </Provider>
        )
    }
}

ReactDOM.render(<Index />, document.getElementById('root'))
