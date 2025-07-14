import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout';
import HomePage from './pages/homePage';
import ProductPage from './pages/productPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/produtos" element={<ProductPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
