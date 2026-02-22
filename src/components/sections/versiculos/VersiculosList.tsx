"use client";

// app/versiculos/components/VersiculosList.tsx

import { PaginationMeta } from "@/insfractucture/interfaces/comunidade/comunidades.interfaces";
import { IVersiculoResponse } from "@/insfractucture/interfaces/versiculo/versiculo-do-dia.interfaces";
import Link from "next/link";

interface VersiculosListProps {
  versiculos: IVersiculoResponse[];
  pagination?: PaginationMeta;
  currentPage: number;
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(dateStr));
}

// ─── Card individual ───────────────────────────────────────────────────────────

function VersiculoCard({ versiculo }: { versiculo: IVersiculoResponse }) {
  return (
    <Link href={`/versiculos/${versiculo.id}`} className="group block">
      <article className="h-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-md group-hover:shadow-xl border border-church-blue-100 transition-all duration-300 group-hover:-translate-y-1 p-8 flex flex-col gap-5 cursor-pointer">
        {/* Badge de tipo */}
        {versiculo.type && (
          <span className="self-start inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-church-sky-100 text-church-blue-700 border border-church-sky-200">
            {versiculo.type}
          </span>
        )}

        {/* Referencia / nombre */}
        {versiculo.name && (
          <h2 className="text-xl font-bold text-church-blue-800 leading-snug group-hover:text-church-blue-600 transition-colors duration-200">
            {versiculo.name}
          </h2>
        )}

        {/* Texto del versículo */}
        <blockquote className="relative text-church-blue-700 leading-relaxed text-base italic pl-5 border-l-4 border-church-sky-400 flex-1">
          <span className="absolute -left-2 -top-3 text-5xl text-church-sky-300 font-serif leading-none select-none">
            "
          </span>
          {/* Truncar en la lista para que no sea muy largo */}
          <span className="line-clamp-5">{versiculo.descriptions}</span>
        </blockquote>

        {/* Footer: fecha + leer más */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <p className="text-xs text-church-blue-400">
            {new Intl.DateTimeFormat("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            }).format(new Date(versiculo.publishedAt))}
          </p>
          <span className="text-xs font-semibold text-church-blue-500 group-hover:text-church-blue-700 group-hover:underline transition-all duration-200">
            Ler mais →
          </span>
        </div>
      </article>
    </Link>
  );
}
// ─── Paginación ────────────────────────────────────────────────────────────────

function Pagination({
  pagination,
  currentPage,
}: {
  pagination: PaginationMeta;
  currentPage: number;
}) {
  if (pagination.pageCount <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-3 mt-12">
      {currentPage > 1 && (
        <Link
          href={`?page=${currentPage - 1}`}
          className="px-5 py-2 rounded-xl bg-white border border-church-blue-200 text-church-blue-700 font-semibold shadow-sm hover:bg-church-blue-50 transition-colors duration-200"
        >
          ← Anterior
        </Link>
      )}

      <span className="px-4 py-2 text-sm text-church-blue-600 font-medium">
        {currentPage} / {pagination.pageCount}
      </span>

      {currentPage < pagination.pageCount && (
        <Link
          href={`?page=${currentPage + 1}`}
          className="px-5 py-2 rounded-xl bg-church-blue-500 text-white font-semibold shadow-sm hover:bg-church-blue-600 transition-colors duration-200"
        >
          Próximo →
        </Link>
      )}
    </div>
  );
}

// ─── Componente principal ──────────────────────────────────────────────────────

export function VersiculosListComponent({
  versiculos,
  pagination,
  currentPage,
}: VersiculosListProps) {
  return (
    <section className="min-h-screen bg-gradient-to-br from-church-sky-50 via-white to-church-blue-50 pb-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-church-blue-600 to-church-sky-500 py-14 px-4 text-center shadow-lg mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.8}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow">
          Versículos do Dia
        </h1>
        <p className="text-church-sky-100 text-base md:text-lg max-w-xl mx-auto">
          Palavras que alimentam a alma e fortalecem a fé
        </p>
        {pagination && (
          <p className="text-church-sky-200 text-sm mt-3">
            {pagination.total} versículo{pagination.total !== 1 ? "s" : ""}{" "}
            disponíve{pagination.total !== 1 ? "is" : "l"}
          </p>
        )}
      </div>

      {/* Grid */}
      <div className="container mx-auto px-4 max-w-7xl">
        {versiculos.length === 0 ? (
          <div className="text-center py-20 text-church-blue-400 text-lg">
            Nenhum versículo encontrado.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {versiculos.map((v) => (
              <VersiculoCard key={v.id} versiculo={v} />
            ))}
          </div>
        )}

        {pagination && (
          <Pagination pagination={pagination} currentPage={currentPage} />
        )}
      </div>
    </section>
  );
}
