// src/insfractucture/interfaces/sermones/sermones.interfaces.ts

// ─── Response mapeada para uso en componentes ──────────────────────────
export interface SermonResponse {
  id: number;
  titulo: string;
  slug: string;
  descripcion: string;
  url_youtube: string;
  url_facebook?: string | null;
  type: string;
  contents: string;
  pregador: string;
  conclusoes: string;
  activo: boolean;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  youtube_video_id: string;
  youtube_embed_url: string;
  youtube_thumbnail: string;
}

export type SermonsResponse = SermonResponse[];

export interface CreateSermonPayload {
  titulo: string;
  descripcion: string;
  url_youtube: string;
  url_facebook?: string;
  type?: string;
  contents?: string;
  pregador?: string;
  conclusoes?: string;
  activo?: boolean;
}

export interface UpdateSermonPayload {
  titulo?: string;
  descripcion?: string;
  url_youtube?: string;
  url_facebook?: string;
  type?: string;
  contents?: string;
  pregador?: string;
  conclusoes?: string;
  activo?: boolean;
}

// ─── Interfaces GraphQL de Strapi ──────────────────────────────────────
export interface IStrapiGraphQLSermonResponse {
  data: {
    sermones: {
      data: IStrapiGraphQLSermonData[];
      meta: {
        pagination: {
          total: number;
          page: number;
          pageSize: number;
          pageCount: number;
        };
      };
    };
  };
}

export interface IStrapiGraphQLSermonData {
  id: string;
  attributes: {
    titulo: string;
    slug: string;
    url_youtube: string;
    url_facebook: string | null;
    type: string;
    contents: string;
    pregador: string;
    conclusoes: string;
    activo: boolean;
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string | null;
  };
}

export interface IStrapiGraphQLSermonSimpleResponse {
  data: {
    sermones: {
      data: IStrapiGraphQLSermonData[];
    };
  };
}