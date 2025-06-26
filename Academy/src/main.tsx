import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Gp5Page from './components/GP5Page';

import ChordsGalleryPage from './components/ChordGalleryPage';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/gp5" element={<Gp5Page />} />
      <Route path="/chord" element={<ChordsGalleryPage/>}/>
    </Routes>
  </BrowserRouter>
);
