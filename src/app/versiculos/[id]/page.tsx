// app/versiculos/[id]/page.tsx

import { notFound } from "next/navigation";
import Link from "next/link";
import { versiculoDoDiaGetByIdGraphQLAction } from "@/insfractucture/actions/versiculos-do-dias/graphql/get-versiculo-do-dia-by-id.actions";
import { VersiculoDetailSection } from "@/components/sections/versiculos/VersiculoDetailSection";


// ─── Page ──────────────────────────────────────────────────────────────────────

interface VersiculoDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function VersiculoDetailPage({
  params,
}: VersiculoDetailPageProps) {
  const { id } = await params;

  let versiculo;
  try {
    versiculo = await versiculoDoDiaGetByIdGraphQLAction(id);
  } catch {
    notFound();
  }

  return (
    <div
      suppressHydrationWarning
      className=" bg-gradient-to-br from-church-sky-50 via-white to-church-blue-50"
    >
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-6">
        <nav className="flex items-center gap-2 text-sm text-church-blue-500">
          <Link href="/" className="hover:text-church-blue-700 transition-colors">
            Início
          </Link>
          <span>/</span>
          <Link
            href="/versiculos"
            className="hover:text-church-blue-700 transition-colors"
          >
            Versículos do Dia
          </Link>
          <span>/</span>
          <span className="text-church-blue-800 font-medium truncate max-w-[200px]">
            {versiculo.name ?? "Versículo"}
          </span>
        </nav>
      </div>
      <VersiculoDetailSection versiculo={versiculo} />
    </div>
  );
}

// ─── Metadata dinámica ─────────────────────────────────────────────────────────

export async function generateMetadata({ params }: VersiculoDetailPageProps) {
  const { id } = await params;

  try {
    const versiculo = await versiculoDoDiaGetByIdGraphQLAction(id);
    return {
      title: `${versiculo.name ?? "Versículo do Dia"} - Igreja Batista Renovada Sonho de Deus`,
      description: versiculo.descriptions?.slice(0, 160),
      openGraph: {
        title: versiculo.name ?? "Versículo do Dia",
        description: versiculo.descriptions?.slice(0, 160),
        type: "article",
      },
    };
  } catch {
    return {
      title: "Versículo do Dia - Igreja Batista Renovada Sonho de Deus",
    };
  }
}