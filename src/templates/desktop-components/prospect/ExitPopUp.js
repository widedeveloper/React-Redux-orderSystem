import React from 'react'
import {connect} from 'react-redux'


export default class ExitPopUp extends React.Component {
    
    render(){
        return (
            <div id="exit_pop">
                <div className="exit_pop_content">
                    <img src="../../../assets/bottles/eg_php_s1/bottle-1.png" className="bottle_exit_1"/>
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
    
  