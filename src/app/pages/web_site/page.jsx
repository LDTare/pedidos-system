"use client";
import { useRef } from 'react';
import { Parallax, ParallaxLayer } from '@react-spring/parallax'

const Example = () => {
  const ref = useRef()
  return (
    <div className="h-screen w-screen bg-black">
      <Parallax pages={3} ref={ref}>
        <ParallaxLayer offset={0} speed={1} style={{ backgroundColor: '#805E73' }} />
        <ParallaxLayer offset={0} speed={2.5}>
          <img
            src="https://res.cloudinary.com/dum1doueq/image/upload/v1717403692/BG-WEB/203514_wzxwko.jpg"
            alt=""
            className="absolute inset-0 z-0"
          />
          <div className=" bg-zinc-300/30 relative z-10 my-80 mx-80 p-40 text-center">
            <p className="text-white font-bold text-5xl">La Puntada Dorada</p>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={1} style={{ backgroundColor: '#87BCDE' }} />
        <ParallaxLayer offset={2} speed={1} className=' bg-amber-600' />
      </Parallax>
    </div>
  );
}
export default Example
