import { gql } from '@apollo/client';

const FinancialOptionDetail = gql`
  fragment FinancialOptionDetail on FinancialOptionDetail {
    current
    default
    max
    min
    step
  }
`;

const HoursOpen = gql`
  fragment HoursOpen on HoursOpen {
    from
    until
  }
`;

const SEARCH_ITEM_QUERY = gql`
  query SearchItem($id: ID!) {
    vehicle(id: $id) {
      id
      documents
      contact {
        name
        email
        phonenumber
        avatar
      }
      manufacturer {
        description
        logotype
        name
        packageOption {
          description
          image
          link {
            title
            url
          }
          title
        }
      }
      packageOptions {
        description
        image
        link {
          title
          url
        }
        title
      }
      publishedAt
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
      data {
        enginePower
        equipmentLevel
        fuelType
        gearbox
        gearboxType
        manufactureYear
        manufacturer
        mileage
        modelName
        modelSeries
        modelYear
        properties
        propertySet
        options
        registrationNumber
        salesName
        vin
      }
      description
      ecommerce {
        enabled
        reserved
        withTradeIn
        withHomeDelivery
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
      financialOptions {
        description
        administrationFee
        downPayment {
          ...FinancialOptionDetail
        }
        duration {
          ...FinancialOptionDetail
        }
        effectiveInterest
        image
        includes
        includes
        interest
        link {
          title
          url
        }
        loanAmount
        logotype
        mileage {
          ...FinancialOptionDetail
        }
        monthlyCost
        name
        residual {
          ...FinancialOptionDetail
        }
        setupFee
        terms
        totalCreditCost
        totalResidualValue
        type
        url
      }
      media {
        type
        files {
          formats {
            format
            url
          }
          url
        }
      }
      location {
        city
        county
        streetAddress
        postalCode
      }
      price
      shortDescription
      title
    }
  }
  ${HoursOpen}
  ${FinancialOptionDetail}
`;

export default SEARCH_ITEM_QUERY;
