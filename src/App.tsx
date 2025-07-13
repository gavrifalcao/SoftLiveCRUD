
import { useState } from 'react';
import ProductPage from './pages/productPage';
import homeImage from './assets/img/crud-home.svg';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'produtos'>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div>
      <div className="fixed top-0 left-0 w-full h-[6rem] bg-white shadow-md z-50 flex items-center justify-between px-6">
        <h1 className="text-2xl font-bold">SoftLive CRUD</h1>
        <div className="hidden md:flex justify-end items-center gap-6 w-1/2">
          <div
            className={`text-lg font-medium cursor-pointer ${currentPage === 'home' ? 'underline' : ''}`}
            onClick={() => setCurrentPage('home')}
          >
            Home
          </div>
          <div
            className={`text-lg font-medium cursor-pointer ${currentPage === 'produtos' ? 'underline' : ''}`}
            onClick={() => setCurrentPage('produtos')}
          >
            Produtos
          </div>
          <div className="text-lg font-medium cursor-pointer">Sobre</div>
          <div className="text-lg font-medium cursor-pointer">Contato</div>
          <button
            className={`bg-[#28A745] hover:bg-[#218838] text-white font-semibold px-4 py-2 rounded transition-colors ${currentPage === 'home' ? 'visible' : 'invisible'
              }`}
          >
            Login
          </button>
        </div>
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? (
              <XMarkIcon className="w-8 h-8 text-gray-800" />
            ) : (
              <Bars3Icon className="w-8 h-8 text-gray-800" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="absolute top-[6rem] left-0 w-full bg-white shadow-md z-40 flex flex-col items-center gap-4 p-6 md:hidden">
          <div
            className={`text-xl font-medium cursor-pointer ${currentPage === 'home' ? 'underline' : ''}`}
            onClick={() => {
              setCurrentPage('home');
              setMobileMenuOpen(false);
            }}
          >
            Home
          </div>
          <div
            className={`text-xl font-medium cursor-pointer ${currentPage === 'produtos' ? 'underline' : ''}`}
            onClick={() => {
              setCurrentPage('produtos');
              setMobileMenuOpen(false);
            }}
          >
            Produtos
          </div>
          <div className="text-xl font-medium cursor-pointer">Sobre</div>
          <div className="text-xl font-medium cursor-pointer">Contato</div>
          {currentPage === 'home' && (
            <button className="bg-[#28A745] hover:bg-[#218838] text-white font-semibold px-4 py-2 rounded transition-colors">
              Login
            </button>
          )}

        </div>
      )}

      {currentPage === 'home' ? (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 pt-[6rem]">
          <img src={homeImage} alt="CRUD Home" className="max-w-[600px] w-full" />
        </div>
      ) : (
        <ProductPage />
      )}
    </div>
  );
}
