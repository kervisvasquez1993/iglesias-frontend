import { IStrapiVersiculosRawResponse, IVersiculoEntity, IVersiculoResponse, IVersiculosActionResponse } from "@/insfractucture/interfaces/versiculo/versiculo-do-dia.interfaces";

export class VersiculoMappers {
  /**
   * Convierte una entidad raw de Strapi al objeto que usa la UI
   */
  static fromEntityToResponse(entity: IVersiculoEntity): IVersiculoResponse {
    return {
      id: entity.id,
      name: entity.attributes.name,
      descriptions: entity.attributes.descriptions,
      type: entity.attributes.type,
      publishedAt: entity.attributes.publishedAt,
      createdAt: entity.attributes.createdAt,
    };
  }

  /**
   * Convierte la respuesta completa de GraphQL (con paginación)
   * al formato que devuelven los actions
   */
  static fromStrapiGraphQLResponseToEntity(
    raw: IStrapiVersiculosRawResponse
  ): IVersiculosActionResponse {
    const { data, meta } = raw.data.versiculoDoDias;

    return {
      versiculos: data.map((entity) => this.fromEntityToResponse(entity)),
      pagination: {
        total: meta.pagination.total,
        page: meta.pagination.page,
        pageSize: meta.pagination.pageSize,
        pageCount: meta.pagination.pageCount,
      },
    };
  }

  /**
   * Convierte solo el array de entidades (sin paginación)
   */
  static fromStrapiGraphQLArrayToEntity(
    entities: IVersiculoEntity[]
  ): IVersiculoResponse[] {
    return entities.map((entity) => this.fromEntityToResponse(entity));
  }
}