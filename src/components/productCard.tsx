import { useState } from 'react';
import type { Product } from '../types/Product';
import productIcon from '../assets/img/product.svg';
import DeleteProductModal from './deleteProductModal';
import { deleteProduct } from '../services/productService';

interface ProductCardProps {
    product: Product;
    onDelete: (id: string) => void; // callback pra atualizar a lista na UI
}

export function ProductCard({ product, onDelete }: ProductCardProps) {
    const [modalOpen, setModalOpen] = useState(false);

    const handleDelete = async () => {
        console.log('Tentando deletar:', product.id);
        try {
            await deleteProduct(product.id);
            console.log('Produto deletado!');
            onDelete(product.id);
            setModalOpen(false);
        } catch (err) {
            console.error('Erro ao deletar o produto:', err);
            alert('Erro ao deletar o produto');
        }
    };


    return (
        <>
            <div className="flex flex-col gap-2 p-1 px-3 rounded-lg border border-gray-200 bg-white shadow-md hover:shadow-lg w-[15rem] h-[26rem]">
                <div className="relative w-[13rem] h-[13rem] rounded-[1rem] m-[0.5rem] mx-auto block">
                    <img src={productIcon} alt="imagem de produto" className="w-full h-full object-cover rounded-[1rem]" />
                    <p className="absolute bottom-2 right-2 font-semibold text-black-700 px-1 py-0 rounded">
                        R$ {product.preco.toFixed(2)}
                    </p>
                </div>

                <div className="text-left flex flex-col h-full pb-2">
                    <div className="flex-1 space-y-0.5">
                        <p className="text-lg font-semibold text-black">{product.nome}</p>
                        <p className="font-medium text-gray-500">{product.categoria}</p>
                        <p className="text-gray-500">{product.descricao || '--Não há descrição para este produto.--'}</p>
                    </div>

                    <div className="mt-auto flex flex-row justify-between items-center pt-2">
                        <button className="w-10 h-10 rounded-full bg-[#FDBE10] flex items-center justify-center hover:bg-[#E6B800]">
                            <img src="src/assets/img/edit-btn.svg" alt="Editar" className="w-6 h-6" />
                        </button>

                        <button
                            onClick={() => setModalOpen(true)}
                            className="w-10 h-10 rounded-full bg-[#E60000] flex items-center justify-center hover:bg-[#C70000]"
                            aria-label="Deletar"
                        >
                            <img src="src/assets/img/delete-btn.svg" alt="Deletar" className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>

            <DeleteProductModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={handleDelete}
            />
        </>
    );
}
