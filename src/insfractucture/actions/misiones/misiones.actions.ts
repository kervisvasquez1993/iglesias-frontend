import { IMisioneroResponse } from "@/insfractucture/interfaces/misiones/misiones.interfaces";
import { MisioneroMappers } from "@/insfractucture/mappers/misiones/misiones.mappers";
import axios from "axios";

const strapiGraphQLURL =
  process.env.NEXT_PUBLIC_API_URL_GRAPHQL ||
  "http://strapi-strapibackend-qgcuz6-1680e6-31-97-168-219.traefik.me/graphql";

interface MisioneroGraphQLProps {
  page?: number;
  pageSize?: number;
}

interface MisioneroGraphQLActionResponse {
  misioneros: IMisioneroResponse[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    pageCount: number;
  };
}

// Fragment reutilizable para los campos de misionero
const MISIONERO_FIELDS = `
  id
  attributes {
    title
    slug
    Descriptions
    publishedAt
    createdAt
    updatedAt
    imagen {
      data {
        id
        attributes {
          name
          url
          mime
          ext
          size
          alternativeText
        }
      }
    }
    file {
      data {
        id
        attributes {
          name
          url
          mime
          ext
          size
          alternativeText
        }
      }
    }
  }
`;

/**
 * Obtener todos los misioneros con paginación
 */
export const misioneroGetAllGraphQLAction = async ({
  page = 1,
  pageSize = 10,
}: MisioneroGraphQLProps): Promise<MisioneroGraphQLActionResponse> => {
  try {
    const query = `
      query GetMisioneros($page: Int, $pageSize: Int) {
        misioneros(pagination: { page: $page, pageSize: $pageSize }, sort: "publishedAt:desc") {
          data {
            ${MISIONERO_FIELDS}
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

    const mappedResponse = MisioneroMappers.fromStrapiGraphQLResponseToEntity(response.data);
    return mappedResponse;
  } catch (error) {
    console.error("Error fetching misioneros from GraphQL:", error);
    throw error;
  }
};

/**
 * Obtener un misionero por slug
 */
export const misioneroGetBySlugGraphQLAction = async ({
  slug,
}: {
  slug: string;
}): Promise<MisioneroGraphQLActionResponse> => {
  try {
    const query = `
      query GetMisioneroBySlug($slug: String!) {
        misioneros(filters: { slug: { eq: $slug } }) {
          data {
            ${MISIONERO_FIELDS}
          }
        }
      }
    `;

    const response = await axios.post(
      strapiGraphQLURL,
      {
        query,
        variables: { slug },
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.data.errors) {
      console.error("GraphQL errors:", response.data.errors);
      throw new Error("GraphQL query failed");
    }

    if (!response.data.data.misioneros.data.length) {
      throw new Error(`Misionero com slug "${slug}" não encontrado`);
    }

    const mappedResponse = MisioneroMappers.fromStrapiGraphQLResponseToEntity(response.data);
    return mappedResponse;
  } catch (error) {
    console.error(`Error fetching misionero by slug (${slug}):`, error);
    throw error;
  }
};

/**
 * Obtener todos los misioneros sin paginación (simple)
 */
export const misioneroGetAllGraphQLSimpleAction = async (): Promise<IMisioneroResponse[]> => {
  try {
    const query = `
      query {
        misioneros(sort: "publishedAt:desc") {
          data {
            ${MISIONERO_FIELDS}
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

    const mappedMisioneros = MisioneroMappers.fromStrapiGraphQLArrayToEntity(
      response.data.data.misioneros.data
    );

    return mappedMisioneros;
  } catch (error) {
    console.error("Error fetching misioneros from GraphQL:", error);
    throw error;
  }
};