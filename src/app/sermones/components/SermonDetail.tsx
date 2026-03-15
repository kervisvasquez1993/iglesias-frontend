// app/sermones/[slug]/components/SermonDetail.tsx

"use client";

import Link from "next/link";
import {
  ArrowLeftIcon,
  Play,
  Volume2,
  Heart,
  Sparkles,
  User,
  CalendarIcon,
  ClockIcon,
  ExternalLink,
  BookOpen,
  Phone,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import rehypeRaw from "rehype-raw";
import { SermonResponse } from "@/insfractucture/interfaces/sermones/sermones.interfaces";
import { useEffect, useState } from "react";
import { ShareButton } from "@/app/components/shareButton";

interface SermonDetailComponentProps {
  sermon: SermonResponse;
}

// ─── Mapa de tipos ─────────────────────────────────────────────────────
const typeConfig: Record<string, { color: string; label: string }> = {
  facebook: { color: "bg-blue-500 text-white", label: "Facebook" },
  youtube: { color: "bg-red-500 text-white", label: "YouTube" },
  dominical: { color: "bg-indigo-500 text-white", label: "Dominical" },
  estudo_biblico: { color: "bg-purple-500 text-white", label: "Estudo Bíblico" },
  devocional: { color: "bg-teal-500 text-white", label: "Devocional" },
  culto_oracao: { color: "bg-amber-500 text-white", label: "Culto de Oração" },
  predicacao: { color: "bg-orange-500 text-white", label: "Predicação" },
  conferencia: { color: "bg-cyan-500 text-white", label: "Conferência" },
  seminario: { color: "bg-emerald-500 text-white", label: "Seminário" },
  culto_jovens: { color: "bg-pink-500 text-white", label: "Culto de Jovens" },
  escola_biblica: { color: "bg-violet-500 text-white", label: "Escola Bíblica" },
  testemunho: { color: "bg-lime-600 text-white", label: "Testemunho" },
};

export const SermonDetailComponent = ({
  sermon,
}: SermonDetailComponentProps) => {
  const [mounted, setMounted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const formatDate = (dateString: string) => {
    if (!mounted) return "";
    return new Date(dateString).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDatetime = (dateString: string) => {
    if (!mounted) return "";
    return new Date(dateString).toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const typeInfo = sermon.type
    ? typeConfig[sermon.type] || {
        color: "bg-gray-500 text-white",
        label: sermon.type,
      }
    : null;

  // Markdown components (mismo estilo que EventoDetailComponent)
  const markdownComponents = {
    h1: ({ children }: { children?: React.ReactNode }) => (
      <h1 className="text-3xl font-bold text-church-gold-600 mt-6 mb-4">
        {children}
      </h1>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-2xl font-bold text-church-gold-600 mt-5 mb-3">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-xl font-bold text-church-blue-800 mt-4 mb-2">
        {children}
      </h3>
    ),
    h4: ({ children }: { children?: React.ReactNode }) => (
      <h4 className="text-lg font-bold text-church-blue-800 mt-3 mb-2">
        {children}
      </h4>
    ),
    p: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-4 leading-relaxed text-church-blue-700 text-lg">
        {children}
      </p>
    ),
    ul: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc list-inside mb-4 space-y-2 text-church-blue-700">
        {children}
      </ul>
    ),
    ol: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 text-church-blue-700">
        {children}
      </ol>
    ),
    li: ({ children }: { children?: React.ReactNode }) => (
      <li className="ml-4">{children}</li>
    ),
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-bold text-church-gold-600">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic text-church-blue-800">{children}</em>
    ),
    a: ({
      children,
      href,
    }: {
      children?: React.ReactNode;
      href?: string;
    }) => (
      <a
        href={href}
        className="text-church-gold-600 hover:text-church-gold-700 underline font-medium"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-church-gold-400 pl-4 italic my-4 text-church-blue-600 bg-church-sky-50 py-3 rounded-r-lg">
        {children}
      </blockquote>
    ),
    code: ({
      children,
      className,
      ...props
    }: {
      children?: React.ReactNode;
      className?: string;
    }) => {
      const isBlock =
        typeof className === "string" && className.includes("language-");
      if (!isBlock) {
        return (
          <code
            className="bg-church-sky-100 px-2 py-1 rounded text-sm font-mono text-church-blue-800"
            {...props}
          >
            {children}
          </code>
        );
      }
      return (
        <pre className="block bg-church-blue-900 text-white p-4 rounded-lg overflow-x-auto text-sm font-mono my-4">
          <code className={className} {...props}>
            {children}
          </code>
        </pre>
      );
    },
    hr: () => <hr className="my-6 border-t-2 border-church-gold-300" />,
    table: ({ children }: { children?: React.ReactNode }) => (
      <div className="overflow-x-auto my-4">
        <table className="min-w-full divide-y divide-church-sky-200 border border-church-sky-300">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }: { children?: React.ReactNode }) => (
      <thead className="bg-church-sky-100">{children}</thead>
    ),
    th: ({ children }: { children?: React.ReactNode }) => (
      <th className="px-4 py-2 text-left text-sm font-semibold text-church-blue-900">
        {children}
      </th>
    ),
    td: ({ children }: { children?: React.ReactNode }) => (
      <td className="px-4 py-2 text-sm text-church-blue-700 border-t border-church-sky-200">
        {children}
      </td>
    ),
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-church-sky-50 via-white to-church-blue-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-church-sky-300 rounded w-1/4 mb-8"></div>
            <div className="bg-white/80 rounded-2xl shadow-xl overflow-hidden">
              <div className="h-20 bg-church-sky-200"></div>
              <div className="p-8">
                <div className="h-8 bg-church-sky-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-church-sky-100 rounded w-1/2 mb-6"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-church-sky-100 rounded w-full"></div>
                  <div className="h-4 bg-church-sky-100 rounded w-5/6"></div>
                  <div className="h-4 bg-church-sky-100 rounded w-4/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-church-sky-50 via-white to-church-blue-50 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-10 w-32 h-32 bg-church-gold-400 rounded-full animate-pulse"></div>
        <div
          className="absolute bottom-20 left-10 w-24 h-24 bg-church-blue-400 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/4 w-16 h-16 bg-church-red-400 rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Botón de regreso */}
        <div
          className={`mb-8 transition-all duration-1000 ease-out ${
            isLoaded
              ? "transform translate-y-0 opacity-100"
              : "transform translate-y-8 opacity-0"
          }`}
        >
          <Link
            href="/sermones"
            className="group inline-flex items-center px-4 py-2 bg-church-blue-500 text-white rounded-lg hover:bg-church-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            Voltar aos sermões
          </Link>
        </div>

        {/* Card principal */}
        <div
          className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-church-sky-200 transition-all duration-1000 ease-out delay-200 ${
            isLoaded
              ? "transform translate-y-0 opacity-100"
              : "transform translate-y-12 opacity-0"
          }`}
        >
          <div className="h-1 bg-gradient-to-r from-church-gold-400 via-church-blue-400 to-church-gold-400"></div>

          {/* Header con thumbnail o gradiente */}
          <div className="relative bg-gradient-to-r from-church-blue-800 to-church-blue-900 p-8 md:p-12">
            <div className="flex items-center justify-center mb-4">
              <Volume2 className="w-16 h-16 text-white/80" />
            </div>

            {/* Badge de tipo */}
            {typeInfo && (
              <div className="absolute top-6 left-6">
                <span
                  className={`inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold shadow-lg ${typeInfo.color}`}
                >
                  {typeInfo.label}
                </span>
              </div>
            )}

            {/* Badge de status */}
            <div className="absolute top-6 right-6">
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm ${
                  sermon.activo
                    ? "bg-church-gold-500 text-white"
                    : "bg-gray-500 text-white"
                }`}
              >
                {sermon.activo ? "✨ Ativo" : "⏸️ Inativo"}
              </span>
            </div>

            {/* Compartir */}
            <div className="absolute bottom-6 right-6">
              <ShareButton
                title={`${sermon.titulo} - Sermão`}
                text={`Ouça o sermão "${sermon.titulo}"${sermon.pregador ? ` com ${sermon.pregador}` : ""}`}
                variant="floating"
                size="md"
                toastMessage="Link do sermão copiado!"
              />
            </div>
          </div>

          <div className="p-8 md:p-12">
            {/* Título */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="relative bg-church-gold-500 rounded-full p-3 shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-church-red-500 rounded-full flex items-center justify-center">
                    <Heart className="w-2 h-2 text-white" />
                  </div>
                </div>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-church-blue-900 mb-4 leading-tight">
                {sermon.titulo}
              </h1>
              <div className="w-24 h-1 bg-church-gold-500 mx-auto rounded-full"></div>
            </div>

            {/* Info cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Pregador */}
              {sermon.pregador && (
                <div className="bg-church-sky-50 rounded-xl p-6 border border-church-sky-200">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-church-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-church-blue-900 mb-2 text-lg">
                        Pregador
                      </h3>
                      <p className="text-church-blue-700 font-medium">
                        {sermon.pregador}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Fecha */}
              <div className="bg-church-red-50 rounded-xl p-6 border border-church-red-200">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-church-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CalendarIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-church-blue-900 mb-2 text-lg">
                      Data de Publicação
                    </h3>
                    <p className="text-church-blue-700 font-medium capitalize">
                      {formatDatetime(sermon.created_at)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Botones de video */}
            {(sermon.url_youtube || sermon.url_facebook) && (
              <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
                {sermon.url_youtube && (
                  <a
                    href={sermon.url_youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center px-8 py-3 bg-church-red-500 hover:bg-church-red-600 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <Play className="w-5 h-5 mr-2 fill-current group-hover:scale-110 transition-transform duration-300" />
                    Assistir no YouTube
                  </a>
                )}
                {sermon.url_facebook && (
                  <a
                    href={sermon.url_facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center px-8 py-3 bg-church-blue-500 hover:bg-church-blue-600 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Ver no Facebook
                  </a>
                )}
              </div>
            )}

            {/* Contenido (Markdown) */}
            {sermon.contents && (
              <div className="mb-12">
                <div className="bg-white/80 rounded-xl p-8 border border-church-gold-200 shadow-lg">
                  <h3 className="text-2xl font-bold text-church-blue-900 mb-6 flex items-center">
                    <div className="w-8 h-8 bg-church-gold-500 rounded-lg flex items-center justify-center mr-3">
                      <Heart className="w-4 h-4 text-white" />
                    </div>
                    Conteúdo do Sermão
                  </h3>
                  <div className="prose prose-lg max-w-none">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw, rehypeSanitize]}
                      components={markdownComponents}
                    >
                      {sermon.contents}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            )}

            {/* Conclusões (Markdown) */}
            {sermon.conclusoes && (
              <div className="mb-12">
                <div className="bg-white/80 rounded-xl p-8 border border-green-200 shadow-lg">
                  <h3 className="text-2xl font-bold text-church-blue-900 mb-6 flex items-center">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    Conclusões
                  </h3>
                  <div className="prose prose-lg max-w-none">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw, rehypeSanitize]}
                      components={markdownComponents}
                    >
                      {sermon.conclusoes}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            )}

            {/* CTA */}
            {sermon.activo && (
              <div className="bg-gradient-to-r from-church-gold-500 to-church-blue-500 p-8 rounded-xl text-white shadow-xl mb-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-3 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 mr-2" />
                    Este sermão tocou seu coração?
                  </h3>
                  <p className="text-lg mb-6 opacity-90">
                    Entre em contato conosco para saber mais sobre nossos cultos
                    e estudos bíblicos.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/contato"
                      className="group inline-flex items-center justify-center px-8 py-3 bg-white text-church-blue-600 rounded-lg font-semibold hover:bg-church-sky-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      <Phone className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                      Entre em Contato
                    </Link>
                    <ShareButton
                      title={`${sermon.titulo} - Sermão`}
                      text={`Ouça o sermão "${sermon.titulo}"${sermon.pregador ? ` com ${sermon.pregador}` : ""}`}
                      shareText="Compartilhar Sermão"
                      copyText="Copiar Link"
                      loadingText="Compartilhando..."
                      successText="Compartilhado!"
                      toastMessage="Link do sermão copiado!"
                      variant="primary"
                      size="md"
                      className="bg-church-red-500 hover:bg-church-red-600 group"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Info sistema */}
            <div className="bg-church-sky-50 rounded-xl p-6 border border-church-sky-200">
              <h4 className="font-semibold text-church-blue-900 mb-4">
                Informações do Sistema
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-church-blue-600">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-church-gold-500 rounded-full mr-2"></div>
                  <span className="font-medium">Criado em:</span>
                  <span className="ml-1">{formatDate(sermon.created_at)}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-church-blue-500 rounded-full mr-2"></div>
                  <span className="font-medium">Atualizado em:</span>
                  <span className="ml-1">{formatDate(sermon.updated_at)}</span>
                </div>
                {sermon.published_at && (
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="font-medium">Publicado em:</span>
                    <span className="ml-1">
                      {formatDate(sermon.published_at)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};