'use server';

import { sermonGetAllGraphQLAction } from '@/insfractucture/actions/sermones/graphql/get-all-sermones.actions';

// Server Action para cargar más sermones desde el cliente (scroll infinito)
export async function loadMoreSermonesAction(page: number, pageSize: number) {
  return sermonGetAllGraphQLAction({ page, pageSize });
}
