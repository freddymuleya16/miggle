import React from "react";
import backgroundImage from "../public/img/login-bg.jpg";

function AuthLayout({ children }) {
  return (
    <div className="bg-cover bg-center h-screen flex items-center justify-center" style={{ backgroundImage: `url(${backgroundImage.src})` }}>
      <div className="container mx-auto  p-0 sm:p-2 bg-[#fff] sm:bg-transparent">
        <div className="flex justify-center h-screen sm:h-fit items-center">
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 ">
            <div className="bg-white sm:shadow-md sm:rounded-md p-8 ">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
