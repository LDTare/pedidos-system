"use client";
import { useRef } from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Example = () => {
  const ref = useRef();
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <div className="h-screen w-screen bg-black">
      <Parallax pages={3} ref={ref}>

        <ParallaxLayer offset={0} speed={1} className="bg-blue-950" />

        <ParallaxLayer
          offset={0}
          speed={2.5}
          onClick={() => ref.current.scrollTo(1)}
        >
          <div>
            <img
              src="https://res.cloudinary.com/dum1doueq/image/upload/v1717458820/BG-WEB/carrete-multicolor-cerca-fondo-hilo-coser-generado-ia_zgagps.png"
              alt=""
              className="absolute inset-0 z-0 w-full h-full"
            />
            <div className=" bg-zinc-300/30 relative z-10 my-80 mx-80 p-40 text-center">
              <p className="text-white font-bold text-5xl">La Puntada Dorada</p>
            </div>
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={1} className="bg-blue-950" />
        <ParallaxLayer
          offset={1}
          speed={2}
          onClick={() => ref.current.scrollTo(2)}
        >
          <div className="text-center my-28 w-full h-full">
            <p className="text-white font-bold text-5xl my-5">Servicios </p>
            <Carousel
              plugins={[plugin.current]}
              className="w-full max-w-lg mx-auto bg-transparent"
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
            >
              <CarouselContent className="bg-transparent">
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem key={index}>
                    <div>
                      <Card className="bg-transparent">
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <span className="text-4xl font-semibold text-slate-50">
                            ITEM: {index + 1}
                          </span>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={2}
          speed={1}
          onClick={() => ref.current.scrollTo(0)}
        >
          <div className=" flex flex-col justify-center items-center bg-slate-400/20 w-full h-full">
            <div className="text-center my-28 max-w-3xl">
              <p className="text-white font-bold text-5xl my-5">Contacto </p>
              <Card className=" bg-transparent">
                <CardHeader>
                  <p className="text-white font-bold text-4xl">
                    La Puntada Dorada
                  </p>
                </CardHeader>
                <CardContent>
                  <div className=" flex">
                    <div className=" text-left p-5 border">
                      <p className="text-white font-semibold text-2xl">
                        Direccion
                      </p>
                      <p className="text-white text-lg">
                        Calle 5 de Mayo # 123, Colonia Centro, Ciudad de Mexico
                      </p>
                      <p className="text-white text-lg">
                        Telefono: 55 1234 5678
                      </p>
                    </div>
                    <div className=" text-left p-5 border">
                      <p className="text-white font-semibold text-2xl">
                        Direccion
                      </p>
                      <p className="text-white text-lg">
                        Calle 5 de Mayo # 123, Colonia Centro, Ciudad de Mexico
                      </p>
                      <p className="text-white text-lg">
                        Telefono: 55 1234 5678
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className=" max-w-60 max-h-60 rounded-lg">
              <img className=" rounded-xl" src="/la-puntada-dorada.jpg" alt="" />
            </div>
          </div>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
};
export default Example;
