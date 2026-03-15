// src/insfractucture/actions/sermones/graphql/get-all-sermones.actions.ts

import axios from 'axios';
import { SermonResponse } from '@/insfractucture/interfaces/sermones/sermones.interfaces';
import { SermonMappers } from '@/insfractucture/mappers/sermones/sermones.mapers';

const strapiGraphQLURL =
  process.env.NEXT_PUBLIC_API_URL_GRAPHQL ||
  'http://strapi-strapibackend-qgcuz6-1680e6-31-97-168-219.traefik.me/graphql';

interface SermonGraphQLProps {
  page?: number;
  pageSize?: number;
}

interface SermonGraphQLActionResponse {
  sermones: SermonResponse[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    pageCount: number;
  };
}

// ─── Fragment reutilizable con todos los campos ────────────────────────
const SERMON_FIELDS = `
  titulo
  slug
  url_youtube
  url_facebook
  type
  contents
  pregador
  conclusoes
  activo
  createdAt
  updatedAt
  publishedAt
`;

// ─── GET ALL (con paginación) ──────────────────────────────────────────
export const sermonGetAllGraphQLAction = async ({
  page = 1,
  pageSize = 10,
}: SermonGraphQLProps): Promise<SermonGraphQLActionResponse> => {
  try {
    const query = `
      query GetSermones($page: Int, $pageSize: Int) {
        sermones(pagination: { page: $page, pageSize: $pageSize }) {
          data {
            id
            attributes {
              ${SERMON_FIELDS}
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
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.errors) {
      console.error('GraphQL errors:', response.data.errors);
      throw new Error('GraphQL query failed');
    }

    const mappedResponse =
      SermonMappers.fromStrapiGraphQLResponseToEntity(response.data);

    return mappedResponse;
  } catch (error) {
    console.error('Error fetching sermon data from GraphQL:', error);
    throw error;
  }
};

// ─── GET ALL (sin paginación) ──────────────────────────────────────────
export const sermonGetAllGraphQLSimpleAction = async (): Promise<
  SermonResponse[]
> => {
  try {
    const query = `
      query {
        sermones {
          data {
            id
            attributes {
              ${SERMON_FIELDS}
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
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.errors) {
      console.error('GraphQL errors:', response.data.errors);
      throw new Error('GraphQL query failed');
    }

    const mappedSermones = SermonMappers.fromStrapiGraphQLArrayToEntity(
      response.data.data.sermones.data
    );

    return mappedSermones;
  } catch (error) {
    console.error('Error fetching sermon data from GraphQL:', error);
    throw error;
  }
};

// ─── GET BY ID ─────────────────────────────────────────────────────────
export const sermonGetByIdGraphQLAction = async (
  id: string
): Promise<SermonResponse | null> => {
  try {
    const query = `
      query GetSermonById($id: ID!) {
        sermon(id: $id) {
          data {
            id
            attributes {
              ${SERMON_FIELDS}
            }
          }
        }
      }
    `;

    const response = await axios.post(
      strapiGraphQLURL,
      {
        query,
        variables: { id },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.errors) {
      console.error('GraphQL errors:', response.data.errors);
      throw new Error('GraphQL query failed');
    }

    const sermon = response.data.data.sermon.data;

    if (!sermon) {
      return null;
    }

    const mappedSermon = SermonMappers.fromStrapiGraphQLToEntity(sermon);
    return mappedSermon;
  } catch (error) {
    console.error('Error fetching sermon by ID:', error);
    throw error;
  }
};

// ─── GET BY SLUG ───────────────────────────────────────────────────────
export const sermonGetBySlugGraphQLAction = async (
  slug: string
): Promise<SermonResponse | null> => {
  try {
    const query = `
      query GetSermonBySlug($slug: String!) {
        sermones(filters: { slug: { eq: $slug } }, pagination: { page: 1, pageSize: 1 }) {
          data {
            id
            attributes {
              ${SERMON_FIELDS}
            }
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
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.errors) {
      console.error('GraphQL errors:', response.data.errors);
      throw new Error('GraphQL query failed');
    }

    const sermones = response.data.data.sermones.data;

    if (!sermones || sermones.length === 0) {
      return null;
    }

    const mappedSermon = SermonMappers.fromStrapiGraphQLToEntity(sermones[0]);
    return mappedSermon;
  } catch (error) {
    console.error('Error fetching sermon by slug:', error);
    throw error;
  }
};