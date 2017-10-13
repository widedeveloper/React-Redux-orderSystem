import React from 'react'
import DesktopComponents from './templates/desktop-components/Index'
import MobileComponents from './templates/mobile-components/Index'
import { connect } from 'react-redux'

var data = require('../data/advertisers/eg_php_s1/eg_php_s1.json');


class App extends React.Component {

	constructor() {
		super()

	}
	componentDidMount() {
		// console.log('hello',this.props.config)
	}
	componentWillReceiveProps(nextProps) {
		console.log('hello', nextProps.config)

		var title = document.getElementsByName('title');
		title[0].innerHTML = nextProps.config.objData.public.productName

		var description = document.getElementsByName('description');
		description[0].setAttribute("content", nextProps.config.objData.meta_description);
		
		var product_name = document.getElementsByClassName('product_name')
		product_name[0].innerHTML = '©' + new Date().getFullYear() + ' ' +  nextProps.config.objData.public.productName
		//footer
		var customer_service = document.getElementsByClassName('customer_service');
		customer_service[0].innerHTML = 'Customer Service: '+  nextProps.config.objData.public.companyCustomerServicePhone

	}
	componentWillMount() {

		this.props.getJsondata(data)		
	}


	render() {
		//detect mobile or pc by widow size (* can use mobile-detect npm module)
		if (window.innerWidth <= 800 && window.innerHeight <= 600) {
			return (
				this.mobileTemplate()
			)
		} else {
			return (
				this.desktopTemplate()
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
		config: state.config
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		// changeDevice : (deviceName) => {
		// 	dispatch({ 
		// 		type:'CHANGE_DEVICE',
		// 		value : deviceName
		// 	})
		// },

		getJsondata: (data) => {
			dispatch({
				type: 'json_store',
				value: data.data_eg_php_s1
			})
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)


