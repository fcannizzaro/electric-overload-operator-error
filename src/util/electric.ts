import { env } from "@/env";
import { ELECTRIC_PROTOCOL_QUERY_PARAMS } from "@electric-sql/client";

type Options = {
  transform?: (searchParams: URLSearchParams, url: URL) => void;
  skipCacheRevalidation?: boolean;
};

export const createElectricStream = async (
  request: Request,
  table: string,
  options: Options = {}
) => {
  const url = new URL(request.url);

  const originUrl = new URL(`/v1/shape`, env.ELECTRIC_HOST);

  // Only pass through Electric protocol parameters
  url.searchParams.forEach((value, key) => {
    if (
      ELECTRIC_PROTOCOL_QUERY_PARAMS.includes(key) ||
      key.startsWith("subset__")
    ) {
      originUrl.searchParams.set(key, value);
    }
  });

  originUrl.searchParams.set("table", `"${table}"`);

  if (options.transform) {
    options.transform(originUrl.searchParams, url);
  }

  const response = await fetch(originUrl);

  const headers = new Headers(response.headers);

  if (!options.skipCacheRevalidation) {
    headers.set("Vary", "Authorization, Cookie");
  }

  headers.delete(`content-encoding`);
  headers.delete(`content-length`);

  // localhost only
  headers.delete(`transfer-encoding`);

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
};

// export const createTypeSafeQuery = (table: any, expression: any) => {
//   const qb = new QueryBuilder();
//   const { sql: query } = qb.select().from(table).where(expression).toSQL();
//   return query.replace(/^SELECT .* FROM .* WHERE\s+/i, "");
// };
