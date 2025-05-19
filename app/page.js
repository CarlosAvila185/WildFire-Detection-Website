import Image from "next/image";
import MapLoader from "./components/MapLoader";
import KamloopsMap from "./components/KamloopsMap";


export default function Home() {
  return (<div className="min-h-screen flex flex-col gap-[60px] items-center bg-gradient-to-l from-rose-55 to-red-900">
        <br></br>
        {/* <Image
          className="dark:invert w-full max-w-3xl h-[100px] mx-auto"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        /> */}
        <h2 className=" self-center mx-auto text-5xl text-center">Wildfire Detection System</h2>
        <div className="h-full w-full">
        <MapLoader/>
        
        </div>
      </div>
  );
}

