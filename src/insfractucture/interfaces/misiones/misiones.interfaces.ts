// Respuesta mapeada del misionero
export interface IMisioneroResponse {
  id: string;
  title: string;
  slug: string;
  descriptions: string;
  files: IMisioneroFile[];
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface IMisioneroFile {
  id: string;
  name: string;
  url: string;
  mime: string;
  ext: string;
  size: number;
  alternativeText: string | null;
}

// Tipos de la respuesta raw de Strapi GraphQL
export interface StrapiMisioneroGraphQLResponse {
  data: {
    misioneros: {
      data: StrapiMisioneroEntity[];
      meta?: {
        pagination: PaginationMeta;
      };
    };
  };
}

export interface StrapiMisioneroEntity {
  id: string;
  attributes: {
    title: string;
    slug: string;
    Descriptions: string;
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
    file: {
      data: StrapiUploadFileEntity[];
    };
  };
}

export interface StrapiUploadFileEntity {
  id: string;
  attributes: {
    name: string;
    url: string;
    mime: string;
    ext: string;
    size: number;
    alternativeText: string | null;
  };
}

export interface PaginationMeta {
  total: number;
  page: number;
  pageSize: number;
  pageCount: number;
}