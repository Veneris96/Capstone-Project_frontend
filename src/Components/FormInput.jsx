import React from 'react'

const FormInput = (props) => {
    return (
        <div className='form-input flex flex-col'>
            {/* <label htmlFor="">Password</label> */}
            <input
                name={props.name}
                placeholder={props.placeholder}
                value={props.value}
                type={props.type}
                onChange={props.onChange}
                className={props.className}
                required={true}
                pattern={props.pattern}
                id={props.id} />
        </div>
    )
}

export default FormInput