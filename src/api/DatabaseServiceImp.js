import DatabaseService from "./DatabaseService";

export const GET = (endpoint) => {
  return DatabaseService.GET(endpoint);
};
