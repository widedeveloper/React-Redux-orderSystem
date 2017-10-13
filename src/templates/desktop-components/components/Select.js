import React from 'react';

const divStyle = {
  clear: 'both'
}
const Select = (props) => (  
  <div style={divStyle}>
    <label>{props.title}:</label>
    <select
      name={props.name}
      id={props.id}
      value={props.selectedOption}
      data-error-message={props.errormessage}
      onChange={props.controlFunc}
      className={props.class}>
      <option value="">{props.placeholder}</option>
      {/* {props.options.map(opt => {
        return (
           <option
            key={opt}
            value={opt}>{opt}</option> 

        );
      })} */}
      
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
);

Select.propTypes = {  
  title:React.PropTypes.string.isRequired,
  class: React.PropTypes.string.isRequired,
  id: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  errormessage:React.PropTypes.string,
  options: React.PropTypes.array,
  selectedOption: React.PropTypes.string,

  controlFunc: React.PropTypes.func.isRequired,
  placeholder: React.PropTypes.string
};

export default Select; 