"use client";
import React, { useState, useEffect } from "react";
import { Book, Heart, Star, Sparkles, Quote } from "lucide-react";
import { BackgroundVariantProps, getVariantClasses } from "@/lib/styles";
import { IVersiculoDoDia } from "@/insfractucture/interfaces/versiculos-do-dias/versiculos-do-dias.interfaces";

// Helper para mapear el type del backend a un emoji
const getEmojiByType = (type?: string): string => {
  const emojiMap: Record<string, string> = {
    amor: "💝",
    "amor de deus": "💝",
    forca: "💪",
    "força": "💪",
    protecao: "🐑",
    "proteção": "🐑",
    confianca: "🙏",
    "confiança": "🙏",
    fe: "✨",
    "fé": "✨",
    esperanca: "🌟",
    "esperança": "🌟",
    graca: "🕊️",
    "graça": "🕊️",
    paz: "☮️",
    sabedoria: "📖",
    coragem: "🦁",
    gratidao: "🙌",
    "gratidão": "🙌",
  };
  return emojiMap[type?.toLowerCase().trim() || ""] || "📖";
};

interface VersiculoDelDiaProps extends BackgroundVariantProps {
  versiculo?: IVersiculoDoDia | null;
}

export const VersiculoDelDia = ({
  backgroundVariant = "dark",
  versiculo,
}: VersiculoDelDiaProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const { background, text, subtext, isDark, overlay } =
    getVariantClasses(backgroundVariant);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Si no hay versículo del backend, no renderizamos la sección
  if (!versiculo) return null;

  const tema = versiculo.type || "Palavra de Deus";
  const emoji = getEmojiByType(versiculo.type);

  return (
    <section className={`py-20 ${background} relative overflow-hidden`}>
      {/* Decoración de fondo animada */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-church-gold-400 rounded-full animate-pulse"></div>
        <div
          className="absolute bottom-10 right-10 w-24 h-24 bg-church-blue-400 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/4 w-16 h-16 bg-church-red-400 rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/4 right-1/4 w-20 h-20 bg-church-sky-400 rounded-full animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      {/* Pattern de fondo sutil */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${isDark ? "white" : "#1e40af"} 1px, transparent 0)`,
          backgroundSize: "20px 20px",
        }}
      ></div>

      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Header animado */}
        <div
          className={`mb-12 transition-all duration-1000 ease-out ${
            isLoaded
              ? "transform translate-y-0 opacity-100"
              : "transform translate-y-8 opacity-0"
          }`}
        >
          <div className="flex justify-center mb-6">
            <div className="relative bg-church-gold-500 rounded-full p-4 shadow-2xl">
              <Book className="w-10 h-10 text-white" />
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-church-red-500 rounded-full flex items-center justify-center animate-bounce">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-church-blue-500 rounded-full flex items-center justify-center">
                <Star className="w-3 h-3 text-white" />
              </div>
              <div className="absolute top-0 left-0 w-full h-full bg-church-gold-400 rounded-full animate-ping opacity-75"></div>
            </div>
          </div>

          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${text}`}>
            <span className="text-church-gold-400">Versículo</span> do Dia
          </h2>

          <div
            className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${overlay} backdrop-blur-sm`}
          >
            <span className="text-2xl">{emoji}</span>
            <span className={`text-sm font-medium ${subtext}`}>{tema}</span>
          </div>
        </div>

        {/* Contenido del versículo */}
        <div
          className={`max-w-4xl mx-auto transition-all duration-1000 ease-out delay-300 ${
            isLoaded
              ? "transform translate-y-0 opacity-100"
              : "transform translate-y-12 opacity-0"
          }`}
        >
          <div className="relative mb-8">
            <div className="absolute -top-4 -left-4 w-16 h-16 text-church-gold-400 opacity-50">
              <Quote className="w-full h-full" />
            </div>

            <blockquote
              className={`text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed italic ${text}`}
              style={{
                textShadow: isDark ? "2px 2px 4px rgba(0,0,0,0.3)" : "none",
              }}
            >
              &ldquo;{versiculo.descriptions}&rdquo;
            </blockquote>

            <div className="absolute -bottom-4 -right-4 w-16 h-16 text-church-gold-400 opacity-50 transform rotate-180">
              <Quote className="w-full h-full" />
            </div>
          </div>

          <div>
            <cite
              className={`inline-flex items-center space-x-3 px-6 py-4 rounded-xl ${
                isDark
                  ? "bg-church-blue-700/50 border border-church-blue-600"
                  : "bg-white/80 border border-church-gold-200"
              } backdrop-blur-sm shadow-lg not-italic`}
            >
              <div className="w-8 h-8 bg-church-gold-500 rounded-full flex items-center justify-center">
                <Book className="w-4 h-4 text-white" />
              </div>
              <span
                className={`text-xl md:text-2xl font-semibold ${
                  isDark ? "text-church-gold-300" : "text-church-blue-800"
                }`}
              >
                — {versiculo.name}
              </span>
            </cite>
          </div>
        </div>

        {/* Elementos decorativos */}
        <div
          className={`mt-16 transition-all duration-1000 ease-out delay-500 ${
            isLoaded
              ? "transform translate-y-0 opacity-100"
              : "transform translate-y-8 opacity-0"
          }`}
        >
          <div className="flex justify-center items-center space-x-8">
            <div className="flex items-center space-x-2">
              <Sparkles
                className={`w-5 h-5 ${isDark ? "text-church-gold-400" : "text-church-blue-500"}`}
              />
              <span className={`text-sm ${subtext}`}>Palavra Viva</span>
            </div>
            <div className="w-px h-8 bg-church-gold-300"></div>
            <div className="flex items-center space-x-2">
              <Heart
                className={`w-5 h-5 ${isDark ? "text-church-red-400" : "text-church-red-500"}`}
              />
              <span className={`text-sm ${subtext}`}>Para Sua Vida</span>
            </div>
            <div className="w-px h-8 bg-church-gold-300"></div>
            <div className="flex items-center space-x-2">
              <Star
                className={`w-5 h-5 ${isDark ? "text-church-sky-400" : "text-church-blue-500"}`}
              />
              <span className={`text-sm ${subtext}`}>Cada Dia</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};