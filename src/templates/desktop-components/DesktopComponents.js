import React from 'react'
import {connect} from 'react-redux'

import DiscountHolder from './components/DiscountHolder'
import ExitPopUp from './components/ExitPopUp'
import PopupMain from './components/PopupMain'
import MainContent from './components/MainContent'

class DesktopComponents extends React.Component {

    render(){
        return (
			<div>
				<DiscountHolder />
				<ExitPopUp />
				<PopupMain />
				<MainContent />
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

export default connect(mapStateToProps,mapDispatchToProps)(DesktopComponents)
