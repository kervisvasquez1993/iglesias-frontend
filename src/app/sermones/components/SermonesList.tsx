"use client";

import {
  CalendarIcon,
  Play,
  ExternalLink,
  Volume2,
  Heart,
  Sparkles,
  Users,
  Clock,
  ArrowRight,
  Video,
  User,
  BookOpen,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SermonResponse } from "@/insfractucture/interfaces/sermones/sermones.interfaces";

interface SermonesListComponentProps {
  sermones: SermonResponse[];
}

// ─── Mapa de tipos para badges ─────────────────────────────────────────
const typeConfig: Record<string, { color: string; label: string }> = {
  facebook: { color: "bg-blue-100 text-blue-800", label: "Facebook" },
  youtube: { color: "bg-red-100 text-red-800", label: "YouTube" },
  dominical: { color: "bg-indigo-100 text-indigo-800", label: "Dominical" },
  estudo_biblico: {
    color: "bg-purple-100 text-purple-800",
    label: "Estudo Bíblico",
  },
  devocional: { color: "bg-teal-100 text-teal-800", label: "Devocional" },
  culto_oracao: {
    color: "bg-amber-100 text-amber-800",
    label: "Culto de Oração",
  },
  predicacao: { color: "bg-orange-100 text-orange-800", label: "Predicação" },
  conferencia: { color: "bg-cyan-100 text-cyan-800", label: "Conferência" },
  seminario: {
    color: "bg-emerald-100 text-emerald-800",
    label: "Seminário",
  },
  culto_jovens: {
    color: "bg-pink-100 text-pink-800",
    label: "Culto de Jovens",
  },
  escola_biblica: {
    color: "bg-violet-100 text-violet-800",
    label: "Escola Bíblica",
  },
  testemunho: { color: "bg-lime-100 text-lime-800", label: "Testemunho" },
};

// ─── Helper: truncar texto y limpiar markdown ──────────────────────────
const getContentPreview = (text: string, maxLength: number = 150): string => {
  if (!text) return "";
  // Limpiar caracteres de markdown
  const clean = text
    .replace(/[#*_`~>\[\]()!|-]/g, "")
    .replace(/\n+/g, " ")
    .trim();
  if (clean.length <= maxLength) return clean;
  return clean.slice(0, maxLength).trim() + "...";
};

export function SermonesListComponent({
  sermones,
}: SermonesListComponentProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const extractYouTubeVideoId = (url: string) => {
    if (!url) return null;
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const getYouTubeThumbnail = (url: string) => {
    const videoId = extractYouTubeVideoId(url);
    return videoId
      ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
      : null;
  };

  const hasValidThumbnail = (
    thumbnailUrl: string | null | undefined
  ): boolean => {
    return !!(thumbnailUrl && thumbnailUrl.trim() !== "");
  };

  const getBestThumbnail = (sermon: SermonResponse): string | null => {
    if (hasValidThumbnail(sermon.youtube_thumbnail)) {
      return sermon.youtube_thumbnail;
    }
    const youtubeThumb = getYouTubeThumbnail(sermon.url_youtube);
    return hasValidThumbnail(youtubeThumb) ? youtubeThumb : null;
  };

  // ─── Estado vacío ────────────────────────────────────────────────────
  if (!sermones || sermones.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-church-sky-50 via-white to-church-blue-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 bg-church-red-400 rounded-full animate-pulse"></div>
          <div
            className="absolute bottom-20 right-10 w-24 h-24 bg-church-gold-400 rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 right-1/4 w-16 h-16 bg-church-blue-400 rounded-full animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          <div
            className={`text-center mb-16 transition-all duration-1000 ease-out ${
              isLoaded
                ? "transform translate-y-0 opacity-100"
                : "transform translate-y-8 opacity-0"
            }`}
          >
            <div className="flex justify-center mb-6">
              <div className="relative bg-church-red-500 rounded-full p-4 shadow-xl">
                <Volume2 className="w-8 h-8 text-white" />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-church-gold-500 rounded-full flex items-center justify-center animate-pulse">
                  <Play className="w-3 h-3 text-white fill-current" />
                </div>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-church-blue-900 mb-4">
              Sermões
              <span className="text-church-red-500 ml-2">Transformadores</span>
            </h1>
            <p className="text-lg md:text-xl text-church-blue-600 max-w-3xl mx-auto leading-relaxed">
              Encontre inspiração e ensinamentos bíblicos através dos nossos
              sermões
            </p>
          </div>

          <div
            className={`text-center py-16 transition-all duration-1000 ease-out delay-500 ${
              isLoaded
                ? "transform translate-y-0 opacity-100"
                : "transform translate-y-8 opacity-0"
            }`}
          >
            <div className="max-w-md mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-church-sky-200">
              <div className="w-20 h-20 bg-church-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Volume2 className="h-10 w-10 text-church-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-church-blue-900 mb-3">
                Nenhum sermão disponível
              </h3>
              <p className="text-church-blue-600 leading-relaxed">
                Os sermões aparecerão aqui quando estiverem disponíveis. Fique
                atento às nossas publicações!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── Lista de sermones ───────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-church-sky-50 via-white to-church-blue-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-church-red-400 rounded-full animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-24 h-24 bg-church-gold-400 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 right-1/4 w-16 h-16 bg-church-blue-400 rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ease-out ${
            isLoaded
              ? "transform translate-y-0 opacity-100"
              : "transform translate-y-8 opacity-0"
          }`}
        >
          <div className="flex justify-center mb-6">
            <div className="relative bg-church-red-500 rounded-full p-4 shadow-xl">
              <Volume2 className="w-8 h-8 text-white" />
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-church-gold-500 rounded-full flex items-center justify-center animate-pulse">
                <Play className="w-3 h-3 text-white fill-current" />
              </div>
              <div className="absolute -bottom-1 -left-1 w-5 h-5 bg-church-blue-500 rounded-full flex items-center justify-center">
                <Heart className="w-2 h-2 text-white" />
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-church-blue-900 mb-4">
            Sermões
            <span className="text-church-red-500 ml-2">Transformadores</span>
          </h1>
          <p className="text-lg md:text-xl text-church-blue-600 max-w-3xl mx-auto leading-relaxed">
            Encontre inspiração e ensinamentos bíblicos que transformam vidas e
            fortalecem a fé
          </p>

          {/* Stats */}
          <div
            className={`flex justify-center items-center space-x-8 mt-8 transition-all duration-1000 ease-out delay-300 ${
              isLoaded
                ? "transform translate-y-0 opacity-100"
                : "transform translate-y-8 opacity-0"
            }`}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-church-blue-900 mb-1">
                {sermones.length}+
              </div>
              <p className="text-sm text-church-blue-600">
                Sermões Disponíveis
              </p>
            </div>
            <div className="w-px h-12 bg-church-gold-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-church-blue-900 mb-1">
                🎥
              </div>
              <p className="text-sm text-church-blue-600">Qualidade HD</p>
            </div>
            <div className="w-px h-12 bg-church-gold-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-church-blue-900 mb-1">
                24/7
              </div>
              <p className="text-sm text-church-blue-600">Sempre Disponível</p>
            </div>
          </div>

          <div className="mt-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-church-red-500 text-white shadow-lg">
              <Sparkles className="w-4 h-4 mr-2" />
              {sermones.length} sermão{sermones.length !== 1 ? "es" : ""}{" "}
              disponíve{sermones.length !== 1 ? "is" : "l"}
            </span>
          </div>
        </div>

        {/* Grid de sermones */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {sermones.map((sermon, index) => {
            const thumbnailUrl = getBestThumbnail(sermon);
            const contentPreview = getContentPreview(sermon.contents, 150);
            const typeInfo = sermon.type
              ? typeConfig[sermon.type] || {
                  color: "bg-gray-100 text-gray-800",
                  label: sermon.type,
                }
              : null;

            return (
              <div
                key={sermon.id}
                className={`transition-all duration-700 ease-out ${
                  isLoaded
                    ? "transform translate-y-0 opacity-100"
                    : "transform translate-y-12 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-3 group border border-church-sky-200 relative h-full flex flex-col">
                  {/* Línea decorativa superior */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-church-red-400 via-church-gold-400 to-church-red-400"></div>

                  {/* Thumbnail */}
                  <div className="relative h-48 md:h-56 overflow-hidden bg-church-sky-100">
                    {thumbnailUrl ? (
                      <Image
                        src={thumbnailUrl}
                        alt={sermon.titulo}
                        fill
                        className="object-cover transition-all duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          const fallback =
                            e.currentTarget.parentNode?.querySelector(
                              ".fallback-thumbnail"
                            );
                          if (fallback) {
                            (fallback as HTMLElement).style.display = "flex";
                          }
                        }}
                      />
                    ) : null}

                    {/* Fallback */}
                    <div
                      className={`fallback-thumbnail absolute inset-0 bg-gradient-to-br from-church-blue-600 to-church-red-600 flex flex-col items-center justify-center text-white transition-all duration-500 group-hover:scale-110 ${
                        thumbnailUrl ? "hidden" : "flex"
                      }`}
                    >
                      <Video className="w-12 h-12 mb-3 opacity-80" />
                      <h4 className="text-sm font-bold text-center px-4 leading-tight line-clamp-3">
                        {sermon.titulo}
                      </h4>
                      <p className="text-xs opacity-75 mt-2">
                        Clique para assistir
                      </p>
                    </div>

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Play button */}
                    {sermon.url_youtube && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <a
                          href={sermon.url_youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-church-red-500 hover:bg-church-red-600 text-white rounded-full p-4 transition-all duration-300 transform hover:scale-110 shadow-2xl backdrop-blur-sm"
                        >
                          <Play className="h-8 w-8 fill-current ml-1" />
                        </a>
                      </div>
                    )}

                    {/* Badge de tipo */}
                    {typeInfo && (
                      <div className="absolute top-4 left-4">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold shadow-lg backdrop-blur-sm ${typeInfo.color}`}
                        >
                          {typeInfo.label}
                        </span>
                      </div>
                    )}

                    {/* Badge de status */}
                    <div className="absolute top-4 right-4">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold shadow-lg backdrop-blur-sm ${
                          sermon.activo
                            ? "bg-church-gold-500 text-white"
                            : "bg-gray-500 text-white"
                        }`}
                      >
                        {sermon.activo ? "🔴 Ativo" : "⏸️ Inativo"}
                      </span>
                    </div>

                    {/* Duración estimada */}
                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <div className="bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-white" />
                        <span className="text-xs text-white font-medium">
                          ~30 min
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Contenido del card */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold mb-2 text-church-blue-900 group-hover:text-church-red-500 transition-colors duration-300 leading-tight line-clamp-2">
                      {sermon.titulo}
                    </h3>

                    {/* Pregador */}
                    {sermon.pregador && (
                      <div className="flex items-center mb-3 text-church-blue-600">
                        <div className="w-7 h-7 bg-church-blue-100 rounded-lg flex items-center justify-center mr-2">
                          <User className="h-3.5 w-3.5 text-church-blue-600" />
                        </div>
                        <span className="text-sm font-medium truncate">
                          {sermon.pregador}
                        </span>
                      </div>
                    )}

                    {/* Fecha */}
                    <div className="flex items-center mb-3 text-church-blue-600">
                      <div className="w-7 h-7 bg-church-red-100 rounded-lg flex items-center justify-center mr-2">
                        <CalendarIcon className="h-3.5 w-3.5 text-church-red-600" />
                      </div>
                      <span className="text-sm font-medium">
                        {formatDate(sermon.created_at)}
                      </span>
                    </div>

                    {/* Preview del contenido */}
                    {contentPreview && (
                      <p className="text-church-blue-700 mb-4 text-sm leading-relaxed flex-grow">
                        {contentPreview}
                      </p>
                    )}

                    {/* Botones de acción */}
                    <div className="pt-4 border-t border-church-sky-200 mt-auto space-y-3">
                      {/* Botón Ver mais - navega al detalle por slug */}
                      <Link
                        href={`/sermones/${sermon.slug}`}
                        className="group/btn w-full inline-flex items-center justify-center px-4 py-2.5 bg-church-blue-500 hover:bg-church-blue-600 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-md"
                      >
                        <BookOpen className="w-4 h-4 mr-2" />
                        Ver mais
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </Link>

                      {/* Links YouTube / Facebook */}
                      <div className="flex items-center justify-between">
                        {sermon.url_youtube && (
                          <a
                            href={sermon.url_youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-church-red-500 hover:text-church-red-600 font-medium transition-colors duration-300 text-sm group/link"
                          >
                            <div className="w-7 h-7 bg-church-red-100 rounded-lg flex items-center justify-center mr-2 group-hover/link:bg-church-red-200 transition-colors duration-300">
                              <Play className="h-3.5 w-3.5 text-church-red-600 fill-current" />
                            </div>
                            <span>YouTube</span>
                          </a>
                        )}

                        {sermon.url_facebook && (
                          <a
                            href={sermon.url_facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-church-blue-400 hover:text-church-blue-600 transition-colors duration-300"
                            title="Ver no Facebook"
                          >
                            <ExternalLink className="h-5 w-5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Decoración flotante */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-8 h-8 bg-church-gold-500 rounded-full flex items-center justify-center shadow-lg">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA final */}
        <div
          className={`mt-16 transition-all duration-1000 ease-out delay-700 ${
            isLoaded
              ? "transform translate-y-0 opacity-100"
              : "transform translate-y-8 opacity-0"
          }`}
        >
          <div className="bg-gradient-to-r from-church-red-500 to-church-gold-500 p-8 rounded-2xl text-white shadow-xl">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-3 flex items-center justify-center">
                <Users className="w-6 h-6 mr-2" />
                Gostaria de receber notificações?
              </h3>
              <p className="text-lg mb-6 opacity-90">
                Inscreva-se para receber notificações quando publicarmos novos
                sermões
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contato"
                  className="group inline-flex items-center justify-center px-8 py-3 bg-white text-church-red-600 rounded-lg font-semibold hover:bg-church-sky-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <Volume2 className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  Entrar em Contato
                </Link>
                <a
                  href="https://www.youtube.com/@ibrsonhodedeus-k4c2f"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center px-8 py-3 bg-church-blue-500 hover:bg-church-blue-600 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300 fill-current" />
                  Ver no YouTube
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}