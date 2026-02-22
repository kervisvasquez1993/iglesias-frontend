import { IBlogResponse, PaginationMeta } from '@/insfractucture/interfaces/blogs/blog.interfaces';
import { EntradasBlogsComponent } from './components/BlogEspiritual';
import { blogGetAllGraphQLAction, blogGetSpanishGraphQLAction } from '@/insfractucture/actions/blogs/graphql/get-blogs-actions';
import { LanguageSelector } from '@/components/selectorIdioma';

async function getBlogsGraphQL(page: number = 1, locale: string = "pt"): Promise<{
  blogs: IBlogResponse[];
  pagination?: PaginationMeta;
  error?: string
}> {
  try {
  
    // Usar el action correspondiente según el locale
    const response = locale === "es" 
      ? await blogGetSpanishGraphQLAction({ page, pageSize: 10 })
      : await blogGetAllGraphQLAction({ page, pageSize: 10 });
             
    console.log(`✅ Blogs cargados: ${response.blogs.length} artículos en ${locale}`);
    
    return {
      blogs: response.blogs,
      pagination: response.pagination
    };
  } catch (error) {
    console.error(`Error fetching blogs from GraphQL (${locale}):`, error);
    
    // Si falla español, intentar portugués como fallback
    if (locale === "es") {
      console.warn("⚠️ Error al cargar blogs en español, intentando portugués como fallback...");
      try {
        const fallbackResponse = await blogGetAllGraphQLAction({ page, pageSize: 10 });
        return {
          blogs: fallbackResponse.blogs,
          pagination: fallbackResponse.pagination
        };
      } catch (fallbackError) {
        console.error("Error en fallback también:", fallbackError);
        return {
          blogs: [],
          error: locale === 'es' 
            ? 'Error al cargar los blogs desde GraphQL' 
            : 'Erro ao carregar os blogs do GraphQL'
        };
      }
    }
    
    return {
      blogs: [],
      error: locale === 'es' 
        ? 'Error al cargar los blogs desde GraphQL' 
        : 'Erro ao carregar os blogs do GraphQL'
    };
  }
}

interface BlogsPageProps {
  searchParams: Promise<{ page?: string; locale?: string }>;
}

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams.page) || 1;
  const locale = resolvedSearchParams.locale || "pt"; 
   
  console.log(`🔄 Usando GraphQL API para Blogs en idioma: ${locale}...`);
  const { blogs, error } = await getBlogsGraphQL(page, locale);
   
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-church-sky-50 via-white to-church-blue-50 flex items-center justify-center">
        <div className="container mx-auto px-4 ">
          <div className="max-w-md mx-auto bg-white/90 backdrop-blur-sm rounded-2xl  shadow-2xl border border-church-red-200 text-center">
            <div className="w-16 h-16 bg-church-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-church-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-church-red-600 mb-4">
              {locale === 'es' ? 'Ops! Algo salió mal' : 'Ops! Algo deu errado'}
            </h2>
            <p className="text-church-blue-700 mb-6">{error}</p>
            <div className="space-y-4">
              <p className="text-sm text-church-blue-600">
                {locale === 'es' 
                  ? 'No se pudieron cargar los blogs en este momento'
                  : 'Não foi possível carregar os blogs no momento'
                }
              </p>
              <button
                onClick={() => window.location.reload()}
                className="w-full px-6 py-3 bg-church-blue-500 hover:bg-church-blue-600 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {locale === 'es' ? 'Intentar de nuevo' : 'Tentar Novamente'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div suppressHydrationWarning={true}>
      {/* Selector de idioma */}
      <div className="container mx-auto px-4 py-4">
        <LanguageSelector currentLocale={locale} />
      </div>
      
      <EntradasBlogsComponent blogs={blogs} currentLocale={locale} />
    </div>
  );
}

// 🔧 FIX: Metadatos dinámicos según el idioma - ASYNC
export async function generateMetadata({ searchParams }: BlogsPageProps) {
  // Resolver la promesa de searchParams
  const resolvedSearchParams = await searchParams;
  const locale = resolvedSearchParams?.locale || 'pt';
  
  const metadata = {
    pt: {
      title: 'Blog Espiritual - Igreja Batista Renovada Sonho de Deus',
      description: 'Reflexões, estudos bíblicos e inspirações para fortalecer sua fé e crescimento espiritual.',
      keywords: 'blog espiritual, estudos bíblicos, reflexões cristãs, igreja batista, fé, crescimento espiritual',
    },
    es: {
      title: 'Blog Espiritual - Iglesia Bautista Renovada Sueño de Dios',
      description: 'Reflexiones, estudios bíblicos e inspiraciones para fortalecer tu fe y crecimiento espiritual.',
      keywords: 'blog espiritual, estudios bíblicos, reflexiones cristianas, iglesia bautista, fe, crecimiento espiritual',
    }
  };

  const currentMeta = metadata[locale as keyof typeof metadata] || metadata.pt;

  return {
    ...currentMeta,
    openGraph: {
      title: currentMeta.title,
      description: currentMeta.description,
      type: 'website',
    },
  };
}