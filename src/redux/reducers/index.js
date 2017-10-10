import { combineReducers } from 'redux'

var data = require('../../../data/advertisers/eg_php_s1/eg_php_s1.json'); 

console.log(data);
const defaultConfig = {
    username:'Jhon',
    device:'desktop'
}
const config = (state = defaultConfig, action) => {

    switch(action.type) {
        case 'CHANGE_DEVICE' :
            state = {...state, device:action.value}
            break;
        default:
            break;
    }
    return state
}

export default combineReducers({
    config:config
})