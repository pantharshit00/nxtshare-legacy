import React from 'react';

const InputField = ({ onChange, type, value, className, name, label, placeholder, text, ...rest }) => {
    return (
        <div className="form-group">
            {(label && <label><h4>{label}</h4></label>) || (name && <label><h4>{name}</h4></label>)}
            <input
                onChange={onChange}
                type={type}
                value={value}
                className={className ? className : 'form-control'}
                placeholder={placeholder? placeholder:name + ' goes here...'}
                name={name ?name.toLowerCase() : undefined}
                {...rest}
            />{text ? text :null}
        </div>
    );
};

export default InputField;