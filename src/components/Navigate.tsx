"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Menu, X, Home, Calendar, BookOpen, Volume2, Users, ChevronRight, Heart, Globe } from "lucide-react";

const navItems = [
  { href: "/", label: "Início", icon: Home },
  { href: "/eventos", label: "Atividades", icon: Calendar },
  { href: "/blog", label: "Blogs", icon: BookOpen },
  { href: "/sermones", label: "Sermões", icon: Volume2 },
  { href: "/misioneros", label: "Missionários", icon: Globe },
  { href: "/comunidade", label: "nossa comunidade", icon: Users },
  { href: "/donations", label: "Doações", icon: Heart },
];
export function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Cerrar menú móvil al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  // Cerrar menú al redimensionar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  return (
    <nav className="flex items-center">
      {/* Navegación Desktop */}
      <div className="hidden md:flex items-center space-x-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative group flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105",
                isActive
                  ? "text-white bg-church-gold-500 shadow-lg shadow-church-gold-500/30"
                  : "text-church-blue-700 hover:text-church-blue-900 hover:bg-church-sky-50"
              )}
              onMouseEnter={() => setHoveredItem(item.href)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {/* Ícono */}
              <Icon className={cn(
                "w-4 h-4 transition-all duration-300",
                isActive 
                  ? "text-white" 
                  : "text-church-blue-500 group-hover:text-church-gold-600"
              )} />
              
              {/* Texto */}
              <span className="relative">
                {item.label}
                
                {/* Underline animado para items no activos */}
                {!isActive && (
                  <span className={cn(
                    "absolute -bottom-1 left-0 h-0.5 bg-church-gold-500 transition-all duration-300",
                    hoveredItem === item.href ? "w-full" : "w-0"
                  )} />
                )}
              </span>

              {/* Badge decorativo para item activo */}
              {isActive && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-church-red-500 rounded-full flex items-center justify-center">
                  <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
                </div>
              )}

              {/* Glow effect en hover */}
              {!isActive && hoveredItem === item.href && (
                <div className="absolute inset-0 bg-church-gold-100 rounded-lg -z-10 animate-pulse" />
              )}
            </Link>
          );
        })}

        {/* Separador decorativo */}
        <div className="w-px h-6 bg-church-sky-300 mx-2" />
        
        {/* CTA Button */}
        <Link
          href="/contato"
          className="group flex items-center space-x-2 px-4 py-2 bg-church-blue-500 hover:bg-church-blue-600 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <span>Contato</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>

      {/* Botón de menú móvil */}
      <div className="md:hidden">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className={cn(
            "relative p-2 rounded-lg transition-all duration-300 transform hover:scale-110",
            isMenuOpen 
              ? "bg-church-red-500 text-white shadow-lg" 
              : "bg-church-sky-100 text-church-blue-700 hover:bg-church-sky-200"
          )}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          <div className="relative w-6 h-6">
            <Menu className={cn(
              "absolute inset-0 transition-all duration-300",
              isMenuOpen ? "opacity-0 rotate-180 scale-75" : "opacity-100 rotate-0 scale-100"
            )} />
            <X className={cn(
              "absolute inset-0 transition-all duration-300",
              isMenuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-180 scale-75"
            )} />
          </div>

          {/* Ripple effect */}
          {isMenuOpen && (
            <div className="absolute inset-0 bg-church-red-400 rounded-lg animate-ping opacity-75" />
          )}
        </button>
      </div>

      {/* Menú móvil */}
      <div className={cn(
        "absolute top-full left-0 right-0 md:hidden transition-all duration-300 transform origin-top",
        isMenuOpen 
          ? "opacity-100 scale-y-100 translate-y-0" 
          : "opacity-0 scale-y-0 -translate-y-2 pointer-events-none"
      )}>
        <div className="bg-white/95 backdrop-blur-lg border border-church-sky-200 rounded-b-xl shadow-2xl mx-4 overflow-hidden">
          {/* Header del menú móvil */}
          <div className="bg-gradient-to-r from-church-blue-500 to-church-gold-500 p-4">
            <p className="text-white font-semibold text-center">Menu de Navegação</p>
          </div>

          {/* Items del menú */}
          <div className="p-2">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] mb-1",
                    isActive
                      ? "bg-church-gold-500 text-white shadow-lg"
                      : "text-church-blue-700 hover:bg-church-sky-50 hover:text-church-blue-900"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                  style={{ 
                    animationDelay: `${index * 50}ms`,
                    animation: isMenuOpen ? 'slideInRight 0.3s ease-out forwards' : 'none'
                  }}
                >
                  {/* Ícono */}
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300",
                    isActive 
                      ? "bg-white/20" 
                      : "bg-church-blue-100 group-hover:bg-church-gold-100"
                  )}>
                    <Icon className={cn(
                      "w-4 h-4",
                      isActive 
                        ? "text-white" 
                        : "text-church-blue-600 group-hover:text-church-gold-600"
                    )} />
                  </div>

                  {/* Texto */}
                  <span className="font-medium flex-1">{item.label}</span>

                  {/* Indicador activo */}
                  {isActive && (
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  )}

                  {/* Flecha para items no activos */}
                  {!isActive && (
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Footer del menú móvil */}
          <div className="bg-church-sky-50 p-4 border-t border-church-sky-200">
            <Link
              href="/contato"
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-church-blue-500 hover:bg-church-blue-600 text-white rounded-lg font-medium transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              <span>Entre em Contato</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
            <p className="text-xs text-church-blue-600 text-center mt-2">
              ✨ Estamos aqui para você
            </p>
          </div>
        </div>
      </div>

      {/* Overlay para cerrar menú móvil */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden"
          style={{ zIndex: -1 }}
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Animaciones CSS */}
      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </nav>
  );
}