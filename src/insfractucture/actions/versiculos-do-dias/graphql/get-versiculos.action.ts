import { IVersiculoDoDia, IVersiculoDoDiaStrapiData } from "@/insfractucture/interfaces/versiculos-do-dias/versiculos-do-dias.interfaces";
import axios from "axios";

const strapiGraphQLURL =
  process.env.NEXT_PUBLIC_API_URL_GRAPHQL ||
  "http://strapi-strapibackend-qgcuz6-1680e6-31-97-168-219.traefik.me/graphql";

interface VersiculoDoDiaGraphQLProps {
  page?: number;
  pageSize?: number;
  sort?: string;
}

interface VersiculoDoDiaGraphQLActionResponse {
  versiculos: IVersiculoDoDia[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    pageCount: number;
  };
}

// Mapper inline (o puedes moverlo a tu carpeta de mappers)
const mapVersiculoFromStrapi = (
  data: IVersiculoDoDiaStrapiData
): IVersiculoDoDia => ({
  id: data.id,
  name: data.attributes.name,
  descriptions: data.attributes.descriptions,
  type: data.attributes.type,
  createdAt: data.attributes.createdAt,
  updatedAt: data.attributes.updatedAt,
  publishedAt: data.attributes.publishedAt,
});

/**
 * Obtiene todos los versículos do dia con paginación
 */
export const versiculoDoDiaGetAllGraphQLAction = async ({
  page = 1,
  pageSize = 25,
  sort = "createdAt:desc",
}: VersiculoDoDiaGraphQLProps = {}): Promise<VersiculoDoDiaGraphQLActionResponse> => {
  try {
    const query = `
      query GetVersiculosDoDia($page: Int, $pageSize: Int, $sort: [String]) {
        versiculoDoDias(
          sort: $sort
          pagination: { page: $page, pageSize: $pageSize }
        ) {
          data {
            id
            attributes {
              name
              descriptions
              type
              createdAt
              updatedAt
              publishedAt
            }
          }
          meta {
            pagination {
              total
              page
              pageSize
              pageCount
            }
          }
        }
      }
    `;

    const response = await axios.post(
      strapiGraphQLURL,
      {
        query,
        variables: {
          page,
          pageSize,
          sort: [sort],
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.errors) {
      console.error("GraphQL errors:", response.data.errors);
      throw new Error("GraphQL query failed");
    }

    const strapiData = response.data.data.versiculoDoDias;

    const versiculos = strapiData.data.map(mapVersiculoFromStrapi);
    const pagination = strapiData.meta.pagination;

    return { versiculos, pagination };
  } catch (error) {
    console.error("Error fetching versículos do dia from GraphQL:", error);
    throw error;
  }
};

/**
 * Obtiene solo el primer versículo (el más reciente) - ideal para la home
 */
export const versiculoDoDiaGetLatestGraphQLAction =
  async (): Promise<IVersiculoDoDia | null> => {
    try {
      const result = await versiculoDoDiaGetAllGraphQLAction({
        page: 1,
        pageSize: 1,
        sort: "createdAt:desc",
      });

      return result.versiculos[0] ?? null;
    } catch (error) {
      console.error("Error fetching latest versículo do dia:", error);
      return null;
    }
  };