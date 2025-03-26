import { SkipForward, Shuffle, Repeat, Play, MoveUp } from "lucide-react";
import Link from "next/link";


const Hero : React.FC = () => {

    return (
        <>
            <div className='flex items-center justify-center w-full h-full grow relative text-w'>
                <div className="flex flex-col gap-5 items-center justify-center h-full w-full max-w-[1240px] py-5 text-white text-xl lg:text-sm">
                    <div className="lg:text-8xl md:text-7xl text-5xl lg:h-100 h-60 bg-linear-45 from-green from-30% to-white lg:w-[60%] w-[80%] text-background font-bold flex items-center justify-center mb-5 italic rounded-4xl">
                        <h1>Vibify</h1>
                    </div>

                    
                    <div className="lg:w-[60%] w-[80%] flex flex-col items-start justify-center gap-1">
                        <p className="text-[20px]">Choose Songs Matching Your Mood</p>
                        <p className="text-[14px] text-grey">Abdelrahman Ahmed</p>

                    </div>

                    <span className="bg-white h-[2px] lg:w-[60%] w-[80%] my-5"></span>
                    
                    <div className="flex items-center lg:justify-between justify-center gap-10 lg:w-[60%] w-[80%] px-5">
                        <Shuffle size={30} className="lg:block hidden"/>
                        <div className="flex items-center justify-center md:gap-15 gap-10">
                            <SkipForward size={35} className="rotate-180"/>
                            <Link href={'home'} className="bg-grey text-background scale-110 lg:p-3 p-2 rounded-4xl hover:bg-green hover:scale-120 cursor-pointer duration-150">
                                <Play size={35} className='ms-[2px]'/>
                            </Link>
                            <SkipForward size={35}/>
                        </div>
                        <Repeat size={30} className="lg:block hidden"/>
                    </div>
                    <div className='flex flex-col items-center lg:justify-between justify-center gap-3 lg:w-[60%] w-[80%] mt-5 text-lg'>
                        <MoveUp size={35}/>
                        <p>Start Here</p>
                    </div>
                </div>  
            </div>
        </>
    )
}

export default Hero