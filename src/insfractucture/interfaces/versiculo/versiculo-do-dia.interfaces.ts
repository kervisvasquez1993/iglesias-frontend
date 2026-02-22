

// ─── Raw Strapi entities ───────────────────────────────────────────────────────

export interface IVersiculoAttributes {
  name: string | null;
  descriptions: string;
  type: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface IVersiculoEntity {
  id: string;
  attributes: IVersiculoAttributes;
}

// ─── Mapped entity (usado por la UI) ──────────────────────────────────────────

export interface IVersiculoResponse {
  id: string;
  name: string | null;
  descriptions: string;
  type: string | null;
  publishedAt: string;
  createdAt: string;
}

// ─── Pagination ────────────────────────────────────────────────────────────────

export interface PaginationMeta {
  total: number;
  page: number;
  pageSize: number;
  pageCount: number;
}

// ─── Raw GraphQL response ──────────────────────────────────────────────────────

export interface IStrapiVersiculosRawResponse {
  data: {
    versiculoDoDias: {
      data: IVersiculoEntity[];
      meta: {
        pagination: PaginationMeta;
      };
    };
  };
}

// ─── Action response ───────────────────────────────────────────────────────────

export interface IVersiculosActionResponse {
  versiculos: IVersiculoResponse[];
  pagination: PaginationMeta;
}

// ─── Action params ─────────────────────────────────────────────────────────────

export interface IGetVersiculosParams {
  page?: number;
  pageSize?: number;
  sort?: string;
  publicationState?: "LIVE" | "PREVIEW";
}