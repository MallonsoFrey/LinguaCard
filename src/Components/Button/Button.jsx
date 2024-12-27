/* eslint-disable react/prop-types */
import { forwardRef } from "react";

const Button = forwardRef(function Button(
  { text, className, onClick, disabled = false },
  ref
) {
  return (
    <button
      ref={ref}
      className={className}
      onClick={onClick}
      type="button"
      disabled={disabled}
    >
      {text}
    </button>
  );
});

export default Button;
