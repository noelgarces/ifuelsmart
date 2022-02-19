import cn from "classnames";

const Input = ({ label, type, placeholder, className, ...rest }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
        {label}
      </label>
      <input
        className={cn(
          "block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none",
          { [className]: className }
        )}
        id={label}
        type={type}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
};

export default Input;
