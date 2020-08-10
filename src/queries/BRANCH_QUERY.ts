import { gql } from '@apollo/client';

const HoursOpen = gql`
  fragment HoursOpen on HoursOpen {
    from
    until
  }
`;

const BRANCH_QUERY = gql`
  query BranchQuery($id: ID!) {
    branch(id: $id) {
      connections {
        id
        name
        location {
          city
          county
          streetAddress
          postalCode
          position {
            latitude
            longitude
          }
        }
      }
      contact {
        name
        email
        phonenumber
        avatar
      }
      id
      description
      name
      homepage
      flags {
        mrf
        centralStorage
        ecommerce
      }
      logotype
      openingHours {
        monday {
          ...HoursOpen
        }
        tuesday {
          ...HoursOpen
        }
        wednesday {
          ...HoursOpen
        }
        thursday {
          ...HoursOpen
        }
        friday {
          ...HoursOpen
        }
        saturday {
          ...HoursOpen
        }
        sunday {
          ...HoursOpen
        }
      }
      organization {
        branches {
          id
        }
        parent {
          id
        }
      }
      location {
        position {
          latitude
          longitude
        }
        city
        county
        streetAddress
        postalCode
      }
      promos {
        description
        image
        title
      }
      services {
        markdown
        title
      }
    }
  }
  ${HoursOpen}
`;

export default BRANCH_QUERY;
