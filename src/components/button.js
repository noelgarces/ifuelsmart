import PropTypes from "prop-types";
import cn from "classnames";

const Button = ({ loading, children, variant, ...rest }) => {
  const color = {
    orange: "bg-orange-600 hover:bg-orange-700 text-white",
    lightGray: "bg-gray-300 hover:bg-gray-400 text-gray-800",
  }[variant];

  return (
    <button
      type="submit"
      className={cn("font-bold py-2 px-4 rounded w-full transition-colors duration-300 ease-in-out", color)}
      {...rest}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Processing
        </>
      ) : (
        children
      )}
    </button>
  );
};

Button.defaultProps = {
  loading: false,
  variant: "orange",
};

Button.propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.node.isRequired,
  variant: PropTypes.string,
};

export default Button;
