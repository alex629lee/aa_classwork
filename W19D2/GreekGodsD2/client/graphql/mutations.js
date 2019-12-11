import gql from "graphql-tag";

export default {
  DELETE_GOD: gql`
    mutation DeleteGod($id: ID!) {
      deleteGod(id: $id) {
        id 
      }
    }
  `,
  NEW_GOD: gql`
    mutation NewGod($name: String, $type: String, $description: String) {
      newGod(name: $name, type: $type, description: $description) {
        id
        name
        description
      }
    }
  `,
  NEW_ABODE: gql`
    mutation NewAbode($name: String, $coordinates: String) {
      newAbode(name: $name, coordinates: $coordinates) {
        id
        name
        coordinates
      }
    }
  `,
  NEW_EMBLEM: gql`
    mutation NewEmblem($name: String) {
      newEmblem(name: $name) {
        id
        name
      }
    }
  `,
  UPDATE_GOD_NAME: gql`
    mutation updateGod($id: ID!, $name: String) {
      updateGod(id: $id, name: $name) {
        id
        name
      }
    }
  `,
  UPDATE_GOD_TYPE: gql`
    mutation updateGod($id: ID!, $type: String) {
      updateGod(id: $id, type: $type) {
        id 
        type
      }
    }
  `,
  UPDATE_GOD_DESCRIPTION: gql`
    mutation updateGod($id: ID!, $description: String) {
      updateGod(id: $id, description: $description) {
        id 
        description
      }
    }
  `,
  ADD_GOD_DOMAIN: gql`
    mutation addGodDomain($godId: ID!, $domain: String!) {
      addGodDomain(godId: $godId, domain: $domain) {
        id
        domains
      }
    }
  `,
  REMOVE_GOD_DOMAIN: gql`
    mutation removeGodDomain($godId: ID!, $domain: String!) {
      removeGodDomain(godId: $godId, domain: $domain) {
        id
        domains
      }
    }
  `,
  ADD_GOD_EMBLEM: gql`
    mutation addGodEmblem($godId: ID!, $emblemId: ID!) {
      addGodEmblem(godId: $godId, emblemId: $emblemId) {
        id
        emblems {
          id
          name
        }
      }
    }
  `,
  REMOVE_GOD_EMBLEM: gql`
    mutation removeGodEmblem($godId: ID!, $emblemId: ID!) {
      removeGodEmblem(godId: $godId, emblemId: $emblemId) {
        id
        emblems {
          id
          name
        }
      }
    }
  `,
  UPDATE_GOD_ABODE: gql`
    mutation updateGodAbode($godId: ID!, $abodeId: ID!) {
      updateGodAbode(godId: $godId, abodeId: $abodeId) {
        id 
        abode {
          id
          name
        }
      }
    }
  `,
  REMOVE_GOD_RELATIVE: gql`
    mutation removeGodRelative($godId: ID!, $relativeId: ID!, $relationship: String!) {
      removeGodRelative(godId: $godId, relativeId: $relativeId, relationship: $relationship) {
        id
        name
        parents {
          id
          name
        }
        siblings {
          id
          name
        }
        children {
          id
          name
        }
      }
    }
  `,
  ADD_GOD_RELATIVE: gql`
    mutation addGodRelative($godId: ID!, $relativeId: ID!, $relationship: String!) {
      addGodRelative(godId: $godId, relativeId: $relativeId, relationship: $relationship) {
        id
        name
        parents {
          id
          name
        }
        siblings {
          id
          name
        }
        children {
          id
          name
        }
      }
    }
  `
};
