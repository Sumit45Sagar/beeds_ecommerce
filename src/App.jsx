import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { QuickToast } from './components/QuickToast';
import { ScrollExperience } from './components/ScrollExperience';

// Pages
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { StudioBuilderPage } from './pages/StudioBuilderPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { WishlistPage } from './pages/WishlistPage';
import { InfoPages } from './pages/InfoPages';
import { AuthPage } from './pages/AuthPage';

const MainRouter = () => {
  const { currentPage } = useShop();

  switch (currentPage) {
    case 'home':
      return <HomePage />;
    case 'crystals':
      return <CategoryPage houseId="crystals" />;
    case 'rudraksha':
      return <CategoryPage houseId="rudraksha" />;
    case 'gemstones':
      return <CategoryPage houseId="gemstones" />;
    case 'shop-all':
    case 'collections':
      return <CategoryPage houseId="shop-all" />;
    case 'zodiac':
      return <CategoryPage houseId="crystals" />;
    case 'flash-sale':
      return <CategoryPage houseId="flash-sale" />;
    case 'studio':
      return <StudioBuilderPage />;
    case 'product':
      return <ProductDetailPage />;
    case 'checkout':
    case 'bag':
      return <CheckoutPage />;
    case 'wishlist':
      return <WishlistPage />;
    case 'login':
      return <AuthPage mode="login" />;
    case 'signup':
      return <AuthPage mode="signup" />;
    case 'account':
      return <AuthPage mode="account" />;
    case 'journal':
      return <InfoPages type="journal" />;
    case 'about':
      return <InfoPages type="about" />;
    case 'faq':
      return <InfoPages type="faq" />;
    case 'shipping':
    case 'returns':
    case 'exchanges':
    case 'refunds':
    case 'privacy':
    case 'terms':
    case 'grievance':
      return <InfoPages type="shipping" />;
    default:
      return <HomePage />;
  }
};

function AppContent() {
  const { currentPage } = useShop();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#12091E' }}>
      <Header />
      <main style={{ flexGrow: 1 }}>
        <MainRouter />
      </main>
      <Footer />
      <CartDrawer />
      <QuickToast />
      <ScrollExperience />
    </div>
  );
}

export function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}

export default App;
