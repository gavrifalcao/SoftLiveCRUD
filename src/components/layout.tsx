import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Layout() {
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const isHome = location.pathname === '/';

    return (
        <div>
            <div className="fixed top-0 left-0 w-full h-[6rem] bg-white shadow-md z-50 flex items-center justify-between px-6">
                <h1 className="text-2xl font-bold">SoftLive CRUD</h1>
                <div className="hidden md:flex justify-end items-center gap-6 w-1/2">
                    <Link to="/" className={`text-lg font-medium ${isHome ? 'underline' : ''}`}>Home</Link>
                    <Link to="/produtos" className={`text-lg font-medium ${location.pathname === '/produtos' ? 'underline' : ''}`}>Produtos</Link>
                    <div className="text-lg font-medium cursor-pointer">Sobre</div>
                    <div className="text-lg font-medium cursor-pointer">Contato</div>
                    <button className="bg-[#28A745] hover:bg-[#218838] text-white font-semibold px-4 py-2 rounded transition-colors">
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
                <div className="absolute top-[6rem] left-0 w-full bg-white shadow-md z-40 flex flex-col items-center gap-6 p-6 md:hidden">
                    <Link to="/" onClick={() => setMobileMenuOpen(false)} className={`text-xl font-medium ${isHome ? 'underline' : ''}`}>Home</Link>
                    <Link to="/produtos" onClick={() => setMobileMenuOpen(false)} className={`text-xl font-medium ${location.pathname === '/produtos' ? 'underline' : ''}`}>Produtos</Link>
                    <div className="text-xl font-medium cursor-pointer">Sobre</div>
                    <div className="text-xl font-medium cursor-pointer">Contato</div>
                    {isHome && (
                        <button className="bg-[#28A745] hover:bg-[#218838] text-white font-semibold px-4 py-2 rounded transition-colors">
                            Login
                        </button>
                    )}
                </div>
            )}
            <Outlet />
        </div>
    );
}
