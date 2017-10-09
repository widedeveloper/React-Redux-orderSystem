import React from 'react'
import {connect} from 'react-redux'


class ExitPopUp extends React.Component {
    
        render(){
            return (
                <div id="exit_pop">
                    <div className="exit_pop_content">
                        {/* <img src="../bottles/{{oneOf(GET.ao,SESSION.ao)}}/bottle-1.png" class="bottle_exit_1"> */}
                        <div className="shipping_overlay_block">
                            <div className="shipping_perc_off">50% OFF</div>
                            <div className="shipping_sh">SHIPPING &amp; HANDLING!</div>
                            <div className="shipping_lo">LIMITED TIME OFFER</div>
                            <div className="shipping_pay_only">PAY ONLY  AND RECEIVE YOUR TRIAL TODAY!</div>
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
    
    export default connect(mapStateToProps,mapDispatchToProps)(ExitPopUp)