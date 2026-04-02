import React from 'react';
import { Image } from 'antd';



const AuthUi: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  return (
    <div
      className="min-h-screen px-5 md:px-0 "
      style={{
        // backgroundImage: 'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80)',
        // backgroundImage: `url(${BANNER_BG_IMG})`,
        backgroundColor: '#206909',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >

      <div
        className=" md:absolute md:top-10 md:left-10 pt-[5rem] md:pt-0 pb-[5rem] md:pb-0 w-full md:w-fit justify-center flex"
      >
        <Image
          src={"https://scontent.whatsapp.net/v/t39.8562-34/506621364_1915265769249654_4139957783204919961_n.svg?ccb=1-7&_nc_sid=73b08c&_nc_ohc=hlBSgEAKDFYQ7kNvwFiEwMy&_nc_oc=Adon9MszrELgISCDU2lboe1ttVcW-zb_cqIw1IoPFU3u0Kcb9xmtW-D8ZoNyDjM6NRw76Mpcu7360uLyN0L0kP1n&_nc_zt=3&_nc_ht=scontent.whatsapp.net&_nc_gid=v8oLOjPmjRBVDHCxyziWKg&_nc_ss=7a389&oh=01_Q5Aa4AEDBhn4V1Pg-WdHohW80oWiEsDeIPE9FrEF5oXGnWqJsA&oe=69D41C97"}
          alt="SITE logo"
          className="w-20 h-20"
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
        {/* <h2 className="text-white font-light">event logistics</h2> */}
      </div>
    </div >
  );
};

export default AuthUi; 