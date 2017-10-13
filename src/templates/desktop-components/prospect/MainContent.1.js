import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import SingleInput from '../components/SingleInput'; 
import Select from '../components/Select';

import ZipgetAddress from '../../../common/getAddress'
import ValidateForm from '../../../common/form_handler'


class MainContent extends React.Component {

    constructor() {
        super()

        this.state = {
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
            // case 'shippingCity':
            //     this.setState({ shippingCity: e.target.value })
            //     break;
            // case 'shippingState':
            //     this.setState({ shippingState: e.target.value })
            //     break;
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
        ValidateForm.formValidate();
        var json_config = this.props.config
        // return false;
       
        var send_data = [];

        send_data['method'] = 'NewProspect';
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
        send_data['address1'] = this.state.shippingAddress1;
       
        this.SendRequestForm(send_data)

        // send_data[] = [ 
        //     'method'=>'NewProspect',
        //     'username'=>$username,
        //     'password'=>$password,
        //     'firstName'=>$data['firstName'],
        //     'lastName'=>$data['lastName'],
        //     'address1'=>$data['shippingAddress1'],
        //     'city'=>$data['shippingCity'],
        //     'state'=>$data['shippingState'],
        //     'zip'=>$data['shippingZip'],
        //     'country'=>$data['shippingCountry'],
        //     'email'=>$data['email'],
        //     'ipAddress'=>$this->ip(),
        //     'campaignId'=>$campaign_id
        // ]
    }

    SendRequestForm(send_data){
        console.log("SENDDAA",send_data)
    }

    componentWillUpdate(nextProps, nextState) {
        console.log(nextState);
    }

    render() {
        const divStyle = {
            clear: 'both'
        }
        const hiddenStyle = {
            display: 'none'
        }
        return (

            <div className="wrap" id="lp_wrap">
                <div id="content">
                    <div id="top"></div>

                    <form id="userForm" name="prospect_form1">
                        <div id="lp_form_fields">
                            <div style={divStyle} >
                                <label>First Name:</label>
                                <input className="formfield required" name="firstName" required="" type="text" placeholder="First Name"
                                    data-error-message="Please enter your first name!" onChange={this.handleInputChange.bind(this, 'firstname')} />
                            </div>

                            <div style={divStyle}>
                                <label>Last Name:</label>
                                <input className="formfield required" name="lastName" required="" type="text" placeholder="Last Name" 
                                data-error-message="Please enter your last name!"  onChange={this.handleInputChange.bind(this, 'lastname')}/>
                            </div>
                            <div style={divStyle}>
                                <label>Address:</label>
                                <input className="formfield required" name="shippingAddress1" required="" type="text" placeholder="Address Line 1"
                                 data-error-message="Please enter your address!"  onChange={this.handleInputChange.bind(this, 'shippingAddress1')}/>
                            </div>
                            <div style={divStyle}>
                                <label>Zip Code:</label>
                                <input className="zip-change formfield required" name="shippingZip" type="number" minLength="5" maxLength="5" placeholder="Zip Code" 
                                data-error-message="Please enter a valid zip code!"  onChange={this.handleInputChange.bind(this, 'shippingZip')}/>
                            </div>
                            <div style={divStyle}>
                                <label>City:</label>
                                <input id="fields_city" className="formfield required" name="shippingCity" type="text" placeholder="City" 
                                data-error-message="Please enter your city!"  onChange={this.handleInputChange.bind(this, 'shippingCity')}/>
                            </div>
                            <div style={divStyle}>
                                <label>State:</label>
                                <select id="fields_state" className="formfield required" name="shippingState" 
                                data-error-message="Please select your state!" onChange={this.handleInputChange.bind(this,'shippingState')}>

                                    <option value="">
                                        Select State
                                        </option>
                                    <option value="AL">
                                        Alabama (AL)
                                        </option>
                                    <option value="AK">
                                        Alaska (AK)
                                        </option>
                                    <option value="AZ">
                                        Arizona (AZ)
                                        </option>
                                    <option value="AR">
                                        Arkansas (AR)
                                        </option>
                                    <option value="CA">
                                        California (CA)
                                        </option>
                                    <option value="CO">
                                        Colorado (CO)
                                        </option>
                                    <option value="CT">
                                        Connecticut (CT)
                                        </option>
                                    <option value="DE">
                                        Delaware (DE)
                                        </option>
                                    <option value="FL">
                                        Florida (FL)
                                        </option>
                                    <option value="GA">
                                        Georgia (GA)
                                        </option>
                                    <option value="HI">
                                        Hawaii (HI)
                                        </option>
                                    <option value="ID">
                                        Idaho (ID)
                                        </option>
                                    <option value="IL">
                                        Illinois (IL)
                                        </option>
                                    <option value="IN">
                                        Indiana (IN)
                                        </option>
                                    <option value="IA">
                                        Iowa (IA)
                                        </option>
                                    <option value="KS">
                                        Kansas (KS)
                                        </option>
                                    <option value="KY">
                                        Kentucky (KY)
                                        </option>
                                    <option value="LA">
                                        Louisiana (LA)
                                        </option>
                                    <option value="ME">
                                        Maine (ME)
                                        </option>
                                    <option value="MD">
                                        Maryland (MD)
                                        </option>
                                    <option value="MA">
                                        Massachusetts (MA)
                                        </option>
                                    <option value="MI">
                                        Michigan (MI)
                                        </option>
                                    <option value="MN">
                                        Minnesota (MN)
                                        </option>
                                    <option value="MS">
                                        Mississippi (MS)
                                        </option>
                                    <option value="MO">
                                        Missouri (MO)
                                        </option>
                                    <option value="MT">
                                        Montana (MT)
                                        </option>
                                    <option value="NE">
                                        Nebraska (NE)
                                        </option>
                                    <option value="NV">
                                        Nevada (NV)
                                        </option>
                                    <option value="NH">
                                        New Hampshire (NH)
                                        </option>
                                    <option value="NJ">
                                        New Jersey (NJ)
                                        </option>
                                    <option value="NM">
                                        New Mexico (NM)
                                        </option>
                                    <option value="NY">
                                        New York (NY)
                                        </option>
                                    <option value="NC">
                                        North Carolina (NC)
                                        </option>
                                    <option value="ND">
                                        North Dakota (ND)
                                        </option>
                                    <option value="OH">
                                        Ohio (OH)
                                        </option>
                                    <option value="OK">
                                        Oklahoma (OK)
                                        </option>
                                    <option value="OR">
                                        Oregon (OR)
                                        </option>
                                    <option value="PA">
                                        Pennsylvania (PA)
                                        </option>
                                    <option value="RI">
                                        Rhode Island (RI)
                                        </option>
                                    <option value="SC">
                                        South Carolina (SC)
                                        </option>
                                    <option value="SD">
                                        South Dakota (SD)
                                        </option>
                                    <option value="TN">
                                        Tennessee (TN)
                                        </option>
                                    <option value="TX">
                                        Texas (TX)
                                        </option>
                                    <option value="UT">
                                        Utah (UT)
                                        </option>
                                    <option value="VT">
                                        Vermont (VT)
                                        </option>
                                    <option value="VA">
                                        Virginia (VA)
                                        </option>
                                    <option value="WA">
                                        Washington (WA)
                                        </option>
                                    <option value="WV">
                                        West Virginia (WV)
                                        </option>
                                    <option value="WI">
                                        Wisconsin (WI)
                                        </option>
                                    <option value="WY">
                                        Wyoming (WY)
                                        </option>
                                </select>
                            </div>
                            <br />
                            <div style={divStyle}>
                                <label>Phone:</label>
                                <input className="formfield required" name="phone" required="" type="tel" data-validate="phone" minLength="10" maxLength="15" 
                                data-error-message="Please enter a valid contact number!" placeholder="Phone Number" onChange={this.handleInputChange.bind(this, 'phone')}/>
                            </div>
                            <div style={divStyle}>
                                <label>Email:</label>
                                <input className="formfield required" name="email" required="" type="email"
                                placeholder="Email Address" data-validate="email" onChange={this.handleInputChange.bind(this, 'email')} />
                            </div>
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