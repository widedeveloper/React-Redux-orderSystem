import { combineReducers } from 'redux'

const config = (state = {}, action) => {

    switch(action.type) {
        case 'json_store' :
            state = {...state, objData:action.value}
            break;
        default:
            break;
    }
    return state
}



export default combineReducers({
    config:config
})