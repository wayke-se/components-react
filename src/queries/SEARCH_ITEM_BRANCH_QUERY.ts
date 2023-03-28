import { gql } from '@apollo/client';

const HoursOpen = gql`
  fragment HoursOpen on HoursOpen {
    from
    until
  }
`;

const SEARCH_ITEM_BRANCH_QUERY = gql`
  query SearchItemBranch($id: ID!, $branch: ID) {
    vehicle(id: $id, branch: $branch) {
      contact {
        name
        email
        phonenumber
        avatar
      }
      accessories {
        articleNumber
        description
        excerpt
        id
        images
        logotype
        manufacturer
        model
        name
        price
        assemblyPrice
        productPage {
          title
          url
        }
        salePrice
      }
      branch {
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
          authorizedReseller
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
      insuranceOptions {
        insuranceHeader
        institute
        identifier
        logotype
        name
        description
        longDescription
        url
        insuranceText
        requiresPersonalNumber
        requiresDistance
        terms
      }
    }
  }
  ${HoursOpen}
`;

export default SEARCH_ITEM_BRANCH_QUERY;
