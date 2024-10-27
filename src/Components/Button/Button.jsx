/* eslint-disable react/prop-types */

function Button({ text, className }) {
  return (
    <>
      <button className={className} type="button">
        {text}
      </button>
    </>
  );
}

export default Button;
