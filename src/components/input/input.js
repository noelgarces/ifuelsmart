const Input = ({ label, type, placeholder, ...rest }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
        {label}
      </label>
      <input
        className="block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none"
        id={label}
        type={type}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
};

export default Input;
