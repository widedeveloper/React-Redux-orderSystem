import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import validator from 'react-validation'

import SingleInput from '../components/SingleInput'; 
import Select from '../components/Select';

import ZipgetAddress from '../../../common/getAddress'
import ValidateForm from '../../../common/form_handler'

// const stateOptions=['AK','AL','AZ']
const required = (value) => {
    if (!value.toString().trim().length) {
      // We can return string or jsx as the 'error' prop for the validated Component
      return 'require';
    }
};

const email = (value) => {
    if (!validator.isEmail(value)) {
        return `${value} is not a valid email.`
    }
};

class MainContent extends React.Component {

    constructor() {
        super()

        this.state = {
            method:'',
            firstname: '',
            lastname: '',
            shippingAddress1:'',
            shippingZip:'',
            shippingCity:'',
            shippingState:'',
            phone:'',
            email:'',
            ip:'',
            shippingCountry:'US'
        }

    }
    componentDidMount(){
        var self = this
        axios.get('http://ipinfo.io')
        .then(function (response) {
           
            self.setState({ip:response.data.ip})
        })
        .catch(function (error) {
            console.log(error);
        });
                
    }
    handleInputChange(params, e) {

        ValidateForm.Inputvalidate(e.target);

        switch (params) {
            case 'firstname':
                this.setState({ firstname: e.target.value })
                break;
            case 'lastname':
                this.setState({ lastname: e.target.value })
                break;
            case 'shippingAddress1':
                this.setState({ shippingAddress1: e.target.value })
                break;
            case 'shippingZip':
                this.setState({ shippingZip: e.target.value })
                ZipgetAddress.autofillAddress(e.target.value,this);                
                break;
            case 'shippingCity':
                this.setState({ shippingCity: e.target.value })
                break;
            case 'shippingState':
                this.setState({ shippingState: e.target.value })
                break;
            case 'phone':
                this.setState({ phone: e.target.value })
                break;
            case 'email':
                this.setState({ email: e.target.value })
                break;
            default:
            break;
        }

    }

    
    handleFormSubmit(e){
        e.preventDefault()
       
        ValidateForm.formValidate(this);        
        var json_config = this.props.config
        // return false;
       
        var send_data = [];

        send_data['method'] = this.state.method;
        send_data['username'] = json_config.objData.crm.username;
        send_data['password'] = json_config.objData.crm.password;
        send_data['firstName'] = this.state.firstname;
        send_data['lastName'] = this.state.lastname;
        send_data['address1'] = this.state.shippingAddress1;
        send_data['city'] = this.state.shippingCity;
        send_data['state'] = this.state.shippingState;
        send_data['zip'] = this.state.shippingZip;
        send_data['country'] = this.state.shippingCountry;
        send_data['email'] = this.state.email;        
        send_data['ipAddress'] = this.state.ip;
        send_data['campaignId'] = this.state.shippingAddress1;
       
        this.SendRequestForm(send_data)

    }

    SendRequestForm(send_data){
        console.log("SENDDAA",send_data)
    }

    componentWillUpdate(nextProps, nextState) {
        console.log(nextState);
    }

