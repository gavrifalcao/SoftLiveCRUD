import { useEffect, useState } from 'react';
import { getProducts } from './services/productService';
import type { Product } from './types/Product';
import { ProductCard } from './components/productCard';
import CreateProductModal from './components/createProductModal';

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [modalCreateOpen, setModalCreateOpen] = useState(false);

  useEffect(() => {
    getProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <CreateProductModal
        open={modalCreateOpen}
        onClose={() => setModalCreateOpen(false)}
        onProductCreated={(newProd) => setProducts((prev) => [...prev, newProd])}
      />
      <div className="fixed top-0 left-0 w-full h-[6rem] bg-white shadow-md z-50 flex items-center px-6">
        <h1 className="text-2xl font-bold">Lista de Produtos</h1>
        <button onClick={() => setModalCreateOpen(true)} className="ml-auto bg-[#28A745] hover:bg-[#218838] text-white font-semibold px-4 py-2 rounded transition-colors">
          Adicionar Produto
        </button>
      </div>

      <div className="flex flex-wrap gap-8 bg-gray-50 min-h-screen p-[1.5rem] pt-[7.5rem] mx-auto justify-center">
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
    </div>
  );
}
