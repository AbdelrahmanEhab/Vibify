import NavBar from "../components/NavBar"
import Search from "../components/Search"

export const Home : React.FC = () => {

    return (
        <>
            <div className="flex flex-col w-full h-full min-h-screen bg-background">
                <NavBar isHome={true}/>
                <Search/>
            </div>
        </>
    )
}

export default Home