    render() {
       
        const hiddenStyle = {
            display: 'none'
        }
        return (

            <div className="wrap" id="lp_wrap">
                <div id="content">
                    <div id="top"></div>

                    <form id="userForm" ref="submitForm" name="prospect_form1" >
                        <div id="lp_form_fields">

                        <SingleInput inputType={'text'}
                            title={'First Name'}
                            name={'firstName'}
                            class={'formfield required'}
                            controlFunc={this.handleInputChange.bind(this, 'firstname')}
                            errormessage={'Please enter your first name!'}
                            placeholder={'First Name'} validations={[required]}/>
                        <SingleInput
                            inputType={'text'}
                            title={'Last Name'}
                            name={'lastName'}
                            class={'formfield required'}
                            controlFunc={this.handleInputChange.bind(this, 'lastname')}
                            errormessage={'Please enter your last name!'}
                            placeholder={'Last Name'} />
                        <SingleInput
                            inputType={'text'}
                            title={'Address'}
                            name={'shippingAddress1'}
                            class={'formfield required'}
                            controlFunc={this.handleInputChange.bind(this, 'shippingAddress1')}
                            errormessage={'Please enter your address!'}
                            placeholder={'Address Line 1'} />   
                        <SingleInput
                            inputType={'text'}
                            title={'ZipCode'}
                            name={'shippingZip'}
                            class={'zip-change formfield required'}
                            controlFunc={this.handleInputChange.bind(this, 'shippingZip')}
                            errormessage={'Please enter a valid zip code!'}
                            placeholder={"Zip Code"} />  
                        <SingleInput
                            inputType={'text'}
                            title={'City'}
                            id={'fields_city'}
                            name={'shippingCity'}
                            class={'formfield required'}
                            controlFunc={this.handleInputChange.bind(this, 'shippingCity')}
                            errormessage={'Please enter your city!'}
                            placeholder={"City"} />  

                        <Select
                            title={'State'}
                            name={'shippingState'}
                            id={'fields_state'}
                            class={'formfield required'}
                            errormessage={'Please select your state!'}
                            controlFunc={this.handleInputChange.bind(this,'shippingState')}
                            placeholder={'Select State'}

                            /* options={stateOptions} */
                            />

                            <br />
                        <SingleInput
                            inputType={'number'}
                            title={'Phone'}
                            /* id={'fields_city'} */
                            name={'phone'}
                            class={'formfield required'}
                            controlFunc={this.handleInputChange.bind(this, 'phone')}
                            errormessage={'Please enter a valid contact number!'}
                            placeholder={"Phone Number"} 
                            datavalidate = {'phone'}/>  
                        <SingleInput
                            inputType={'email'}
                            title={'Email'}
                            /* id={'fields_city'} */
                            name={'email'}
                            class={'formfield required'}
                            controlFunc={this.handleInputChange.bind(this, 'email')}
                            errormessage={'Please enter a valid Email Address!'}
                            placeholder={"Email Address"}
                            datavalidate = {'email'}/>  
                           
                           
                        </div>

                        <input id="country" name="shippingCountry" type="hidden" value="US" data-error-message="Please select your country!" />
                        <input id="submitted" name="submitted" type="hidden" value="1" />

                        <input id="lp_button_1" src="../assets/reg-desktop/images/lp_button.png" type="image" onClick={this.handleFormSubmit.bind(this)} />


                        <p id="loading-indicator" style={hiddenStyle}>Processing...</p>
                        <p id="crm-response-container" style={hiddenStyle}>Processing...</p>

                    </form>



                    <img id="bottle_lp_top" src="../assets/bottles/eg_php_s1/bottle-1.png" />
                    <img id="bottle_lp_bot_2" src="../assets/bottles/eg_php_s1/bottle-1.png" />
                    <img id="bottle_lp_bot_3" src="../assets/bottles/eg_php_s1/bottle-1.png" />
                    <img id="bottle_lp_bot_1" src="../assets/bottles/eg_php_s1/bottle-1.png" />


                    <a className="totop" href="#top" target="_self">
                        <img height="118" id="lp_button_3" src="../assets/reg-desktop/images/lp_button_3.png" width="367" />
                    </a>


                    <div id="footer">


                        <div id="seals2wrap">
                            <img height="80" id="seals2" src="../assets/reg-desktop/images/seals2.png" width="810" />
                        </div>


                        <div id="indexFooter">
                            <div className="footer">
                                <span className="footerlink product_name"></span> |
                                <a className="footerlink" target="_blank">Terms &amp;Conditions</a> |
                                <a className="footerlink" target="_blank">Privacy Policy</a> |
                                <a className="footerlink" target="_blank">Contact Us</a> |
                                <span className="customer_service"></span>
                            </div>
                        </div>

                        <div></div>
                        <br />
                        <br />
                        <span>
                            *These statements have not been evaluated by the Food and
                        Drug Administration. These products are not intended to
                        diagnose, treat, cure or prevent any disease.
                        </span>

                    </div>
                </div>



                <div className="section" id="section1" style={{ backgroundImage: 'url(../assets/reg-desktop/images/lp_01.jpg)' }} >
                    <a id="#form"></a>
                </div>
                <div className="section" id="section2" style={{ backgroundImage: 'url(../assets/reg-desktop/images/lp_02.jpg)' }}></div>
                <div className="section" id="section3" style={{ backgroundImage: 'url(../assets/reg-desktop/images/lp_03.jpg)' }}></div>
                <div className="section" id="section4" style={{ backgroundImage: 'url(../assets/reg-desktop/images/lp_04.jpg)' }}></div>
                <div className="section" id="section5" style={{ backgroundImage: 'url(../assets/reg-desktop/images/lp_05.jpg)' }}></div>
                <div className="section" id="section6" style={{ backgroundImage: 'url(../assets/reg-desktop/images/lp_06.jpg)' }}></div>
                <div className="section" id="section7" style={{ backgroundImage: 'url(../assets/reg-desktop/images/lp_07.jpg)' }}></div>
                <div className="section" id="section8" style={{ backgroundImage: 'url(../assets/reg-desktop/images/lp_08.jpg)' }}></div>
                <div className="section" id="section9" style={{ backgroundImage: 'url(../assets/reg-desktop/images/lp_09.jpg)' }}></div>
                <div className="section" id="section10" style={{ backgroundImage: 'url(../assets/reg-desktop/images/lp_10.jpg)' }}></div>
                <div className="section" id="section11" style={{ backgroundImage: 'url(../assets/reg-desktop/images/lp_11.jpg)' }}></div>
                <div className="section" id="section12" style={{ backgroundImage: 'url(../assets/reg-desktop/images/lp_12.jpg)' }}></div>
                <div className="section" id="section13" style={{ backgroundImage: 'url(../assets/reg-desktop/images/lp_13.jpg)' }}></div>
                <div className="section" id="section14" style={{ backgroundImage: 'url(../assets/reg-desktop/images/lp_14.jpg)' }}></div>
                <div className="section" id="section15" style={{ backgroundImage: 'url(../assets/reg-desktop/images/lp_15.jpg)' }}></div>
                <div className="section" id="section16" style={{ backgroundImage: 'url(../assets/reg-desktop/images/lp_16.jpg)' }}></div>
                <div className="section" id="section17" style={{ backgroundImage: 'url(../assets/reg-desktop/images/lp_17.jpg)' }}></div>


            </div >

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
        changeDevice: (deviceName) => {
            dispatch({
                type: 'CHANGE_DEVICE',
                value: deviceName
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContent)