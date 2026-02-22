"use client";

// app/versiculos/[id]/components/VersiculoDetailSection.tsx

import { useState, useEffect } from "react";
import { Book, Heart, Star, Sparkles, Quote, ArrowLeft } from "lucide-react";
import { IVersiculoResponse } from "@/insfractucture/interfaces/versiculo/versiculo-do-dia.interfaces";

// ─── Helper emoji por tipo ─────────────────────────────────────────────────────

const getEmojiByType = (type?: string | null): string => {
  const emojiMap: Record<string, string> = {
    amor: "💝",
    "amor de deus": "💝",
    forca: "💪",
    força: "💪",
    protecao: "🐑",
    proteção: "🐑",
    confianca: "🙏",
    confiança: "🙏",
    fe: "✨",
    fé: "✨",
    esperanca: "🌟",
    esperança: "🌟",
    graca: "🕊️",
    graça: "🕊️",
    paz: "☮️",
    sabedoria: "📖",
    coragem: "🦁",
    gratidao: "🙌",
    gratidão: "🙌",
    salmos: "🎵",
    promessa: "🌈",
  };
  return emojiMap[type?.toLowerCase().trim() ?? ""] ?? "📖";
};

function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(dateStr));
}

// ─── Props ─────────────────────────────────────────────────────────────────────

interface VersiculoDetailSectionProps {
  versiculo: IVersiculoResponse;
}

// ─── Componente ────────────────────────────────────────────────────────────────

export function VersiculoDetailSection({
  versiculo,
}: VersiculoDetailSectionProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const tema = versiculo.type ?? "Palavra de Deus";
  const emoji = getEmojiByType(versiculo.type);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-church-blue-700 via-church-blue-800 to-church-blue-900 relative overflow-hidden">
      {/* Decoración de fondo animada */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-40 h-40 bg-church-gold-400 rounded-full animate-pulse" />
        <div
          className="absolute bottom-10 right-10 w-28 h-28 bg-church-blue-400 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/4 w-20 h-20 bg-church-red-400 rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/4 right-1/3 w-24 h-24 bg-church-sky-400 rounded-full animate-pulse"
          style={{ animationDelay: "3s" }}
        />
      </div>

      {/* Pattern de puntos */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="container mx-auto px-4 text-center relative z-10 max-w-4xl">
        {/* Header */}
        <div
          className={`mb-12 transition-all duration-1000 ease-out ${
            isLoaded
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          {/* Ícono central */}
          <div className="flex justify-center mb-8">
            <div className="relative bg-church-gold-500 rounded-full p-5 shadow-2xl">
              <Book className="w-10 h-10 text-white" />
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-church-red-500 rounded-full flex items-center justify-center animate-bounce">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-church-blue-500 rounded-full flex items-center justify-center">
                <Star className="w-3 h-3 text-white" />
              </div>
              <div className="absolute inset-0 bg-church-gold-400 rounded-full animate-ping opacity-30" />
            </div>
          </div>

          {/* Título */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            <span className="text-church-gold-400">Versículo</span> do Dia
          </h1>

          {/* Badge de tipo */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <span className="text-2xl">{emoji}</span>
            <span className="text-sm font-medium text-church-sky-200">
              {tema}
            </span>
          </div>
        </div>

        {/* Contenido del versículo */}
        <div
          className={`transition-all duration-1000 ease-out delay-300 ${
            isLoaded
              ? "translate-y-0 opacity-100"
              : "translate-y-12 opacity-0"
          }`}
        >
          {/* Texto */}
          <div className="relative mb-10 px-4 md:px-8">
            <div className="absolute -top-4 -left-2 md:-left-4 w-14 h-14 text-church-gold-400 opacity-40">
              <Quote className="w-full h-full" />
            </div>

            <blockquote
              className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed italic text-white"
              style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}
            >
              &ldquo;{versiculo.descriptions}&rdquo;
            </blockquote>

            <div className="absolute -bottom-4 -right-2 md:-right-4 w-14 h-14 text-church-gold-400 opacity-40 rotate-180">
              <Quote className="w-full h-full" />
            </div>
          </div>

          {/* Referencia bíblica */}
          {versiculo.name && (
            <div className="flex justify-center mb-10">
              <cite className="inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-church-blue-700/50 border border-church-blue-600 backdrop-blur-sm shadow-lg not-italic">
                <div className="w-8 h-8 bg-church-gold-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Book className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl md:text-2xl font-semibold text-church-gold-300">
                  — {versiculo.name}
                </span>
              </cite>
            </div>
          )}

          {/* Fecha de publicación */}
          <p className="text-church-sky-400 text-sm mb-10">
            Publicado em {formatDate(versiculo.publishedAt)}
          </p>

          {/* Decoración footer */}
          <div className="flex justify-center items-center gap-8 flex-wrap">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-church-gold-400" />
              <span className="text-sm text-church-sky-300">Palavra Viva</span>
            </div>
            <div className="w-px h-8 bg-church-gold-600" />
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-church-red-400" />
              <span className="text-sm text-church-sky-300">Para Sua Vida</span>
            </div>
            <div className="w-px h-8 bg-church-gold-600" />
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-church-sky-400" />
              <span className="text-sm text-church-sky-300">Cada Dia</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}