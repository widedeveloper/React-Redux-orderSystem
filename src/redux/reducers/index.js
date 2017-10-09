import { combineReducers } from 'redux'


const defaultConfig = {
    username:'Jhon',
    device:'mobile'
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