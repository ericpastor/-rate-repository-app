import { useQuery } from "@apollo/client";

import { ME } from "../graphql/queries";

const useMyReviews = (variables) => {
  const { data, ...result } = useQuery(ME, {
    fetchPolicy: "cache-and-network",
    variables,
  });
  return { me: data ? data.me : undefined, ...result };
};

export default useMyReviews;
