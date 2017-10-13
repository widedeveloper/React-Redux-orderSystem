import React from 'react'
import {connect} from 'react-redux'


class PopupMain extends React.Component {

    render(){
        return (
            <div id="popup">
                <div id="popupmain">
                    <div id="popupcontent"></div>
                    <div id="popupclose">
                        <img className="popupclose" height="30"  src="../assets/images/close.jpg" width="149" />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        config : state.config
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeDevice : (deviceName) => {
            dispatch({
                type:'CHANGE_DEVICE',
                value:deviceName
            })
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PopupMain)