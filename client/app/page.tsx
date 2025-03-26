import NavBar from "./components/NavBar";
import Hero from "./components/Hero";

export const Home : React.FC = () => {
  return (
    <div className="flex flex-col w-full h-full min-h-screen bg-background">
      <NavBar isHome={false}/>
      <Hero/>
    </div>
  );
}

export default Home
