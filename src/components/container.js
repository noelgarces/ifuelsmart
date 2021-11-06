import PropTypes from "prop-types";
import cn from "classnames";

const Container = ({ children, className }) => {
  return <div className={cn("container mx-auto h-full px-8", className)}>{children}</div>;
};

Container.defaultProps = {
  className: "",
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Container;
