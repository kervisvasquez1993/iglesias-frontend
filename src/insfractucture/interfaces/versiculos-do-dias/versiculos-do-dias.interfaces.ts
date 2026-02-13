// Interface que viene de Strapi GraphQL
export interface IVersiculoDoDiaAttributes {
  name: string;
  descriptions: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface IVersiculoDoDiaStrapiData {
  id: string;
  attributes: IVersiculoDoDiaAttributes;
}

// Response del GraphQL de Strapi
export interface IVersiculoDoDiaStrapiResponse {
  data: {
    versiculoDoDias: {
      data: IVersiculoDoDiaStrapiData[];
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

// Interface mapeada para usar en el frontend
export interface IVersiculoDoDia {
  id: string;
  name: string;
  descriptions: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}