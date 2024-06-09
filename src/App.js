import { Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Searchbar from './components/Searchbar';
import Home from './pages/Home';
import SavedFoods from './pages/SavedFoods';
import Compare from './pages/Compare';
import Food from './pages/Food';
import BrowseFoods from './pages/BrowseFoods';
import Search from './pages/Search';


import './App.css';

function App() {
  return (
    <div className="container">
      <div className="nav-div col-3">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/myfoods" element={<SavedFoods />} />
        <Route path="/foods/browse" element={<BrowseFoods />} />
        <Route path="/foods/:foodId" element={<Food />} />
        <Route path="/compare" element={<Compare />} />
      </Routes>
    </div>
  );
}

export default App;
