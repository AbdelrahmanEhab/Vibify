import icon from '../../public/icon-white.png'
import Image from 'next/image'
import Link from 'next/link'

interface NavProps {
    isHome: boolean;
}

const NavBar : React.FC<NavProps> = ({isHome}) => {
    return (
        <> 
            <div className=' flex items-center justify-center w-full h-full bg-black shadow-xl'>
                <div className="flex items-center justify-between h-full w-full max-w-[1240px] p-5">
                    <div className='select-none flex items-center justify-center gap-5 px-4'>
                        <Image src={icon} alt='' height={50} className=''/>
                    </div>
                    <div className='flex items-center justify-center gap-6 text-grey text-[16px] px-4'>
                        <Link href={'mailto:404.abdelrahman@gmail.com'} target='_blanck' className='hover:text-white duration-50 hover:scale-105'>Contact</Link>
                        <Link href={'https://github.com/AbdelrahmanEhab'} target='_blanck' className='hover:text-white duration-50 hover:scale-105'>GitHub</Link>
                        {!isHome && <Link href={'home'} className='bg-white text-black py-2 px-4 rounded-3xl text-[18px] hover:scale-102 hover:bg-green duration-50 sm:block hidden hover:text-white'>Get Started</Link>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavBar