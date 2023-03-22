import { useQuery } from "react-query";
import { GET } from "../api/DatabaseServiceImp";
import CONSTANTS from "../configurations/constants";

const getData = async (endpoint, location) => {
  const res = await GET(`${endpoint}?key=${CONSTANTS.API_KEY}&q=${location}`);
  if (res) {
    return res;
  } else {
    throw new Error("Error while fetching data");
  }
};

export default function useFetchData(id, endpoint, location) {
  return useQuery([id, endpoint, location], () => getData(endpoint, location), {
    enabled: location !== "" && location.length > 2,
  });
}
