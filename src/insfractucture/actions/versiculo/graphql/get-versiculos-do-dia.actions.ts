
import { IGetVersiculosParams, IVersiculosActionResponse } from "@/insfractucture/interfaces/versiculo/versiculo-do-dia.interfaces";
import { VersiculoMappers } from "@/insfractucture/mappers/versiculo/versiculo-do-dia.mappers";
import axios from "axios";


const strapiGraphQLURL =
  process.env.NEXT_PUBLIC_API_URL_GRAPHQL ||
  "http://localhost:1337/graphql";

/**
 * Trae todos los versículos del día con paginación
 */
export const versiculosDoDiaGetAllGraphQLAction = async ({
  page = 1,
  pageSize = 25,
  sort = "createdAt:desc",
  publicationState = "LIVE",
}: IGetVersiculosParams = {}): Promise<IVersiculosActionResponse> => {
  try {
    const query = `
      query GetVersiculosDoDia($page: Int, $pageSize: Int) {
        versiculoDoDias(
          sort: "${sort}"
          pagination: { page: $page, pageSize: $pageSize }
          publicationState: ${publicationState}
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

    console.log("📖 Cargando versículos del día...");

    const response = await axios.post(
      strapiGraphQLURL,
      {
        query,
        variables: { page, pageSize },
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.data.errors) {
      console.error("GraphQL errors:", response.data.errors);
      throw new Error("GraphQL query failed");
    }

    console.log(
      `✅ Versículos cargados: ${response.data.data.versiculoDoDias.data.length}`
    );

    return VersiculoMappers.fromStrapiGraphQLResponseToEntity(response.data);
  } catch (error) {
    console.error("Error fetching versículos do dia from GraphQL:", error);
    throw error;
  }
};

/**
 * Trae solo el array de versículos sin info de paginación
 */
export const versiculosDoDiaGetAllSimpleGraphQLAction =
  async (): Promise<IVersiculosActionResponse["versiculos"]> => {
    try {
      const query = `
      query {
        versiculoDoDias(
          sort: "createdAt:desc"
          publicationState: LIVE
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
        }
      }
    `;

      const response = await axios.post(
        strapiGraphQLURL,
        { query },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.errors) {
        console.error("GraphQL errors:", response.data.errors);
        throw new Error("GraphQL query failed");
      }

      return VersiculoMappers.fromStrapiGraphQLArrayToEntity(
        response.data.data.versiculoDoDias.data
      );
    } catch (error) {
      console.error(
        "Error fetching versículos do dia (simple) from GraphQL:",
        error
      );
      throw error;
    }
  };