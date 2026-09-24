import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PlacementFilters from './Components/PlacementFilters';
import JobCards from './JobCards/JobCards';
import Products from './Products/Products';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/jobs" element={<JobCards />} />
        <Route path="/placements" element={<PlacementFilters />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;