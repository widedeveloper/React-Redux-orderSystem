import React from 'react'
import DesktopComponents from './templates/desktop-components/DesktopComponents'
import MobileComponents from './templates/mobile-components/MobileComponents'
import {connect} from 'react-redux'

class App extends React.Component {
	
	constructor(){
		super()
		
	}
	componentDidMount() {
		
	}
	componentWillMount() {
		
	}
	render() {

		if(this.props.config.device == "desktop") {
			return(
				this.desktopTemplate()
			)
		} else if(this.props.config.device == 'mobile') {
			return (
				this.mobileTemplate()
			)
		}
		
	}

	mobileTemplate() {	
		return (
				<MobileComponents />	
		)
	}

	desktopTemplate() {
		return (
				<DesktopComponents />
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
				value : deviceName
			})
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(App)


