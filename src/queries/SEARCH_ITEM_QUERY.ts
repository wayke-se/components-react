import { gql } from 'apollo-boost';
import { MockedResponse } from '@apollo/react-testing';

const SEARCH_ITEM_QUERY = gql`
  query SearchItem($id: ID!) {
    vehicle(id: $id) {
      id
      contact {
        name
        email
        phonenumber
      }
      branch {
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
            from
            until
          }
          tuesday {
            from
            until
          }
          wednesday {
            from
            until
          }
          thursday {
            from
            until
          }
          friday {
            from
            until
          }
          saturday {
            from
            until
          }
          sunday {
            from
            until
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
      financialOptions {
        administrationFee
        downPayment {
          current
          default
          max
          min
          step
        }
        duration {
          current
          default
          max
          min
          step
        }
        effectiveInterest
        financialInstitution
        image
        interest
        link {
          title
          href
        }
        loanAmount
        logotype
        monthlyCost
        name
        price
        priceUnit
        residual {
          current
          default
          max
          min
          step
        }
        setupFee
        totalCreditCost
        totalVehicleCost
        type
        vehiclePrice
      }
      media {
        url
        type
        formats {
          format
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
`;

export const SEARCH_ITEM_QUERY_MOCKS: MockedResponse[] = [
  {
    request: {
      query: SEARCH_ITEM_QUERY,
      variables: {
        id: '684f2548-1250-4ae2-bcb8-e8aec11cb739',
      },
    },
    result: {
      data: {
        vehicle: {
          id: '684f2548-1250-4ae2-bcb8-e8aec11cb739',
          contact: {
            name: 'Peter',
            email: 'peter@ourstudio.se',
            phonenumber: '',
          },
          data: {
            enginePower: 218,
            equipmentLevel: 'Executive, Comfort & Design',
            fuelType: 'Laddhybrid',
            gearbox: '6-stegad Automat',
            gearboxType: 'Automat',
            manufactureYear: 2016,
            manufacturer: 'Volkswagen',
            mileage: 7001,
            modelName: 'Passat GTE SportsCombi',
            modelSeries: 'Passat',
            modelYear: 2016,
            options: [
              'Färddator',
              'Car net onlinetjänster giltighetstid 36 månader',
              'Dragpaket',
              'Lastförskjutningsnät',
              'Farthållare adaptiv (acc) inklusive front assist och city emergency brake',
              'Bluetooth',
              'Stöldskyddslarm',
              'Dragkrok infällbar elektriskt utfällbar',
              'Autom. parkeringsbroms',
              'Mittarmstöd',
              'Fjärrstyrt centrallås',
              'Backkamera rear assist',
              'Klimat-automatik',
              'App-connect',
              'Mörktonade rutor från b-stolpen och bakåt med akustiksidorutor',
              'Led-strålkastare med led-varselljus',
              'Parkeringssensorer fram & bak',
              'Das Welt Auto-Garanti 1 år',
              'Centrallås med safe-låsning komfortstartfunktion keyless go i kombination med stöldskyddslarm',
              'Executive paket',
              'Bagagelucka elmanövrerad samt elektrisk öppning av insynsskydd',
              'Dimstrålkastare fram med statisk kurvljusfunktion',
              'Adaptiv farthållare',
              'Mobiltelefongränssnitt inkl. wlan-hotspot',
              'Lättmetallfälgar 17 tum london silver däck 215/55 r17',
            ],
            registrationNumber: 'HOX753',
            salesName: 'Passat GTE SportsCombi',
            vin: 'WVWZZZ3CZGE246499',
          },
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ultrices non sem eget lobortis. Aliquam sagittis est urna, ut pharetra nisl ullamcorper sed. Sed dolor augue, varius nec eleifend vitae, malesuada et quam. Pellentesque aliquam mauris eget neque vulputate, at viverra diam cursus. Maecenas eget ex suscipit, bibendum felis at, facilisis justo. Vivamus sed massa ut arcu pretium scelerisque vitae eu sem. Aenean imperdiet sem sollicitudin ex feugiat dictum. Sed et ipsum nec massa ultrices egestas. Praesent tristique ultricies augue sagittis consequat. Vestibulum quis massa viverra, lobortis enim vehicula, dictum est. Aliquam in ex ac erat rhoncus finibus.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ultrices non sem eget lobortis. Aliquam sagittis est urna, ut pharetra nisl ullamcorper sed. Sed dolor augue, varius nec eleifend vitae, malesuada et quam. Pellentesque aliquam mauris eget neque vulputate, at viverra diam cursus. Maecenas eget ex suscipit, bibendum felis at, facilisis justo. Vivamus sed massa ut arcu pretium scelerisque vitae eu sem. Aenean imperdiet sem sollicitudin ex feugiat dictum. Sed et ipsum nec massa ultrices egestas. Praesent tristique ultricies augue sagittis consequat. Vestibulum quis massa viverra, lobortis enim vehicula, dictum est. Aliquam in ex ac erat rhoncus finibus.',
          ecommerce: {
            enabled: false,
            reserved: false,
            withTradeIn: false,
            withHomeDelivery: false,
          },
          financialOptions: [],
          media: [
            {
              url:
                'https://test-cdn.wayketech.se/media/f4403f6a2bea49be8aa4289dfb04c27f/7f73cd09a85140a19f3b4512c8e6d12f',
            },
            {
              url:
                'https://test-cdn.wayketech.se/media/7460e5961a29421bbf377ae2656950fc/e3cfed6da3b645878357635ffd722289',
            },
            {
              url:
                'https://test-cdn.wayketech.se/media/234984475fa3460eaa1b0a1accf3045c/5282dcbe04b247ffa7ba63ff39040bce',
            },
            {
              url:
                'https://test-cdn.wayketech.se/media/de9a4905e012460b80b446e7fbe6e2d7/3def32c29aa54313b96ee54828e5b596',
            },
            {
              url:
                'https://test-cdn.wayketech.se/media/7eadcc2b0fb04c8883dbce2529c2e9f6/cef6581087d2456bbc2fb1f1979678e7',
            },
            {
              url:
                'https://test-cdn.wayketech.se/media/7016a9b323eb49f18f70c8c12515e42e/6378070fc7154c0b97c625828658b40d',
            },
            {
              url:
                'https://test-cdn.wayketech.se/media/99d6aa56fe934bcf90501fa1f5038cff/3c7b70ca5b4c4b08afbb0fffbea55c8f',
            },
            {
              url:
                'https://test-cdn.wayketech.se/media/da7408111d784d82a7b131fec2459424/a7bf13f8ff7a476b8424af4313a6b03a',
            },
            {
              url:
                'https://test-cdn.wayketech.se/media/7f189af2abf646faa2d6f390332c93cf/eb978ce3193f49439bc77c9bdb65859d',
            },
            {
              url:
                'https://test-cdn.wayketech.se/media/2fe80f4bf17a4ead830456354d92c374/e97b95aaeb00400380bc0be11bf8eaf0',
            },
            {
              url:
                'https://test-cdn.wayketech.se/media/2fe80f4bf17a4ead830456354d92c374/c380777fdf334f01bcae3bac3bb0080b',
            },
            {
              url:
                'https://test-cdn.wayketech.se/media/2fe80f4bf17a4ead830456354d92c374/ad294799cca84d46b07b1cb03db250fa',
            },
            {
              url:
                'https://test-cdn.wayketech.se/media/2fe80f4bf17a4ead830456354d92c374/a8c983295abc4c5285c0f0c9944fd5af',
            },
            {
              url:
                'https://test-cdn.wayketech.se/media/2fe80f4bf17a4ead830456354d92c374/fbc95ebba68845f887a921b1978afe9a',
            },
            {
              url:
                'https://test-cdn.wayketech.se/media/2fe80f4bf17a4ead830456354d92c374/162aa0b4813f4d13b04ea84dd7d83e0f',
            },
            {
              url:
                'https://test-cdn.wayketech.se/media/2fe80f4bf17a4ead830456354d92c374/0661cd3e26814c45a7b4cfc6e561c381',
            },
            {
              url:
                'https://test-cdn.wayketech.se/media/2fe80f4bf17a4ead830456354d92c374/336c3e17a5ac46b98412ebc1060aa812',
            },
            {
              url:
                'https://test-cdn.wayketech.se/media/2fe80f4bf17a4ead830456354d92c374/eeb8edc431c14c37a6c9083c8c9fec6d',
            },
            {
              url:
                'https://test-cdn.wayketech.se/media/2fe80f4bf17a4ead830456354d92c374/9770072b9d4a46879a59c68b22e02c79',
            },
            {
              url:
                'https://test-cdn.wayketech.se/media/2fe80f4bf17a4ead830456354d92c374/2120b2135678488b9ddb516320846613',
            },
            {
              url:
                'https://test-cdn.wayketech.se/media/2fe80f4bf17a4ead830456354d92c374/c32e26685f3e45acbdb8b6f5c56b98ec',
            },
            {
              url:
                'https://test-cdn.wayketech.se/media/7bb17b592695475a949859df123b93d2/079f7f96ab6541cbbd9ca0dfbfe4e570',
            },
            {
              url: 'https://www.youtube.com/watch?v=YLnlBbajCUg',
            },
            {
              url: 'https://vimeo.com/43233380',
            },
          ],
          location: {
            city: 'Göteborg',
            county: '',
            streetAddress: 'tredje långgatan 2',
            postalCode: '41327',
          },
          price: 289700,
          shortDescription: '1.4 TSI',
          title: 'Volkswagen Passat GTE SportsCombi',
        },
      },
    },
  },
];

export default SEARCH_ITEM_QUERY;
