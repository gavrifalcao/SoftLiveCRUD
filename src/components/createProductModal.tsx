import { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { createProduct } from '../services/productService';
import type { Product } from '../types/Product';

interface CreateProductModalProps {
  open: boolean;
  onClose: () => void;
  onProductCreated: (newProduct: Product) => void;
}

export default function CreateProductModal({ open, onClose, onProductCreated }: CreateProductModalProps) {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [categoria, setCategoria] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !categoria || Number(preco) <= 0) {
      alert('Preencha os campos obrigatórios corretamente.');
      return;
    }

    try {
      const response = await createProduct({
        nome,
        descricao,
        preco: Number(preco),
        categoria,
      });
      onProductCreated(response.data);
      onClose();
      setNome('');
      setDescricao('');
      setPreco('');
      setCategoria('');
    } catch (error) {
      console.error('Erro ao criar produto:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl sm:my-8 sm:w-full sm:max-w-lg transition-all">
            <form onSubmit={handleSubmit}>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 space-y-4">
                <DialogTitle as="h3" className="text-lg font-semibold text-gray-900">
                  Adicionar Produto
                </DialogTitle>

                <input
                  type="text"
                  placeholder="Nome *"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  required
                />

                <textarea
                  placeholder="Descrição"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                />

                <input
                  type="number"
                  placeholder="Preço *"
                  value={preco}
                  onChange={(e) => setPreco(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  required
                />

                <input
                  type="text"
                  placeholder="Categoria *"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="submit"
                  className="inline-flex w-full justify-center rounded-md bg-[#28A745] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#218838] sm:ml-3 sm:w-auto"
                >
                  Salvar
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
