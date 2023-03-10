import { useQuery } from "@apollo/client";
import { GET_SINGLE_REPOSITORY } from "../graphql/queries";

const useSingleRepository = ({ repositoryId }) => {
  const { data, ...result } = useQuery(GET_SINGLE_REPOSITORY, {
    fetchPolicy: "cache-and-netwok",
    variables: { repositoryId },
  });

  console.log(data);
  return { repository: data ? data?.repository : undefined, ...result };
};

export default useSingleRepository;
