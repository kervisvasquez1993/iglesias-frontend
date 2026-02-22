import {
  IMisioneroFile,
  IMisioneroResponse,
  PaginationMeta,
  StrapiMisioneroEntity,
  StrapiMisioneroGraphQLResponse,
} from "@/insfractucture/interfaces/misiones/misiones.interfaces";

const STRAPI_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://strapi-strapibackend-qgcuz6-1680e6-31-97-168-219.traefik.me";

export class MisioneroMappers {
  /**
   * Resuelve URL relativa a absoluta
   */
  private static resolveUrl(url: string): string {
    return url.startsWith("http") ? url : `${STRAPI_BASE_URL}${url}`;
  }

  /**
   * Mapea un entity individual de Strapi a nuestra interface
   */
  static fromStrapiEntityToEntity(entity: StrapiMisioneroEntity): IMisioneroResponse {
    const { attributes } = entity;

    // Mapear archivos múltiples (file)
    const files: IMisioneroFile[] = (attributes.file?.data ?? []).map((fileEntity) => ({
      id: fileEntity.id,
      name: fileEntity.attributes.name,
      url: this.resolveUrl(fileEntity.attributes.url),
      mime: fileEntity.attributes.mime,
      ext: fileEntity.attributes.ext,
      size: fileEntity.attributes.size,
      alternativeText: fileEntity.attributes.alternativeText,
    }));

    // Mapear imagen principal (single media)
    const imagenData = attributes.imagen?.data;
    const image = imagenData
      ? this.resolveUrl(imagenData.attributes.url)
      : null;

    return {
      id: entity.id,
      title: attributes.title,
      slug: attributes.slug,
      descriptions: attributes.Descriptions,
      image,
      files,
      publishedAt: attributes.publishedAt,
      createdAt: attributes.createdAt,
      updatedAt: attributes.updatedAt,
    };
  }

  /**
   * Mapea un array de entities de Strapi
   */
  static fromStrapiGraphQLArrayToEntity(entities: StrapiMisioneroEntity[]): IMisioneroResponse[] {
    return entities.map((entity) => this.fromStrapiEntityToEntity(entity));
  }

  /**
   * Mapea la respuesta completa de GraphQL (con paginación)
   */
  static fromStrapiGraphQLResponseToEntity(response: StrapiMisioneroGraphQLResponse): {
    misioneros: IMisioneroResponse[];
    pagination: PaginationMeta;
  } {
    const { data } = response;
    const misionerosData = data.misioneros.data;
    const pagination = data.misioneros.meta?.pagination ?? {
      total: misionerosData.length,
      page: 1,
      pageSize: misionerosData.length,
      pageCount: 1,
    };

    return {
      misioneros: this.fromStrapiGraphQLArrayToEntity(misionerosData),
      pagination,
    };
  }
}