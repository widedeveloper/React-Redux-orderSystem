import React from 'react'
import {connect} from 'react-redux'

import DiscountHolder from './DiscountHolder'
import ExitPopUp from './ExitPopUp'
import PopupMain from './PopupMain'
import MainContent from './MainContent'

export default class Index extends React.Component {

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