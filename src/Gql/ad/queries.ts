// GraphQL documents for the ad page against the public API.

import { SEARCH_HIT_FIELDS } from '../queries';

const WARRANTY_CONTENT = `content { __typename ... on AdSpecificText { text } ... on StandardText { text } ... on StructuredWarranty { text } }`;

export const AD_QUERY = `
query Ad($id: ID!) {
  ads {
    byAdId(ID: $id) {
      id
      branchId
      createdAt
      salesDescription { title enriched }
      packaging {
        isDemoVersion
        certifiedPreOwned
        selectedPackaging { id title description imageUrl ctaUrl ctaName }
      }
      channels {
        __typename
        ... on PlatformChannel {
          status
          inventoryStatus
          publishedAt
          soldAt
          deliveryTime { __typename ... on DeliveryDate { date } ... on DeliveryInterval { from to unit } }
        }
      }
      pricing {
        primaryPriceType
        cash { price { amount } oldPrice { amount } deductibleVat }
        leasing { issuer leasingMonthlyPayment { amount } contractMonthsRemaining contractKilometersRemaining }
        companyLeasing { issuer leasingMonthlyPayment { amount } contractMonthsRemaining contractKilometersRemaining }
      }
      leasingPromos { id title description image periodMonths mileagePerYear isBusinessLeasing link { url name } }
      media(limit: 60) {
        totalCount
        items {
          __typename
          ... on AdImage { id url sortOrder mediaType formats { format url } }
          ... on Ad360ImageGroup { id sortOrder images { id url } }
          ... on AdEmbeddedVideo { id externalUrl sortOrder }
        }
      }
      equipment { items { name } }
      accessories {
        id name price salePrice assemblyPrice shortDescription longDescription logoUrl
        productPageLink productPageLinkText articleNumber manufacturer model
        media { url sortOrder }
      }
      warrantyInfo { ${WARRANTY_CONTENT} }
      offerings {
        warranties {
          included
          text
          definition { id name description logoUrl externalUrl usps }
        }
      }
      exchangePolicy { enabled }
      contactOption {
        __typename
        ... on Branch { id displayName }
        ... on AdDefaultContactOptions { displayName telephone email title }
        ... on AssignedUser { displayName telephone email title }
      }
      branch {
        id displayName description street zip city latitude longitude homePage logo market
        contactInformation { telephone email }
        adDefaultContactOptions { displayName telephone email title avatarUrl }
        weekOpeningHours { openingHours { dayOfWeek openFrom openTo } }
        isAutomotiveAssociationVerified
        promos { id title description image link { url name } }
      }
      authorizedResellerForManufacturer
      iteration {
        id
        displayName
        item {
          __typename
          ... on Vehicle {
            displayName
            registrationNumber { stringValue }
            vin { formattedValue }
            manufacturer { stringValue }
            modelSeries { stringValue }
            modelName { stringValue }
            modelYear { intValue }
            manufactureYear { intValue }
            salesName { stringValue }
            driveline { fuelTypesString { stringValue } }
            attributes {
              transmission { formattedValue }
              enginePower { intValue formattedValue }
              byCategory {
                categoryId displayName
                values { __typename key label formattedValue }
                categories { categoryId displayName values { __typename key label formattedValue } }
              }
            }
          }
        }
        logistics { odometerReading { value unit } }
        commerce {
          enabled disabledOnWayke allowTradeIn homeDelivery reserved
          insuranceProvider {
            institute identifier logo title description longDescription url
            insuranceHeader ecomInsuranceText requiresPersonalNumber requiresDistance
          }
          paymentDetailsList {
            financialOptionId name description financialInstitution monthlyCost interest effectiveInterest
            setupFee administrationFee totalCreditCost totalResidualValue loanAmount imageUrl link linkText
            duration { min max step default current }
            downPayment { min max step default current }
            residual { min max step default current }
          }
        }
        documents { public { id name contentType uri category sortOrder } }
      }
    }
  }
}
`;

/**
 * Older ads carry a legacy id that differs from ad.id. ads.byIterationId accepts a
 * bare GUID and resolves it to the ad, with the same visibility rules as byAdId.
 */
export const AD_ID_BY_LEGACY_ID_QUERY = `
query AdIdByLegacyId($id: ID!) {
  ads { byIterationId(iterationId: $id) { ads { id } } }
}
`;

export const CALCULATE_PAYMENT_QUERY = `
query CalculatePayment($id: ID!, $config: PaymentDetailsInput!) {
  ads {
    byAdId(ID: $id) {
      iteration {
        commerce {
          calculatePayment(config: $config) {
            financialOptionId monthlyCost interest effectiveInterest setupFee administrationFee
            totalCreditCost totalResidualValue loanAmount
            duration { min max step default current }
            downPayment { min max step default current }
            residual { min max step default current }
          }
        }
      }
    }
  }
}
`;

export const INSURANCE_INQUIRY_QUERY = `
query InsuranceInquiry($id: ID!, $socialId: String!, $drivingDistance: DrivingDistance!) {
  ads {
    byAdId(ID: $id) {
      iteration {
        commerce {
          insuranceInquiry(socialId: $socialId, drivingDistance: $drivingDistance) {
            insurances {
              name price unit description branding legalUrl legalDescription
              details { institute logo terms }
              insuranceItems { name description }
              addons { id title price description exclude }
            }
          }
        }
      }
    }
  }
}
`;

export const RELATED_ADS_QUERY = `
query RelatedAds($market: [String], $branchGroupId: String, $manufacturer: [String], $perPage: Int) {
  search {
    ads(market: $market, branchGroupId: $branchGroupId, manufacturer: $manufacturer, perPage: $perPage, soldWithinDays: 0, sort: { field: publishedAt, direction: desc }) {
      found
      hits { ${SEARCH_HIT_FIELDS} }
    }
  }
}
`;
