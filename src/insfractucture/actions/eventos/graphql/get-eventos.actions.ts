import axios from "axios";

import { EventoMappers } from "@/insfractucture/mappers/eventos/eventos.mappers";
import { IEventoResponse } from "@/insfractucture/interfaces/eventos/eventos.interfaces";

const strapiGraphQLURL =
  process.env.NEXT_PUBLIC_API_URL_GRAPHQL ||
  "http://strapi-strapibackend-qgcuz6-1680e6-31-97-168-219.traefik.me/graphql";

interface EventoGraphQLProps {
  page?: number;
  pageSize?: number;
}

// Respuesta del action que incluye eventos mapeados y paginación
interface EventoGraphQLActionResponse {
  eventos: IEventoResponse[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    pageCount: number;
  };
}

export const eventoGetAllGraphQLAction = async ({
  page = 1,
  pageSize = 10,
}: EventoGraphQLProps): Promise<EventoGraphQLActionResponse> => {
  try {
    const query = `
      query GetEventos($page: Int!, $pageSize: Int!) {
        eventos(
          sort: "rank:asc"
          pagination: { page: $page, pageSize: $pageSize }
        ) {
          data {
            id
            attributes {
              name
              descriptions
              data_inicio
              localizacao
              slug
              status
              imagem {
                data {
                  attributes {
                    name
                    url
                  }
                }
              }
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

    // Usar fetch nativo para aprovechar el cache de Next.js
    const response = await fetch(strapiGraphQLURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: {
          page,
          pageSize,
        },
      }),
      next: { 
        revalidate: 60, // Revalida cada 60 segundos
        tags: ['eventos'] // Para revalidación on-demand si lo necesitas
      },
    });

    const data = await response.json();

    if (data.errors) {
      console.error("GraphQL errors:", data.errors);
      throw new Error("GraphQL query failed");
    }

    return EventoMappers.fromStrapiGraphQLResponseToEntity(data);
  } catch (error) {
    console.error("Error fetching evento data from GraphQL:", error);
    throw error;
  }
};

// Action simplificado que devuelve solo el array de eventos (sin paginación)
export const eventoGetAllGraphQLSimpleAction = async (): Promise<
  IEventoResponse[]
> => {
  try {
    const query = `
   query {
    eventos(sort: "rank:asc"){
    data {
      id
      attributes {
        name,
        descriptions,
        data_inicio,
        localizacao,
        slug,
        imagem{
          data{
            attributes{
              name,
              url
            }
          }
        }
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
      { query },
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

    // Usar el mapper para convertir solo los eventos
    const mappedEventos = EventoMappers.fromStrapiGraphQLArrayToEntity(
      response.data.data.eventos.data
    );

    return mappedEventos;
  } catch (error) {
    console.error("Error fetching evento data from GraphQL:", error);
    throw error;
  }
};
