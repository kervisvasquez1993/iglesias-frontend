"use client";
import { IMisioneroResponse } from "@/insfractucture/interfaces/misiones/misiones.interfaces";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

interface MisionerosListProps {
  misioneros: IMisioneroResponse[];
}

export const MisionerosList = ({ misioneros }: MisionerosListProps) => {
  if (!misioneros.length) {
    return (
      <div className="text-center py-20">
        <div className="w-20 h-20 bg-church-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-church-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-church-blue-700 mb-2">
          Nenhum missionário encontrado
        </h3>
        <p className="text-church-blue-500">
          Em breve teremos informações sobre nossos missionários.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {misioneros.map((misionero) => (
        <MisioneroCard key={misionero.id} misionero={misionero} />
      ))}
    </div>
  );
};

interface MisioneroCardProps {
  misionero: IMisioneroResponse;
}

const MisioneroCard = ({ misionero }: MisioneroCardProps) => {
  // Obtener la primera imagen como thumbnail
  const thumbnail = misionero.files.find((f) => f.mime.startsWith("image/"));

  return (
    <Link href={`/misioneros/${misionero.slug}`}>
      <article className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-church-blue-100 hover:border-church-blue-300 transform hover:-translate-y-1">
        {/* Imagen */}
        <div className="relative h-56 w-full overflow-hidden bg-church-blue-50">
          {thumbnail ? (
            <Image
              src={thumbnail.url}
              alt={thumbnail.alternativeText || misionero.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <svg
                className="w-16 h-16 text-church-blue-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Contenido */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-church-blue-800 mb-3 group-hover:text-church-blue-600 transition-colors line-clamp-2">
            {misionero.title}
          </h3>

          {misionero.descriptions && (
            <div className="text-church-blue-600 text-sm line-clamp-3 mb-4 prose prose-sm max-w-none">
              <ReactMarkdown>
                {misionero.descriptions.substring(0, 200)}
              </ReactMarkdown>
            </div>
          )}

          {/* Archivos adjuntos indicator */}
          {misionero.files.length > 0 && (
            <div className="flex items-center gap-2 text-xs text-church-blue-400">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                />
              </svg>
              <span>
                {misionero.files.length}{" "}
                {misionero.files.length === 1 ? "arquivo" : "arquivos"}
              </span>
            </div>
          )}

          {/* Fecha */}
          <div className="mt-4 pt-4 border-t border-church-blue-100">
            <time className="text-xs text-church-blue-400">
              {new Date(misionero.publishedAt).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </time>
          </div>
        </div>
      </article>
    </Link>
  );
};