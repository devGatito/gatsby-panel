import { gql } from "@utils";

// Consultas de Usuarios
export const $getUser = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      name
      phone
      email
	  status
      role
    }
  }
`;

export const $getUsers = gql`
  query GetUsers {
    getUsers {
      id
      uuid
      name
      phone
      email
	  status
      role
      created_at
    }
  }
`;
