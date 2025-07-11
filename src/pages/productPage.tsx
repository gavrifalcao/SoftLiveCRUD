import { useEffect, useState } from 'react';
import { getProducts } from '../services/productService';
import type { Product } from '../types/Product';
import { ProductCard } from '../components/productCard';
import CreateProductModal from '../components/createProductModal';

interface ProductPageProps {
  onOpenCreateModal: () => void;
  isModalOpen: boolean;
  onProductCreated: (newProduct: Product) => void;
}

export default function ProductPage({
  onOpenCreateModal,
  isModalOpen,
  onProductCreated,
}: ProductPageProps) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <CreateProductModal
        open={isModalOpen}
        onClose={onOpenCreateModal}
        onProductCreated={(newProd) => {
          setProducts((prev) => [...prev, newProd]);
          onProductCreated(newProd);
        }}
      />

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
    </>
  );
}
