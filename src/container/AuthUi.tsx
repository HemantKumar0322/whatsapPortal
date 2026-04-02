import React from 'react';
import { Image } from 'antd';

import { SITE_LOGO_IMG, BANNER_BG_IMG } from '@/utils/image';

const AuthUi: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  return (
    <div
      className="min-h-screen px-5 md:px-0 "
      style={{
        // backgroundImage: 'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80)',
        backgroundImage: `url(${BANNER_BG_IMG})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >

      <div
        className=" md:absolute md:top-10 md:left-10 pt-[5rem] md:pt-0 pb-[5rem] md:pb-0 w-full md:w-fit justify-center flex"
      >
        <Image
          src={SITE_LOGO_IMG}
          alt="SITE logo"
          className="w-10 h-10"
          preview={false}
          loading="lazy"
        />
      </div>


      <div
        className=" md:absolute md:top-0 md:right-0 md:h-screen md:w-[25rem] md:max-w-[25rem] md:flex md:items-center md:pr-[2rem] md:py-[0.5rem] "
      >
        {children}
      </div>

      <div
        className=" md:absolute md:bottom-10 md:left-10 text-3xl relative flex flex-col pt-[5rem] pb-[5rem] md:pb-0  md:pt-0  !w-fit "
      >
        <h2 className="text-white font-light mb-2">
          Your <span className="font-bold">Partner</span> for <span className="font-bold">worldwide</span>
        </h2>
        <h2 className="text-white font-light">event logistics</h2>
      </div>



    </div >
  );
};

export default AuthUi; 