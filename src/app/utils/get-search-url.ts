export const getSearchUrl = (query: string, search_uuid: string) => {
  const prefix = "http://172.22.121.63:32323/api/v1/base/arerank";
  return `${prefix}?keyword=${encodeURIComponent(query)}&rid=${search_uuid}`;
};
