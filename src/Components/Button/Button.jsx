/* eslint-disable react/prop-types */
import { forwardRef } from "react";

const Button = forwardRef(function Button({ text, className, onClick }, ref) {
  return (
    <button ref={ref} className={className} onClick={onClick} type="button">
      {text}
    </button>
  );
});

export default Button;
