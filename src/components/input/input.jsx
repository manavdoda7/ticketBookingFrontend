import React from 'react'

const input = ({label, type, id}) => {
    return (
        <div className="mb-3">
            <label htmlFor={label} className="form-label">{label}</label>
            <input type={type} className="form-control" id={id} required />
        </div>
    )
}

export default input