import { useState } from 'react';
import type { Product } from './types/Product';
import ProductPage from './pages/ProductPage';
import homeImage from './assets/img/crud-home.svg';

export default function App() {
  const [modalCreateOpen, setModalCreateOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'produtos'>('home');

  const handleOpenCreateModal = () => setModalCreateOpen(true);
  const handleProductCreated = (_: Product) => setModalCreateOpen(false);

  return (
    <div>
      {/* Menu superior fixo */}
      <div className="fixed top-0 left-0 w-full h-[6rem] bg-white shadow-md z-50 flex items-center justify-between px-6">
        <h1 className="text-2xl font-bold w-1/2">SoftLive CRUD</h1>

        <div className="w-1/2 flex justify-end items-center gap-6">
          <div
            className={`text-lg font-medium cursor-pointer ${currentPage === 'home' ? 'underline' : ''
              }`}
            onClick={() => setCurrentPage('home')}
          >
            Home
          </div>
          <div
            className={`text-lg font-medium cursor-pointer ${currentPage === 'produtos' ? 'underline' : ''
              }`}
            onClick={() => setCurrentPage('produtos')}
          >
            Produtos
          </div>
          <div className="text-lg font-medium cursor-pointer">Sobre</div>
          <div className="text-lg font-medium cursor-pointer">Contato</div>

          <button
            onClick={handleOpenCreateModal}
            className={`bg-[#28A745] hover:bg-[#218838] text-white font-semibold px-4 py-2 rounded transition-colors ${currentPage === 'produtos' ? 'visible' : 'invisible'
              }`}
          >
            Adicionar Produto
          </button>

        </div>
      </div>

      {/* Conteúdo da página */}
      {currentPage === 'home' ? (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 pt-[6rem]">
          <img src={homeImage} alt="CRUD Home" className="max-w-[600px] w-full" />
        </div>
      ) : (
        <ProductPage
          isModalOpen={modalCreateOpen}
          onOpenCreateModal={() => setModalCreateOpen(false)}
          onProductCreated={handleProductCreated}
        />
      )}
    </div>
  );
}
