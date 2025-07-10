import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import type { Product } from '../types/Product';
import { updateProduct } from '../services/productService';
import { CATEGORIES } from '../utils/categories';
import { handlePrecoChange, precoToNumber } from '../services/precoService';

interface EditProductModalProps {
  open: boolean;
  onClose: () => void;
  product: Product;
  onProductUpdated: (updated: Product) => void;
}

export default function EditProductModal({ open, onClose, product, onProductUpdated }: EditProductModalProps) {
  const [nome, setNome] = useState(product.nome);
  const [descricao, setDescricao] = useState(product.descricao);
  const [preco, setPreco] = useState(product.preco.toFixed(2).replace('.', ','));
  const [categoria, setCategoria] = useState(product.categoria);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const inputCategoriaRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (categoria.trim() === '') {
      setFilteredCategories(CATEGORIES);
    } else {
      setFilteredCategories(
        CATEGORIES.filter((cat) =>
          cat.toLowerCase().includes(categoria.trim().toLowerCase())
        )
      );
    }
  }, [categoria]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!nome.trim()) newErrors.nome = 'Nome é obrigatório.';
    if (!preco || precoToNumber(preco) <= 0) newErrors.preco = 'Preço deve ser um número positivo.';
    if (!categoria.trim()) newErrors.categoria = 'Categoria é obrigatória.';
    else if (!CATEGORIES.includes(categoria.trim())) newErrors.categoria = 'Categoria inválida.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await updateProduct(product.id, {
        ...product,
        nome: nome.trim(),
        descricao: descricao.trim(),
        preco: precoToNumber(preco),
        categoria: categoria.trim(),
      });
      onProductUpdated(response.data);
      onClose();
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
    }
  };

  const handleSelectCategoria = (cat: string) => {
    setCategoria(cat);
    setShowDropdown(false);
  };

  return (
    <Dialog open={open} onClose={() => { onClose(); setShowDropdown(false); }} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel className="relative transform rounded-lg bg-white text-left shadow-xl sm:my-8 sm:w-full sm:max-w-lg transition-all">
            <form onSubmit={handleSubmit} autoComplete="off">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 space-y-4">
                <DialogTitle as="h3" className="text-lg font-semibold text-gray-900">
                  Adicionar Produto
                  <p className="text-left text-sm text-gray-500 mt-1">Preencha os campos abaixo para editar o produto. Os campos marcados com asterisco * são de preenchimento obrigatório.</p>
                </DialogTitle>

                {/* Nome */}
                <div>
                  <input
                    type="text"
                    placeholder="Nome *"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className={`w-full border rounded px-3 py-2 ${errors.nome ? 'border-red-500' : 'border-gray-300'
                      }`}
                  />
                  {errors.nome && (
                    <p className="text-sm text-red-600 mt-1">{errors.nome}</p>
                  )}
                </div>

                {/* Descrição */}
                <div>
                  <textarea
                    placeholder="Descrição"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    maxLength={70}
                    className="w-full border rounded px-3 py-2 border-gray-300"
                  />
                  <p className="text-right text-sm text-gray-500 mt-1">{descricao.length}/70</p>
                </div>

                {/* Preço */}
                <div>
                  <input
                    type="text"
                    placeholder="Preço * (ex: 1.234,56)"
                    value={preco}
                    onChange={(e) => handlePrecoChange(e.target.value, setPreco)}
                    className={`w-full border rounded px-3 py-2 ${errors.preco ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.preco && (
                    <p className="text-sm text-red-600 mt-1">{errors.preco}</p>
                  )}
                </div>

                {/* Categoria */}
                <div className="relative" ref={inputCategoriaRef}>
                  <input
                    type="text"
                    placeholder="Categoria *"
                    value={categoria}
                    onChange={(e) => {
                      setCategoria(e.target.value);
                      setShowDropdown(true);
                    }}
                    onFocus={() => setShowDropdown(true)}
                    onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                    className={`w-full border rounded px-3 py-2 ${errors.categoria ? 'border-red-500' : 'border-gray-300'
                      }`}
                    autoComplete="off"
                  />
                  {showDropdown && filteredCategories.length > 0 && (
                    <ul className="absolute z-20 max-h-40 w-full overflow-auto rounded border border-gray-300 bg-white shadow-md">
                      {filteredCategories.map((cat) => (
                        <li
                          key={cat}
                          onClick={() => handleSelectCategoria(cat)}
                          className="cursor-pointer px-3 py-2 hover:bg-gray-200"
                        >
                          {cat}
                        </li>
                      ))}
                    </ul>
                  )}
                  {errors.categoria && (
                    <p className="text-sm text-red-600 mt-1">{errors.categoria}</p>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button type="submit"
                  className="inline-flex w-full justify-center rounded-md bg-[#28A745] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#218838] sm:ml-3 sm:w-auto">
                  Salvar
                </button>
                <button type="button" onClick={() => { onClose(); setShowDropdown(false); setErrors({}); }}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto">
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
