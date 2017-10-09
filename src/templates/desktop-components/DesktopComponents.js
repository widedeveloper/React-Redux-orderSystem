import React from 'react'
import {connect} from 'react-redux'

import DiscountHolder from './templates/desktop-components/components/DiscountHolder'

class DesktopComponents extends React.Component {

    render(){
        return (
            <DiscountHolder />
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
