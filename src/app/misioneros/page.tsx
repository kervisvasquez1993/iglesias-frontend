import { MisionerosList } from "@/components/sections/mision/MisionerosList";
import { misioneroGetAllGraphQLAction } from "@/insfractucture/actions/misiones/misiones.actions";
import { IMisioneroResponse } from "@/insfractucture/interfaces/misiones/misiones.interfaces";


async function getMisionerosGraphQL(page: number = 1): Promise<{
  misioneros: IMisioneroResponse[];
  error?: string;
}> {
  try {
    const response = await misioneroGetAllGraphQLAction({ page, pageSize: 12 });

    return {
      misioneros: response.misioneros,
    };
  } catch (error) {
    console.error("Error fetching misioneros from GraphQL:", error);
    return {
      misioneros: [],
      error: "Erro ao carregar os missionários",
    };
  }
}

interface MisionerosPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function MisionerosPage({ searchParams }: MisionerosPageProps) {
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams.page) || 1;

  const { misioneros, error } = await getMisionerosGraphQL(page);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-church-sky-50 via-white to-church-blue-50 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-church-red-200 text-center p-8">
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
              Não foi possível carregar os missionários no momento
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-church-sky-50 via-white to-church-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-church-blue-800 mb-4">
            Nossos Missionários
          </h1>
          <p className="text-lg text-church-blue-600 max-w-2xl mx-auto">
            Conheça os missionários que levam a palavra de Deus ao redor do mundo.
          </p>
        </div>

        {/* Lista de misioneros */}
        <MisionerosList misioneros={misioneros} />
      </div>
    </div>
  );
}

export const metadata = {
  title: "Missionários - Igreja Batista Renovada Sonho de Deus",
  description:
    "Conheça os missionários que levam a palavra de Deus ao redor do mundo.",
  keywords:
    "missionários, missões, igreja batista, evangelismo, missão mundial",
  openGraph: {
    title: "Missionários - Igreja Batista Renovada Sonho de Deus",
    description:
      "Conheça os missionários que levam a palavra de Deus ao redor do mundo.",
    type: "website",
  },
};