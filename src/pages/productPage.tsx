import { useEffect, useState, useRef } from 'react';
import { getProducts } from '../services/productService';
import type { Product } from '../types/Product';
import { ProductCard } from '../components/productCard';
import CreateProductModal from '../components/createProductModal';
import { SlOptionsVertical } from 'react-icons/sl';
import { CATEGORIES } from '../utils/categories';
import {
  fetchByName,
  fetchByCategory,
  filterByPrice,
  filterByPriceRange,
  clearFilters
} from '../services/filtroService';

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [modalCreateOpen, setModalCreateOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchType, setSearchType] = useState<'nome' | 'categoria' | 'atePreco' | 'intervaloPreco'>('nome');
  const [searchValue, setSearchValue] = useState('');
  const [searchRange, setSearchRange] = useState({ min: '', max: '' });
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);
  const inputCategoriaRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getProducts()
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (searchType === 'categoria') {
      if (searchValue.trim() === '') {
        setFilteredCategories(CATEGORIES);
      } else {
        setFilteredCategories(
          CATEGORIES.filter((cat) =>
            cat.toLowerCase().includes(searchValue.trim().toLowerCase())
          )
        );
      }
    }
  }, [searchValue, searchType]);

  const handleClear = () => {
    setSearchValue('');
    setSearchRange({ min: '', max: '' });
    setSearchType('nome');
    setFilteredProducts(products);
    setSidebarOpen(false);
  };

  return (
    <>
      <CreateProductModal
        open={modalCreateOpen}
        onClose={() => setModalCreateOpen(false)}
        onProductCreated={(newProd) => {
          setProducts((prev) => [...prev, newProd]);
          setFilteredProducts((prev) => [...prev, newProd]);
          setModalCreateOpen(false);
        }}
      />

      <button
        className="lg:hidden fixed top-20 right-4 bg-gray-200 p-2 rounded-full shadow-md z-50"
        onClick={() => setSidebarOpen((prev) => !prev)}
      >
        <SlOptionsVertical />
      </button>

      <div
        className={`fixed top-20 left-0 z-40 bg-gray-100 p-4 py-[2rem] w-72 h-[calc(100vh-5rem)] shadow-md transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        <button
          onClick={() => setModalCreateOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold w-full py-2 rounded mb-4"
        >
          Adicionar Produto
        </button>

        <hr className="my-2 border-gray-400" />

        <h2 className="font-semibold text-gray-700 mb-2">Filtro de busca</h2>

        <select
          className="w-full border rounded px-2 py-1 mb-2"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value as any)}
        >
          <option value="nome">Nome</option>
          <option value="categoria">Categoria</option>
          <option value="atePreco">Até um preço</option>
          <option value="intervaloPreco">Entre dois preços</option>
        </select>

        {searchType === 'nome' && (
          <input
            type="text"
            placeholder="Digite o nome..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full border rounded px-2 py-1 mb-2"
          />
        )}

        {searchType === 'categoria' && (
          <div className="relative mb-2" ref={inputCategoriaRef}>
            <input
              type="text"
              placeholder="Digite a categoria..."
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
              className="w-full border rounded px-2 py-1"
              autoComplete="off"
            />
            {showDropdown && filteredCategories.length > 0 && (
              <ul className="absolute z-20 max-h-40 w-full overflow-auto rounded border border-gray-300 bg-white shadow-md">
                {filteredCategories.map((cat) => (
                  <li
                    key={cat}
                    onClick={() => {
                      setSearchValue(cat);
                      setShowDropdown(false);
                    }}
                    className="cursor-pointer px-3 py-2 hover:bg-gray-200"
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {searchType === 'atePreco' && (
          <input
            type="number"
            placeholder="Até R$..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full border rounded px-2 py-1 mb-2"
          />
        )}

        {searchType === 'intervaloPreco' && (
          <div className="flex gap-2 mb-2">
            <input
              type="number"
              placeholder="De R$"
              value={searchRange.min}
              onChange={(e) =>
                setSearchRange({ ...searchRange, min: e.target.value })
              }
              className="w-1/2 border rounded px-2 py-1"
            />
            <input
              type="number"
              placeholder="Até R$"
              value={searchRange.max}
              onChange={(e) =>
                setSearchRange({ ...searchRange, max: e.target.value })
              }
              className="w-1/2 border rounded px-2 py-1"
            />
          </div>
        )}

        <div className="flex gap-2">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white w-1/2 py-2 rounded"
            onClick={async () => {
              try {
                if (searchType === 'nome' && searchValue.trim()) {
                  const data = await fetchByName(searchValue.trim());
                  setFilteredProducts(data);
                } else if (searchType === 'categoria' && searchValue.trim()) {
                  const data = await fetchByCategory(searchValue.trim());
                  setFilteredProducts(data);
                } else if (searchType === 'atePreco' && searchValue.trim()) {
                  const max = parseFloat(searchValue.replace(',', '.'));
                  setFilteredProducts(filterByPrice(products, max));
                } else if (
                  searchType === 'intervaloPreco' &&
                  searchRange.min &&
                  searchRange.max
                ) {
                  const min = parseFloat(searchRange.min.replace(',', '.'));
                  const max = parseFloat(searchRange.max.replace(',', '.'));
                  setFilteredProducts(filterByPriceRange(products, min, max));
                } else {
                  setFilteredProducts(products);
                }
                setSidebarOpen((prev) => !prev);
              } catch (error) {
                console.log(`Erro ao filtrar: ${error}`);
              }
            }}
          >
            Filtrar
          </button>
          <button
            className="bg-red-600 hover:bg-red-700 text-white w-1/2 py-2 rounded"
            onClick={handleClear}
          >
            Limpar
          </button>
        </div>
      </div>

      <div className="lg:ml-72 p-6 pt-[8rem] bg-gray-50 min-h-screen">
        <div className="flex flex-wrap gap-6 justify-center">
          {filteredProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onDelete={(id) => {
                setProducts((prev) => prev.filter((x) => x.id !== id));
                setFilteredProducts((prev) => prev.filter((x) => x.id !== id));
              }}
              onUpdate={(updated) => {
                setProducts((prev) =>
                  prev.map((p) => (p.id === updated.id ? updated : p))
                );
                setFilteredProducts((prev) =>
                  prev.map((p) => (p.id === updated.id ? updated : p))
                );
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
