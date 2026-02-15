import Link from "next/link";
import { notFound } from "next/navigation";
import { IMisioneroResponse } from "@/insfractucture/interfaces/misiones/misiones.interfaces";
import { misioneroGetBySlugGraphQLAction } from "@/insfractucture/actions/misiones/misiones.actions";
import { MisioneroGaleria } from "../components/MisioneroGaleria";
import { MarkdownRenderer } from "@/app/eventos/components/MarkdownRenderer";

interface MisioneroDetailPageProps {
  params: Promise<{ slug: string }>;
}

async function getMisionero(slug: string): Promise<IMisioneroResponse | null> {
  try {
    const response = await misioneroGetBySlugGraphQLAction({ slug });
    return response.misioneros[0] ?? null;
  } catch (error) {
    console.error("Error fetching misionero:", error);
    return null;
  }
}

export default async function MisioneroDetailPage({ params }: MisioneroDetailPageProps) {
  const { slug } = await params;
  const misionero = await getMisionero(slug);

  if (!misionero) {
    notFound();
  }

  // Separar documentos (no imagen ni video) para la sección de descargas
  const documents = misionero.files.filter(
    (f) => !f.mime.startsWith("image/") && !f.mime.startsWith("video/")
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-church-sky-50 via-white to-church-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link
            href="/misioneros"
            className="inline-flex items-center gap-2 text-church-blue-500 hover:text-church-blue-700 transition-colors font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Voltar para Missionários
          </Link>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-church-blue-800 mb-4">
            {misionero.title}
          </h1>
          <time className="text-sm text-church-blue-400">
            Publicado em{" "}
            {new Date(misionero.publishedAt).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </time>
        </header>

        {/* Galería de imágenes y videos (componente client) */}
        {misionero.files.length > 0 && (
          <MisioneroGaleria files={misionero.files} title={misionero.title} />
        )}

        {/* Contenido Markdown */}
        {misionero.descriptions && (
          <div className="bg-white/80 rounded-xl p-8 border border-church-sky-200 shadow-lg mb-10">
            <MarkdownRenderer 
              content={misionero.descriptions} 
              variant="full" 
            />
          </div>
        )}

        {/* Documentos adjuntos (no multimedia) */}
        {documents.length > 0 && (
          <section className="bg-white rounded-2xl p-6 shadow-lg border border-church-blue-100">
            <h2 className="text-xl font-bold text-church-blue-800 mb-4 flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Documentos
            </h2>
            <div className="space-y-3">
              {documents.map((doc) => (
                <a
                  key={doc.id}
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-church-blue-50 hover:bg-church-blue-100 transition-colors group"
                >
                  <div className="w-10 h-10 bg-church-blue-200 rounded-lg flex items-center justify-center group-hover:bg-church-blue-300 transition-colors">
                    <span className="text-xs font-bold text-church-blue-700 uppercase">
                      {doc.ext?.replace(".", "") || "file"}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-church-blue-700 truncate">{doc.name}</p>
                    <p className="text-xs text-church-blue-400">
                      {(doc.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <svg
                    className="w-5 h-5 text-church-blue-400 group-hover:text-church-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: MisioneroDetailPageProps) {
  const { slug } = await params;

  try {
    const response = await misioneroGetBySlugGraphQLAction({ slug });
    const misionero = response.misioneros[0];

    return {
      title: `${misionero.title} - Missionários`,
      description: misionero.descriptions?.substring(0, 160) || "Conheça nossos missionários",
    };
  } catch {
    return {
      title: "Missionário - Igreja Batista Renovada Sonho de Deus",
      description: "Conheça nossos missionários",
    };
  }
}