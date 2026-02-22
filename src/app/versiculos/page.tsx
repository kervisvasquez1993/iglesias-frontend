import { VersiculosListComponent } from "@/components/sections/versiculos/VersiculosList";
import { versiculosDoDiaGetAllGraphQLAction } from "@/insfractucture/actions/versiculo/graphql/get-versiculos-do-dia.actions";
import { PaginationMeta } from "@/insfractucture/interfaces/comunidade/comunidades.interfaces";
import { IVersiculoResponse } from "@/insfractucture/interfaces/versiculo/versiculo-do-dia.interfaces";

// ─── Data fetching ─────────────────────────────────────────────────────────────

async function getVersiculos(page: number = 1): Promise<{
  versiculos: IVersiculoResponse[];
  pagination?: PaginationMeta;
  error?: string;
}> {
  try {
    const response = await versiculosDoDiaGetAllGraphQLAction({
      page,
      pageSize: 25,
      sort: "createdAt:desc",
    });

    return {
      versiculos: response.versiculos,
      pagination: response.pagination,
    };
  } catch (error) {
    console.error("Error fetching versículos:", error);
    return {
      versiculos: [],
      error: "Erro ao carregar os versículos do dia",
    };
  }
}

// ─── Page ──────────────────────────────────────────────────────────────────────

interface VersiculosPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function VersiculosPage({ searchParams }: VersiculosPageProps) {
  const resolved = await searchParams;
  const page = Number(resolved.page) || 1;

  const { versiculos, pagination, error } = await getVersiculos(page);

  // ─── Error state ───────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-church-sky-50 via-white to-church-blue-50 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-church-red-200 text-center p-10">
            <div className="w-16 h-16 bg-church-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-church-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-church-red-600 mb-4">
              Ops! Algo deu errado
            </h2>
            <p className="text-church-blue-700 mb-6">{error}</p>
            <p className="text-sm text-church-blue-600">
              Não foi possível carregar os versículos no momento
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ─── Happy path ─────────────────────────────────────────────────────────────
  return (
    <div suppressHydrationWarning>
      <VersiculosListComponent
        versiculos={versiculos}
        pagination={pagination}
        currentPage={page}
      />
    </div>
  );
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata() {
  return {
    title: "Versículos do Dia - Igreja Batista Renovada Sonho de Deus",
    description:
      "Leia e medite nos versículos bíblicos do dia para fortalecer sua fé e crescimento espiritual.",
    keywords:
      "versículos do dia, bíblia, palavra de deus, reflexão bíblica, fé, crescimento espiritual",
    openGraph: {
      title: "Versículos do Dia - Igreja Batista Renovada Sonho de Deus",
      description:
        "Leia e medite nos versículos bíblicos do dia para fortalecer sua fé e crescimento espiritual.",
      type: "website",
    },
  };
}