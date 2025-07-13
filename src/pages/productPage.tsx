import { useEffect, useState } from 'react';
import { getProducts } from '../services/productService';
import type { Product } from '../types/Product';
import { ProductCard } from '../components/productCard';
import CreateProductModal from '../components/createProductModal';

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [modalCreateOpen, setModalCreateOpen] = useState(false);
  const [searchType, setSearchType] = useState<'nome' | 'categoria' | 'atePreco' | 'intervaloPreco'>('nome');
  const [searchValue, setSearchValue] = useState('');
  const [searchRange, setSearchRange] = useState({ min: '', max: '' });


  useEffect(() => {
    getProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <CreateProductModal
        open={modalCreateOpen}
        onClose={() => setModalCreateOpen(false)}
        onProductCreated={(newProd) => {
          setProducts((prev) => [...prev, newProd]);
          setModalCreateOpen(false);
        }}
      />

      {/* <div className="fixed top-[6rem] left-0 w-full h-[3rem] bg-gray-100 z-40 flex items-center justify-between px-12 shadow-sm">
        <div className='w-full flex items-center gap-4'>
          <select
            className="border rounded px-3 py-2"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="nome">Buscar por nome</option>
            <option value="categoria">Buscar por categoria</option>
            <option value="atePreco">Até X preço</option>
            <option value="intervaloPreco">Entre X e Y preço</option>
          </select>
          {searchType === 'nome' && (
            <input
              type="text"
              placeholder="Digite o nome..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              maxLength={26}
              className="w-96 border rounded px-3 py-2"
            />
          )}
          {searchType === 'categoria' && (
            <input
              type="text"
              placeholder="Digite a categoria..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-96 border rounded px-3 py-2"
            />
          )}
          {searchType === 'atePreco' && (
            <input
              type="number"
              placeholder="Até R$..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-48 border rounded px-3 py-2"
            />
          )}
          {searchType === 'intervaloPreco' && (
            <>
              <input
                type="number"
                placeholder="De R$"
                value={searchRange.min}
                onChange={(e) =>
                  setSearchRange({ ...searchRange, min: e.target.value })
                }
                className="w-32 border rounded px-3 py-2"
              />
              <span className="text-gray-600">a</span>
              <input
                type="number"
                placeholder="Até R$"
                value={searchRange.max}
                onChange={(e) =>
                  setSearchRange({ ...searchRange, max: e.target.value })
                }
                className="w-32 border rounded px-3 py-2"
              />
            </>
          )}
        </div>

        <button
          onClick={() => setModalCreateOpen(true)}
          className="bg-[#28A745] hover:bg-[#218838] text-white font-semibold px-4 py-1.5 rounded transition-colors"
        >
          Adicionar Produto
        </button>
      </div> */}

      <div className="flex flex-wrap gap-8 bg-gray-50 min-h-screen p-[1.5rem] pt-[9.5rem] mx-auto justify-center">
        <button
          onClick={() => setModalCreateOpen(true)}
          className="bg-[#28A745] hover:bg-[#218838] text-white font-semibold px-4 py-1.5 rounded transition-colors h-[3rem]"
        >
          Adicionar Produto
        </button>
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onDelete={(id) => setProducts((prev) => prev.filter((x) => x.id !== id))}
            onUpdate={(updated) =>
              setProducts((prev) =>
                prev.map((p) => (p.id === updated.id ? updated : p))
              )
            }
          />
        ))}
      </div>
    </>
  );
}
