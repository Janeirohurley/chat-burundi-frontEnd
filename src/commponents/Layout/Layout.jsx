import React from 'react';
import Routers from '../../routers/Routers';
import Header from '../Header/Header';
const Layout = () => {
  return (
    <div>
      <Header/>
      <Routers />
    </div>
  );
};
export default Layout;