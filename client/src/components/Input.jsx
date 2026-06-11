import React, { useId } from "react";
import PropTypes from "prop-types";
const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", name, ...props },
  ref
) {
  const id = useId();
  return (
    <div className="flex w-full flex-col text-sm">
      {label && (
        <label
          htmlFor={id}
          className="mb-2 inline-block text-sm font-medium text-slate-300"
        >
          {label} <sup className="text-cyan-300">*</sup>
        </label>
      )}

      <input
        type={type}
        className={`mb-4 w-full rounded-xl border border-slate-700/80 bg-slate-950/60 px-3 py-2.5 text-slate-100 placeholder-slate-500 outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10 ${className}`}
        ref={ref}
        {...props}
        id={id}
        name={name}
      />
    </div>
  );
});

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string,
};

export default Input;
