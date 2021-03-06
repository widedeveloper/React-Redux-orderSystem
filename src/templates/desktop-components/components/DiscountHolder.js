import React from 'react'
import {connect} from 'react-redux'


class DiscountHolder extends React.Component {
    
        render(){
            return (
                <div id="discountholder">
                    <div className="discountsection">SPECIAL DISCOUNT ACTIVATED! - SAVE OVER 50% OFF SHIPPING & HANDLING ON ALL ORDERS PLACED TODAY! ONLY "PROPS values"! PER TRIAL</div>
                    <div className="discountoffset"></div>
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
    
    export default connect(mapStateToProps,mapDispatchToProps)(DiscountHolder)