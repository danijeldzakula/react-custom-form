function withAuthCheck(WrappedComponent) {
    return function EnhancedComponent(props) {

      // eslint-disable-next-line react/prop-types
      const { isLoggedIn, ...rest } = props;
  
      if (!isLoggedIn) {
        return <div>Please log in to continue.</div>;
      }
  
      return <WrappedComponent {...rest} title="I am an extra prop!" />;
    };
  }
  
  // eslint-disable-next-line react/prop-types
  function MyComponent({ title }) {
    console.log('re render');

    return <div>{title}</div>;
  }
  
  const EnhancedMyComponent = withAuthCheck(MyComponent);
  
  export default EnhancedMyComponent;