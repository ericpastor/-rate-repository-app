import { gql } from "@apollo/client";

export const SIGN_IN = gql`
  mutation Authenticate($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

export const SIGN_UP = gql`
  mutation ($user: CreateUserInput) {
    createUser(user: $user) {
      username
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation CreateReview($review: CreateReviewInput) {
    createReview(review: $review) {
      repositoryId
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation ($deleteReviewId: ID!) {
    deleteReview(id: $deleteReviewId)
  }
`;
