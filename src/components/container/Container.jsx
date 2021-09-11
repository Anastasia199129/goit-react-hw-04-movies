import PropTypes from 'prop-types';

const Container = ({ children }) => {
  return <section>{children}</section>;
};

Container.propTypes = {
  children: PropTypes.any,
};

export default Container;
