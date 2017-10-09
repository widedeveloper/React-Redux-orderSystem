import React from 'react'
import {connect} from 'react-redux'

 class MobileComponents extends React.Component {

    render(){
        return (
            <div>
                <h1>Template 2 </h1>
                <button onClick={()=>this.props.changeDevice('desktop')} >HAHAH</button>
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

export default connect(mapStateToProps,mapDispatchToProps)(MobileComponents)
