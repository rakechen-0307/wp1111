import { gql } from '@apollo/client';

export const MESSAGE_SUBSCRIPTION = gql`
  subscription message($sender: String!, $to: String!){
    message(sender: $sender, to: $to){
      sender
      body
    }
  }
`;
