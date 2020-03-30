import React from 'react';

import { SpinnerContainer, SpinnerOverlay } from './with-spinner.styles';

///> Function that takes a component (WrappedComponent)
const WithSpinner = WrappedComponent => {
  const Spinner = ( {isLoading, ...otherProps }) => {
    return isLoading ? (
      <SpinnerOverlay>
        <SpinnerContainer />
      </SpinnerOverlay>
    ) : (
      <WrappedComponent {...otherProps} />
    );
  };
  return Spinner;
};

export default WithSpinner;