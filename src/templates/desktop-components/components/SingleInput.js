import React from 'react';

const divStyle = {
    clear: 'both'
}
const SingleInput = (props) => (
  
    <div style={divStyle} >
        <label>{props.title}:</label>
        <input className={props.class} id={props.id} name={props.name} required="" type={props.inputType} placeholder={props.placeholder} 
            data-error-message={props.errormessage} onChange={props.controlFunc} data-validate={props.datavalidate}/>
    </div>
);

SingleInput.propTypes = {
    inputType: React.PropTypes.oneOf(['text', 'number','email']).isRequired,
    title: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    class: React.PropTypes.string.isRequired,
    id: React.PropTypes.string,
    datavalidate:React.PropTypes.string,
    errormessage:React.PropTypes.string,
    controlFunc: React.PropTypes.func.isRequired,
    content: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
    ]),
    placeholder: React.PropTypes.string,
};

export default SingleInput;  