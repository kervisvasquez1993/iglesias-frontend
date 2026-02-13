import { FormularioComponent } from "@/components/sections/home/formulario";
import { VersiculoDelDia } from "@/components/sections/home/VersiculoDelDia";
import { TestimonioSection } from "@/components/sections/home/TestimonioSection";
import { Metadata } from "next";
import { EventosCarousel } from "@/components/sections/eventos/eventos.components";
import { SermonesCarousel } from "@/components/sections/sermones/sermones.components";
import { BlogsCarousel } from "@/components/sections/blog/blog-carousel.components";
import { blogGetAllGraphQLAction } from "@/insfractucture/actions/blogs/graphql/get-blogs-actions";
import { eventoGetAllGraphQLAction } from "@/insfractucture/actions/eventos/graphql/get-eventos.actions";
import { CarruselImagenComponents } from "@/components/sections/home/CarruselImagen";
import { LocationSectionComplete } from "@/components/sections/mapa/mapa-section";
import { sermonGetAllGraphQLAction } from "@/insfractucture/actions/sermones/graphql/get-all-sermones.actions";

import MinimalHero from "./components/hero";
import { versiculoDoDiaGetLatestGraphQLAction } from "@/insfractucture/actions/versiculos-do-dias/graphql/get-versiculos.action";

async function getHomePageData() {
  try {
    const [blogsResult, eventosResult, sermonesResult, versiculoResult] =
      await Promise.allSettled([
        blogGetAllGraphQLAction({ page: 1, pageSize: 6 }),
        eventoGetAllGraphQLAction({ page: 1, pageSize: 6 }),
        sermonGetAllGraphQLAction({ page: 1, pageSize: 6 }),
        versiculoDoDiaGetLatestGraphQLAction(),
      ]);

    const blogs =
      blogsResult.status === "fulfilled"
        ? blogsResult.value.blogs.slice(0, 6)
        : [];
    const eventos =
      eventosResult.status === "fulfilled"
        ? eventosResult.value.eventos.slice(0, 6)
        : [];
    const sermones =
      sermonesResult?.status === "fulfilled"
        ? sermonesResult.value.sermones.slice(0, 6)
        : [];
    const versiculo =
      versiculoResult.status === "fulfilled"
        ? versiculoResult.value
        : null;

    return {
      blogs,
      eventos,
      sermones,
      versiculo,
    };
  } catch (error) {
    console.error(error);
    return {
      blogs: [],
      eventos: [],
      sermones: [],
      versiculo: null,
    };
  }
}

export default async function Home() {
  const { blogs, eventos, sermones, versiculo } = await getHomePageData();

  return (
    <main className="min-h-screen bg-white">
      <MinimalHero />
      <EventosCarousel eventos={eventos} />
      <CarruselImagenComponents backgroundVariant="dark" />
      <TestimonioSection backgroundVariant="gradient" />
      <LocationSectionComplete backgroundVariant="white" />
      <BlogsCarousel blogs={blogs} backgroundVariant="gradient" />
      <VersiculoDelDia versiculo={versiculo} />
      <SermonesCarousel sermones={sermones} />
      <FormularioComponent />
    </main>
  );
}

export const metadata: Metadata = {
  title: "Igreja Batista Renovada Sonho de Deus | Santo André - SP",
  description:
    "Bem-vindo à Igreja Batista Renovada Sonho de Deus em Santo André. Um lugar de fé, esperança e amor onde você encontrará comunhão, crescimento espiritual e a presença de Deus. Participe dos nossos cultos, eventos e estudos bíblicos.",
  keywords: [
    "Igreja Batista Renovada",
    "Sonho de Deus",
    "Santo André",
    "Igreja evangélica",
    "Cultos",
    "Estudos bíblicos",
    "Comunidade cristã",
    "Fé",
    "Esperança",
    "Amor",
    "EBD",
    "Jardim Marek",
  ],
  applicationName: "Igreja Batista Renovada Sonho de Deus",
  category: "Religion",
  classification: "Igreja Evangélica",
  authors: [{ name: "Igreja Batista Renovada Sonho de Deus" }],
  creator: "Igreja Batista Renovada Sonho de Deus",
  publisher: "Igreja Batista Renovada Sonho de Deus",
  other: {
    "geo.region": "BR-SP",
    "geo.placename": "Santo André",
    "geo.position": "-23.6743587;-46.4922899",
    ICBM: "-23.6743587, -46.4922899",
    address:
      "Rua Luis Gomes Pain, nº 300, Jardim Marek, Santo André - SP, 09111-580",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title: "Igreja Batista Renovada Sonho de Deus | Santo André - SP",
    description:
      "Um lugar de fé, esperança e amor em Santo André. Venha fazer parte da nossa comunidade cristã e crescer espiritualmente conosco.",
    url: "https://seudominio.com.br",
    siteName: "Igreja Batista Renovada Sonho de Deus",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Igreja Batista Renovada Sonho de Deus - Logo",
        type: "image/jpeg",
      },
      {
        url: "/hero/hero-imagen.png",
        width: 1200,
        height: 630,
        alt: "Igreja Batista Renovada Sonho de Deus - Bem-vindos",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Igreja Batista Renovada Sonho de Deus",
    description:
      "Um lugar de fé, esperança e amor em Santo André - SP. Venha nos conhecer!",
    images: ["/logo.jpg"],
    creator: "@ibr_sonhodedeus",
  },
  icons: {
    icon: [{ url: "/logo.jpg", sizes: "32x32", type: "image/jpeg" }],
    apple: [{ url: "/logo.jpg", sizes: "180x180", type: "image/jpeg" }],
  },
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://seudominio.com.br",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};