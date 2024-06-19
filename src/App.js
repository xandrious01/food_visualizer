import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'

import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import SearchLayout from './layouts/SearchLayout';
import DisplaySearchResults from './pages/search/DisplaySearchResults';
import DisplayFoodLayout from './layouts/DisplayFoodLayout';
import DisplayFood from './pages/food/DisplayFood';
import CompareFoodsLayout from './layouts/CompareFoodsLayout';
import SavedFoodsLayout from './layouts/SavedFoodsLayout';
import SavedFoods from './pages/SavedFoods';


import './styles/RootLayout.css'


import './App.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<RootLayout />} >
        <Route index element={<Home />} />
        <Route path="search" element={<SearchLayout />}>
          <Route path=":query" 
          element={<DisplaySearchResults />}
          />
        </Route>
        <Route path="food" element={<DisplayFoodLayout />}>
          <Route path=":fdcId" element={<DisplayFood />} />
        </Route>
        <Route path="myfoods" element={<SavedFoodsLayout />}>
          <Route path=":fdcId" element={<DisplayFood />} />
        </Route>
        <Route path="compare" element={<CompareFoodsLayout />}>
        </Route>
      </Route >
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
