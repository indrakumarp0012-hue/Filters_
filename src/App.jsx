import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PlacementFilters from './Components/PlacementFilters';
import JobCards from './JobCards/JobCards';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PlacementFilters />} />
        <Route path="/jobs" element={<JobCards />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;