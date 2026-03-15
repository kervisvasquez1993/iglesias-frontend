// app/sermones/[slug]/page.tsx

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { sermonGetBySlugGraphQLAction } from "@/insfractucture/actions/sermones/graphql/get-all-sermones.actions";
import { SermonDetailComponent } from "../components/SermonDetail";

interface SermonDetailPageProps {
  params: Promise<{ slug: string }>;
}

async function getSermonBySlug(slug: string) {
  try {
    const sermon = await sermonGetBySlugGraphQLAction(slug);
    return sermon;
  } catch (error) {
    console.error("Erro ao buscar sermão por slug:", error);
    return null;
  }
}

export default async function SermonDetailPage({
  params,
}: SermonDetailPageProps) {
  const resolvedParams = await params;
  const sermon = await getSermonBySlug(resolvedParams.slug);

  if (!sermon) {
    notFound();
  }

  return (
    <div suppressHydrationWarning={true}>
      <SermonDetailComponent sermon={sermon} />
    </div>
  );
}

export async function generateMetadata({
  params,
}: SermonDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const sermon = await getSermonBySlug(resolvedParams.slug);

  if (!sermon) {
    return {
      title: "Sermão não encontrado | Igreja Batista Renovada Sonho de Deus",
    };
  }

  const description = sermon.contents
    ? sermon.contents
        .replace(/[#*_`~>\[\]()!|-]/g, "")
        .replace(/\n+/g, " ")
        .trim()
        .slice(0, 160)
    : "Ouça este sermão transformador da Igreja Batista Renovada Sonho de Deus.";

  return {
    title: `${sermon.titulo} | Sermões | Igreja Batista Renovada Sonho de Deus`,
    description,
    keywords: `sermão, ${sermon.pregador || "pregação"}, ${sermon.type || "estudo bíblico"}, igreja batista, bíblia`,
    authors: [{ name: sermon.pregador || "Igreja Batista Renovada Sonho de Deus" }],
    openGraph: {
      title: `${sermon.titulo} | Sermões`,
      description,
      type: "article",
      url: `/sermones/${sermon.slug}`,
      siteName: "Igreja Batista Renovada Sonho de Deus",
      images: sermon.youtube_thumbnail
        ? [{ url: sermon.youtube_thumbnail, width: 1280, height: 720 }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: sermon.titulo,
      description,
      images: sermon.youtube_thumbnail ? [sermon.youtube_thumbnail] : undefined,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}