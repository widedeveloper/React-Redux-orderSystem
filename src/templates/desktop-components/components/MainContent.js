import React from 'react'
import {connect} from 'react-redux'


class MainContent extends React.Component {
        
        render(){
            const divStyle = {
                clear : 'both'
            }
            const hiddenStyle = {
                display : 'none'
            }
            return (
               
                <div className="wrap" id="lp_wrap">
                    <div id="content">
                        <div id="top"></div>
                        
                        <form id="userForm" name="prospect_form1">
                            
                        {/* <input type="hidden" name="ao" value="{{oneOf(GET.ao,SESSION.ao)}}">
                        <input type="hidden" name="crm" value="{{ epc2.crm.crm }}">
                        <input type="hidden" name="AFID" value="{{oneOf(GET.AFID,SESSION.AFID)}}">
                        <input type="hidden" name="AFFID" value="{{oneOf(GET.AFFID,SESSION.AFFID)}}">
                        <input type="hidden" name="SID" value="{{oneOf(GET.SID,SESSION.SID)}}">
                        <input type="hidden" name="C1" value="{{oneOf(GET.C1,SESSION.C1)}}">
                        <input type="hidden" name="C2" value="{{oneOf(GET.C2,SESSION.C2)}}">
                        <input type="hidden" name="C3" value="{{oneOf(GET.C3,SESSION.C3)}}">
                        <input type="hidden" name="OPT" value="{{oneOf(GET.OPT,SESSION.OPT)}}">
                        <input type="hidden" name="AID" value="{{oneOf(GET.AID,SESSION.AID)}}">
                        <input type="hidden" name="click_id" value="{{oneOf(GET.click_id,SESSION.click_id)}}">
                        <input type="hidden" name="debug" value="{{oneOf(GET.debug,SESSION.debug)}}"> */}
                            
                            <div id="lp_form_fields">
                                
                                <div style={divStyle} >
                                    <label>First Name:</label>
                                    <input className="formfield required" name="firstName" required="" type="text" value="" placeholder="First Name" data-error-message="Please enter your first name!" /> 
                                </div>
                            
                                <div style={divStyle}>
                                    <label>Last Name:</label>
                                    <input className="formfield required" name="lastName" required="" type="text" value="" placeholder="Last Name" data-error-message="Please enter your last name!" /> 
                                </div>
                                <div style={divStyle}>
                                    <label>Address:</label>
                                    <input className="formfield required" name="shippingAddress1" required="" type="text" value="" placeholder="Address Line 1" data-error-message="Please enter your address!" /> 
                                </div>
                                <div style={divStyle}>
                                    <label>Zip Code:</label>
                                    <input className="zip-change formfield required" name="shippingZip" type="text" data-error-message="Please enter a valid zip code!" minlength="5" maxlength="5" pattern="[0-9]*" onkeyup="javascript: this.value = this.value.replace(/[^0-9]/g, '');" required="" value="" placeholder="Zip Code" /> 
                                </div>
                                <div style={divStyle}>
                                    <label>City:</label>
                                    <input id="fields_city" className="formfield required" name="shippingCity" required="" type="text" value="" placeholder="City" data-error-message="Please enter your city!" /> 
                                </div>
                                <div style={divStyle}>
                                    <label>State:</label>
                                    <select id="fields_state" className="formfield required" name="shippingState" required="" data-selected="" data-error-message="Please select your state!">
                                    
                                        <option  selected value="">
                                            Select State
                                        </option>
                                        <option  value="AL">
                                            Alabama (AL)
                                        </option>
                                        <option  value="AK">
                                            Alaska (AK)
                                        </option>
                                        <option  value="AZ">
                                            Arizona (AZ)
                                        </option>
                                        <option  value="AR">
                                            Arkansas (AR)
                                        </option>
                                        <option  value="CA">
                                            California (CA)
                                        </option>
                                        <option  value="CO">
                                            Colorado (CO)
                                        </option>
                                        <option  value="CT">
                                            Connecticut (CT)
                                        </option>
                                        <option  value="DE">
                                            Delaware (DE)
                                        </option>
                                        <option  value="FL">
                                            Florida (FL)
                                        </option>
                                        <option  value="GA">
                                            Georgia (GA)
                                        </option>
                                        <option  value="HI">
                                            Hawaii (HI)
                                        </option>
                                        <option  value="ID">
                                            Idaho (ID)
                                        </option>
                                        <option  value="IL">
                                            Illinois (IL)
                                        </option>
                                        <option  value="IN">
                                            Indiana (IN)
                                        </option>
                                        <option  value="IA">
                                            Iowa (IA)
                                        </option>
                                        <option  value="KS">
                                            Kansas (KS)
                                        </option>
                                        <option  value="KY">
                                            Kentucky (KY)
                                        </option>
                                        <option  value="LA">
                                            Louisiana (LA)
                                        </option>
                                        <option  value="ME">
                                            Maine (ME)
                                        </option>
                                        <option  value="MD">
                                            Maryland (MD)
                                        </option>
                                        <option  value="MA">
                                            Massachusetts (MA)
                                        </option>
                                        <option  value="MI">
                                            Michigan (MI)
                                        </option>
                                        <option  value="MN">
                                            Minnesota (MN)
                                        </option>
                                        <option  value="MS">
                                            Mississippi (MS)
                                        </option>
                                        <option  value="MO">
                                            Missouri (MO)
                                        </option>
                                        <option  value="MT">
                                            Montana (MT)
                                        </option>
                                        <option  value="NE">
                                            Nebraska (NE)
                                        </option>
                                        <option  value="NV">
                                            Nevada (NV)
                                        </option>
                                        <option  value="NH">
                                            New Hampshire (NH)
                                        </option>
                                        <option  value="NJ">
                                            New Jersey (NJ)
                                        </option>
                                        <option  value="NM">
                                            New Mexico (NM)
                                        </option>
                                        <option  value="NY">
                                            New York (NY)
                                        </option>
                                        <option  value="NC">
                                            North Carolina (NC)
                                        </option>
                                        <option  value="ND">
                                            North Dakota (ND)
                                        </option>
                                        <option  value="OH">
                                            Ohio (OH)
                                        </option>
                                        <option  value="OK">
                                            Oklahoma (OK)
                                        </option>
                                        <option  value="OR">
                                            Oregon (OR)
                                        </option>
                                        <option  value="PA">
                                            Pennsylvania (PA)
                                        </option>
                                        <option  value="RI">
                                            Rhode Island (RI)
                                        </option>
                                        <option  value="SC">
                                            South Carolina (SC)
                                        </option>
                                        <option  value="SD">
                                            South Dakota (SD)
                                        </option>
                                        <option  value="TN">
                                            Tennessee (TN)
                                        </option>
                                        <option  value="TX">
                                            Texas (TX)
                                        </option>
                                        <option  value="UT">
                                            Utah (UT)
                                        </option>
                                        <option  value="VT">
                                            Vermont (VT)
                                        </option>
                                        <option  value="VA">
                                            Virginia (VA)
                                        </option>
                                        <option  value="WA">
                                            Washington (WA)
                                        </option>
                                        <option  value="WV">
                                            West Virginia (WV)
                                        </option>
                                        <option  value="WI">
                                            Wisconsin (WI)
                                        </option>
                                        <option  value="WY">
                                            Wyoming (WY)
                                        </option>
                                </select>
                                </div>
                                <br/>
                                <div style={divStyle}>
                                    <label>Phone:</label>
                                    <input className="formfield required" name="phone" required="" type="tel" data-validate="phone" minlength="10" maxlength="15" data-min-length="10" data-max-length="15" value="" data-error-message="Please enter a valid contact number!" placeholder="Phone Number" /> 
                                </div>
                                <div style={divStyle}>
                                    <label>Email:</label>
                                    <input className="formfield required" name="email" required="" type="email" value="" placeholder="Email Address" data-validate="email" />
                                </div>

                            </div>
                            
                            <input id="country" name="shippingCountry" type="hidden" value="US" data-error-message="Please select your country!" /> 
                            
                            <input id="submitted" name="submitted" type="hidden" value="1" /> 
                            
                        
                            <input id="lp_button_1" src="../assets/images/lp_button.png" type="image" onclick="isExit=false;" />
                        
                            
                            <p id="loading-indicator" style={hiddenStyle}>Processing...</p>
                            <p id="crm-response-container" style={hiddenStyle}>Processing...</p>
                        
                        </form>
                    
                    
                    
                        {/* <img id="bottle_lp_top" src="../bottles/{{oneOf(GET.ao,SESSION.ao)}}/bottle-1.png">
                        <img id="bottle_lp_bot_2" src="../bottles/{{oneOf(GET.ao,SESSION.ao)}}/bottle-1.png">
                        <img id="bottle_lp_bot_3" src="../bottles/{{oneOf(GET.ao,SESSION.ao)}}/bottle-1.png">
                        <img id="bottle_lp_bot_1" src="../bottles/{{oneOf(GET.ao,SESSION.ao)}}/bottle-1.png"> */}
                    
                        
                        <a className="totop" href="#top" target="_self">
                            <img height="118" id="lp_button_3" src="../src/reg-desktop/images/lp_button_3.png" width="367" />
                        </a>
                        
                        <div id="footer">
                            <div id="seals2wrap">
                                <img height="80" id="seals2" src="../assets/images/seals2.png" width="810" />
                            </div>
                            <div id="indexFooter">                                   
                                <div className="footer">
                                    <span className="footerlink"></span> | <a className="footerlink" onclick="showPop('terms');" target="_blank">Terms &amp;Conditions</a> | <a className="footerlink" onclick="showPop('privacy');" target="_blank">Privacy Policy</a> | <a className="footerlink" onclick="showPop('contact');" target="_blank">Contact Us</a> | <span>Customer Service: companyCustomerServicePhone </span>
                                </div>
                            </div>
                        
                            <br/>
                            <br/>                              
                        </div>

                        <div className="section" id="section1"  style={{ backgroundImage: 'url(../assets/images/lp_01.jpg)'}} >
                            <a id="#form"></a>
                        </div>
                        <div className="section" id="section2" style={{ backgroundImage: 'url(../assets/images/lp_02.jpg)'}}></div>
                        <div className="section" id="section3" style={{ backgroundImage: 'url(../assets/images/lp_03.jpg)'}}></div>
                        <div className="section" id="section4" style={{ backgroundImage: 'url(../assets/images/lp_04.jpg)'}}></div>
                        <div className="section" id="section5" style={{ backgroundImage: 'url(../assets/images/lp_05.jpg)'}}></div>
                        <div className="section" id="section6" style={{ backgroundImage: 'url(../assets/images/lp_06.jpg)'}}></div>
                        <div className="section" id="section7" style={{ backgroundImage: 'url(../assets/images/lp_07.jpg)'}}></div>
                        <div className="section" id="section8" style={{ backgroundImage: 'url(../assets/images/lp_08.jpg)'}}></div>
                        <div className="section" id="section9" style={{ backgroundImage: 'url(../assets/images/lp_09.jpg)'}}></div>
                        <div className="section" id="section10" style={{ backgroundImage: 'url(../assets/images/lp_10.jpg)'}}></div>
                        <div className="section" id="section11" style={{ backgroundImage: 'url(../assets/images/lp_11.jpg)'}}></div>
                        <div className="section" id="section12" style={{ backgroundImage: 'url(../assets/images/lp_12.jpg)'}}></div>
                        <div className="section" id="section13" style={{ backgroundImage: 'url(../assets/images/lp_13.jpg)'}}></div>
                        <div className="section" id="section14" style={{ backgroundImage: 'url(../assets/images/lp_14.jpg)'}}></div>
                        <div className="section" id="section15" style={{ backgroundImage: 'url(../assets/images/lp_15.jpg)'}}></div>
                        <div className="section" id="section16" style={{ backgroundImage: 'url(../assets/images/lp_16.jpg)'}}></div>
                        <div className="section" id="section17" style={{ backgroundImage: 'url(../assets/images/lp_17.jpg)'}}></div>
                
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
    
    export default connect(mapStateToProps,mapDispatchToProps)(MainContent)