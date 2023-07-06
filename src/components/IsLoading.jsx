import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

//componente de carga
function Wrapper({ children }) {
  const {
    isLoading,
    error,
  } = useAuth0();
  if (isLoading) {
    return <div id='spinner' className="spinner-border" role="status">
           <span className="sr-only"></span>
  </div>;
  }
  if (error) {
    return <div>Error {error.message}</div>;
  }
  return <>{children}</>;
}
export default Wrapper;