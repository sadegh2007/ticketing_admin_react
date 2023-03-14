import React from "react";

const Input = React.forwardRef(({ required = false, label, name, value, onChange, onInput, placeholder, className, onBlur, type = "text" }, ref) => {
  return (
      <div className="form-control">
          <label className="label">
              <span className="label-text">{label}</span>
          </label>
          <input
              type={type}
              ref={ref}
              placeholder={placeholder}
              value={value}
              name={name}
              required={required}
              onBlur={onBlur}
              onInput={onInput}
              onChange={onChange}
              style={{height: '38px'}}
              className={`input input-bordered rounded focus:outline-none text-sm w-full placeholder-gray-600 ${className ?? ''}`}
          />
      </div>
  );
});

export default Input;