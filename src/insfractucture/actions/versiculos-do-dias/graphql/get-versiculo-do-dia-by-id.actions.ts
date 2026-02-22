
import axios from "axios";
import { IVersiculoResponse } from "@/insfractucture/interfaces/versiculo/versiculo-do-dia.interfaces";
import { VersiculoMappers } from "@/insfractucture/mappers/versiculo/versiculo-do-dia.mappers";

const strapiGraphQLURL =
  process.env.NEXT_PUBLIC_API_URL_GRAPHQL || "http://localhost:1337/graphql";

export const versiculoDoDiaGetByIdGraphQLAction = async (
  id: string
): Promise<IVersiculoResponse> => {
  try {
    const query = `
      query GetVersiculoDoDia($id: ID!) {
        versiculoDoDia(id: $id) {
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

    console.log(`📖 Buscando versículo por ID: ${id}`);

    const response = await axios.post(
      strapiGraphQLURL,
      { query, variables: { id } },
      { headers: { "Content-Type": "application/json" } }
    );

    if (response.data.errors) {
      console.error("GraphQL errors:", response.data.errors);
      throw new Error(
        response.data.errors[0]?.message || "GraphQL query failed"
      );
    }

    const data = response.data.data?.versiculoDoDia?.data;

    if (!data) {
      throw new Error(`Versículo com ID "${id}" não encontrado`);
    }

    console.log(`✅ Versículo encontrado: "${data.attributes.name}"`);

    return VersiculoMappers.fromEntityToResponse(data);
  } catch (error) {
    console.error(`Error fetching versículo by ID (${id}):`, error);
    throw error;
  }
};