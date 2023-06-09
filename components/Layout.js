import React, { useEffect, useState } from "react";

import backgroundImage from "../public/img/couple.jpg";

function Layout({ children }) {


  return (
    <div className="bg-cover bg-center min-h-screen flex items-center justify-center" style={{ backgroundImage: `url(${backgroundImage.src})` }}>
      <div className="container sm:mx-auto  p-0 sm:p-2">
        <div className="flex justify-end">
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <div className="bg-white shadow-md sm:rounded-md p-8">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div> 
  );
}

export default Layout;
