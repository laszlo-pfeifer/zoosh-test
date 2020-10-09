import { gql } from '@apollo/client';

export const SEARCH_MOVIES = gql`
  query SearchMovies($term: String!, $cursor: String) {
    movies {
      search(term: $term, first: 10, after: $cursor) {
        totalCount,
        pageInfo {
          endCursor,
          hasNextPage,
          hasPreviousPage,
          startCursor
        },
        edges {
          node {
            id,
            title,
            rating,
            releaseDate,
            keywords {
              name
            },
            externalIds {
              imdb
            }
          }
        }
      }
    }
  }
`;