import "./App.css";
import GameCard from "./components/GameCard";
import Header from "./components/Header";
import Searchbar from "./components/Searchbar";

function App() {

  const handleRef = () => {
    document.getElementById("mySelect").selectedIndex = 0;
  }
  return (
    <div className="App">
      <div className="header d-flex gap-5">
        <Header />
        <Searchbar handleRef={handleRef} />

      </div>
      <GameCard />

    </div>
  );
}

export default App;
