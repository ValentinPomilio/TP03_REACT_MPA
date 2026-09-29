import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Favorites } from './pages/Favorites';
import { ItemsLayout } from './pages/ItemsLayout';
import { ItemsList } from './pages/ItemsList';
import { ItemDetail } from './pages/ItemDetail';
import { ItemAbilitiesChild, ItemReviewsChild } from './pages/ItemReviews';
import { NotFound } from './pages/NotFound';

export function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <BrowserRouter>
          <div className="w-full min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
              <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/items" element={<ItemsLayout />}>
                  <Route index element={<ItemsList />} />
                  <Route path=":id" element={<ItemDetail />}>
                    <Route index element={<ItemAbilitiesChild />} />
                    <Route path="resenas" element={<ItemReviewsChild />} />
                  </Route>
                </Route>

                <Route path="/favoritos" element={<Favorites />} />
                <Route path="/home" element={<Navigate to="/" replace />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </FavoritesProvider>
    </ThemeProvider>
  );
}

export default App;