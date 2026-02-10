import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

// Lazy loading components
const Home = React.lazy(() => import('./pages/Home'));
const Categories = React.lazy(() => import('./pages/Categories'));
const CategoryDetail = React.lazy(() => import('./pages/CategoryDetail'));
const ItemDetail = React.lazy(() => import('./pages/ItemDetail'));
const Booking = React.lazy(() => import('./pages/Booking'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="loading">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="categories" element={<Categories />} />
            <Route path="categories/:slug" element={<CategoryDetail />} />
            <Route path="details/:id" element={<ItemDetail />} />
            <Route path="booking" element={<Booking />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
