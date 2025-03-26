import { SkipForward, Shuffle, Repeat, Play, MoveUp } from "lucide-react";
import Link from "next/link";

const Controls : React.FC = () => {

    return (
        <>
            <span className="bg-white h-[2px] w-[80%] my-5"></span>  
                <div className="flex items-center justify-center md:gap-15 gap-10">
                    <SkipForward size={35} className="rotate-180"/>
                    <Link href={'home'} className="bg-grey text-background scale-110 lg:p-3 p-2 rounded-4xl hover:bg-green hover:scale-120 cursor-pointer duration-150">
                        <Play size={35} className='ms-[2px]'/>
                    </Link>
                    <SkipForward size={35}/>
                </div>
        </>
    )
}

export default Controls