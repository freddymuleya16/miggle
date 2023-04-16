import React, { useState } from "react";
import { withoutAuth } from "../utils/withAuth";
import backgroundImage from '../public/img/login-bg.jpg';
import { useRouter } from "next/router";

const WelcomeAnimation = () => {
  const router = useRouter();

  return (
    <div className="bg-image" style={{ backgroundImage: `url(${backgroundImage.src})` }} >
      <div style={{ opacity: 0.5, background: "black" }}>
        <div className={`welcome-screen`}>
          <h1>Welcome to Mingle</h1>
          <p className="h6 text-center">Welcome to Mingle, the place where love meets happiness! Join our community of like-minded individuals and find your perfect match today.</p>
          <div className="row mt-3">
            <button className="btn btn-info mr-2" onClick={() => router.push('auth/login')}>Login</button>
            <button className="btn btn-light" onClick={() => router.push('auth/signup')}>Sign Up</button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default withoutAuth(WelcomeAnimation);
