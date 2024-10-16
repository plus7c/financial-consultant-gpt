export const getSearchUrl = (query: string, search_uuid: string) => {
  const prefix = "/search";
  return `${prefix}?keyword=${encodeURIComponent(query)}&rid=${search_uuid}`;
};
