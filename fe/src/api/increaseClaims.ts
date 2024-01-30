import { gql } from '@apollo/client';

export const MUTATION = gql`
  mutation IncreaseClaims($destinationId: Int!) {
    increaseClaims(destinationId: $destinationId) {
      id
      claims
    }
  }
`