import { EnhancedProperty } from '../../@types/vehicle-properties';
import deepCopy from '../deep-copy';

export const HINTS = Object.freeze<{ [key: string]: string }>({
  abs: 'Förhindrar att bromsarna låser sig och reducerar bromssträckan.',
  acceleration: 'Antal sekunder som bilen behöver för att ta sig till 100 km/h.',
  adultOccupantNCAP:
    'Poängen för skydd av vuxna bestäms genom tester av frontalkrockar, sidokrockar och whiplash som utförs för att bedöma det skydd som bilen erbjuder för vuxna förare och passagerare samt bedöma tillgängliga åtgärder för snabb och säker räddning.',
  aeb: 'Bilen är utrustad med ett bromssystem som hjälper dig att undvika olyckor. Beroende på vilken nivå av AEB bilen är utrustad med kan de upptäcka även cyklister och fotgängare, främst i lägre hastigheter i stadsmiljö men även vid högre hastigheter och landsvägskörning. Bilen förvarnar föraren om potentiell fara och hjälper även till att bromsa för att säkerställa att olyckor undviks så långt det går.',
  airbagCutOffSwitch:
    'Det går att koppla ur krockkudden på passagerarsidan för att kunna sätta dit en barnstol.',
  airbagDriver: 'Krockkudde för föraren.',
  airbagFrontal: '',
  airbagFrontalHead: '',
  airbagKnees: '',
  airbagPassenger: 'Krockkudde för passagerare.',
  airbagSideChest: '',
  airbagSidePelvis: '',
  alcolock: 'För att kunna starta bilen behövs ett blåstest som mäter alkoholnivån.',
  androidAuto:
    'Bilen har stöd för dig med Androidtelefon att koppla upp den direkt till bilen. Då följer bland annat navigering, meddelanden samt musiken med från telefonen.',
  annualBonus:
    'Det här fordonet är berättigat till klimatbonus. Bonusen delas ut till den första registrerade ägaren efter 6 månader. Klicka <a target="_blank" rel="noopener noreferrer" title="Läs mer om bonus/malus" href="https://www.transportstyrelsen.se/bonusmalus">här</a> för att läsa mer.',
  annualMalus: 'Bilen har en förhöjd skatt de tre första åren och därefter gäller ordinarie skatt.',
  annualTax: 'Summan fordonsskatt som måste betalas varje år.',
  antiTheftAlarm: 'Bilen har ett larmsystem vid försök till inbrott.',
  appConnect:
    'Med App Connect kan du koppla din mobiltelefon så att anpassade appar syns direkt i bilens display. Fungerar både för iPhone och Android.',
  appleCarPlay:
    'Bilen har stöd för Apple i bilens inbyggda display, så du enkelt kan koppla upp din telefon och prata med bilen med hjälp av Siri.',
  aux: 'Bilen har en AUX-ingång, för att exempelvis spela musik från en telefon.',
  auxiliaryLamps: '',
  batteryCapacity: 'Anger hur många kilowatt-timmar batteriet innehar.',
  batteryWarrantyDistance: '',
  batteryWarrantyTime: '',
  blindSpotWarner:
    'En varningslampa indikerar i ytterbackspegeln när ett fordon befinner sig i döda vinkeln.',
  bluetooth: 'Bilen kan ansluta enheter via Bluetooth, för exempelvis mobilsamtal eller musik.',
  bluetoothAudio: 'Bilen kan ansluta enheter via Bluetooth för att lyssna på musik.',
  bluetoothPhone: 'Bilen kan ansluta enheter via Bluetooth för telefonsamtal.',
  brakeAssistance: 'Säkerhetssystem som kan hjälpa till att bromsa och undvika olyckor.',
  carDamageWarrantyDistance: '',
  carDamageWarrantyTime: '',
  centerDisplay: 'Bilen har en skärm mitt i bilen, mellan förare och passagerare.',
  centralLocking: 'Elektriskt låssystem, som gör att alla dörrar låses och öppnas samtidigt.',
  chargeTimeNormal: 'Hur lång tid tar det att ladda bilen i ett standard elnät.',
  chargeTimeQuick:
    'Hur lång tid tar det att ladda bilen med en snabbladdare anpassad för laddning av elbilar.',
  chassis: 'Vilken typ/form bilen har.',
  childOccupantNCAP:
    'Bedömningen av skyddet av barn täcker tre viktiga aspekter: det skydd som erbjuds av bilbarnstolar i frontal- och sidokrockstest; fordonets möjligheter att inhysa bilbarnstolar med olika storlek och utformning; och tillgängliga åtgärder för säker transport av barn i bilen.',
  childSafetyLocks:
    'Dörrarna låses automatiskt när man kör iväg, så att de inte ska öppnas under körning.',
  childSeatBeltPassenger: 'Passagerarsätet har utfällbar sittkudde för barn.',
  childSeatBeltRear: 'Baksätet har utfällbar sittkudde för barn.',
  co2: 'Anger hur mycket koldioxid fordonet släpper ut enligt mätmetoden NEDC baserat på teoretisk körning.',
  colorName: '',
  combinedEmissionsWLTP:
    'Anger hur mycket koldioxid fordonet släpper ut enligt mätmetoden WLTP baserat på verklig körning.',
  cruiseControl: 'Hjälpmedel som håller bilens hastighet automatiskt.',
  curtainAirbags: '',
  displacementCC: 'Den sammanlagda volymen av motorns cylindrar. Mäts i kubikcentimeter.',
  displacementLitres: 'Den sammanlagda volymen av motorns cylindrar. Mäts i liter.',
  driverAlertnessDetection:
    'Varningssignal uppstår när körningssättet tyder på bristande uppmärksamhet.',
  drivingWheel: 'Vilka hjul som motorn ger kraft till och snurrar.',
  electricalEngine: '',
  electricalRange: 'Räckvidd enligt mätmetoden WLTP baserat på verklig körning',
  electricalRangeEPA:
    'Räckvidd enligt den amerikanska mätmetoden EPA. Enligt många den allra strängaste metoden.',
  electricalRangeNEDC: 'Räckvidd enligt mätmetoden NEDC baserat på teoretisk körning.',
  electricalRangeWLTP: 'Räckvidd enligt mätmetoden WLTP baserat på verklig körning.',
  electricalSeatDriver:
    'Bilens förarstol går att manövrera med el för mjukare och mer precis positionering.',
  electricalSeatPassenger: 'Bilens passagerarstol går att manövrera med el.',
  emergencyCalling: 'Bilen kan automatiskt larma SOS vid en olycka.',
  engineConfiguration: 'Anger fordonets typ av motor, vilken typ av cylindrar den innehar.',
  engineCylinders:
    "Antalet ger en indikation på motorns storlek. Ett 'vanligt' antal ligger på 4 st.",
  engineName: '',
  engineVolume: '',
  enrichmentProviderEquipPackages: '',
  enrichmentProviderExteriorPackages: '',
  enrichmentProviderInteriorPackages: '',
  enrichmentProviderTrimPackages: '',
  environmentClass: 'Används för att ställa krav på fordonets utsläpp.',
  finish: '',
  fuelConsumptionCityDriving: 'Bränsleförbrukning vid stadskörning.',
  fuelConsumptionCountryRoadDriving: 'Bränsleförbrukning vid landsvägskörning.',
  fuelConsumptionMixedDriving:
    'Bränsleförbrukning vid blandad körning. Dvs. stadskörning och landsvägskörning under en och samma färd.',
  fuelType: 'Vad bilen ska tankas med och drivs av.',
  gearboxName: '',
  gestureControls: 'Mittskärmen går att manövrera med rörelser.',
  gps: 'Bilen är utrustad med navigationsutrustning så du enkelt kan ta dig dit du ska.',
  grossWeight: 'Anger bilens vikt inklusive max tillåten lastvikt.',
  groundClearence: 'Avståndet mellan bilens undersida och marken.',
  hasAutomaticGearbox: '',
  hdmi: 'Bilen har en HDMI-port.',
  headRoomFront: 'Lägsta takhöjden i framsätet.',
  headRoomRear: 'Lägsta takhöjden i baksätet.',
  headUpDisplay:
    'Bilen är utrustad med en projicerad display i ditt synfält, så du kan se exempelvis nuvarande hastighet utan att behöva vända bort blicken från vägen.',
  heatedSteeringWheel: '',
  height: 'Avståndet från bilens undersida till översida.',
  hybridComponentsWarrantyDistance: '',
  hybridComponentsWarrantyTime: '',
  interiorMaterial: 'Material på interiören i bilen, dvs detaljer i bilens insida.',
  isofixRearSeat: 'Universell fästanordning för barnstolar.',
  keylessEntry:
    'Bilens dörrar och bagage öppnas när den känner av att bilnyckeln är i närheten och du tar tag i handtaget. Du behöver därmed inte använda nyckeln i sig för att öppna bilens dörrar. ',
  keylessStart:
    'Bilen startas med ett knapptryck istället för att bilnyckeln behöver vridas om. Det räcker med att bilnyckeln befinner sig i bilen (kan du mao ha den i fickan hela bilresan).',
  laneAssistance: 'Funktion som hjälper till att hålla bilen inom körfältet.',
  legRoomFront: 'Avstånd mellan instrumentpanelen och framsäte.',
  legRoomRear: 'Avstånd mellan framsätets rygg och baksätet',
  length: 'Avståndet från bilens baksida till framsida.',
  lowBeam: '',
  mainBeam: '',
  mainBeamAssistance: 'Bilen slår på och av helljuset per automatik, så du slipper göra det själv.',
  manufactureYear: 'Året bilen tillverkades.',
  massage: 'Bilens säte har inbyggd massage.',
  maxLoadWeight: '',
  maxRoofWeight: 'Hur många kilo last taket klarar av.',
  maxSpeed: 'Högsta hastigheten som bilen går att köra.',
  maxTrailerLoadBraked8Percent: '',
  maxTrailerLoadUnbraked: 'Vikten du får dra på ett släp som inte är utrustat med egna bromsar.',
  mildHybrid:
    'Bilen är utrustad med en elmotor som fungerar både som startmotor och generator och stöttar förbränningsmotorn, vilket ger lägre bränsleförbrukning och därmed minskade utsläppsnivåer.',
  mileage: 'Antal mil som bilen har körts. I bilen anges det i kilometer istället.',
  modelName: 'Vilket utförande av bilmodellen det är.',
  modelYear:
    'Modellår sätts av tillverkaren. Handlaren ändrar ibland modellåret för att matcha transportstyrelsens definition för <i>årsmodell</i>. Definitionen för årsmodell innebär att bilar tillverkade andra halvan av året får nästa års modellår.',
  ncapStar:
    'Universellt säkerhetsbetyg för bilar, fler stjärnor innebär högre säkerhet. Skalan går från 0 till 5 där 5 är det högsta betyget. Så här beskriver Euro NCAP själva att slutbetyget ska utläsas: <br/>' +
    '<br/>' +
    '5 stjärnor: Som helhet utmärkt prestanda inom krockskydd och väl utrustad med omfattande teknik för att undvika kollisioner<br/><br/>' +
    '4 stjärnor: Som helhet bra prestanda inom krockskydd, det kan finnas ytterligare teknik för att undvika kollisioner<br/><br/>' +
    '3 stjärnor: Åtminstone genomsnittligt passagerarskydd men inte alltid utrustad med de senaste funktionerna för att undvika kollisioner<br/><br/>' +
    '2 stjärnor: Nominellt krockskydd men saknar teknik för att undvika kollisioner<br/><br/>' +
    '1 stjärna: Marginellt krockskydd och viss teknik för att undvika kollisioner<br/><br/>' +
    '0 stjärnor: Uppfyller standarder för typgodkännande så att fordonet får säljas men saknar kritisk modern säkerhetsteknik.',
  ncapYear: 'Året som bilen säkerhets- och krocktestades.',
  newVehicleWarrantyDistance: '',
  newVehicleWarrantyTime: '',
  noiseReducingWindows: 'Bilens rutor är ljudisolerade för högre komfort.',
  numberOfGears: 'Antal växlar i växellådan.',
  numberOfSpeakers: 'Anger totalt antal högtalare i bilen, ju fler högtalare desto häftigare ljud!',
  numberOfUSBPorts: '',
  otherAirbags: '',
  parkingAssistance: 'Funktion som assisterar vid fickparkering.',
  parkingSensorsFront: 'Ljudsignal som indikerar när bilens främre del närmar sig ett objekt.',
  parkingSensorsRear: 'Ljudsignal som indikerar när bilens bakre del närmar sig ett objekt.',
  pedestrianNCAP:
    'Euro NCAP bedömer hur väl bilar skyddar sina passagerare men testar även hur bilar skyddar oskyddade trafikanter – fotgängare och cyklister – som de kan kollidera med.',
  preHeater: 'Värmer motorn när det är kallt ute för att underlätta start.',
  rainSensors: 'Vindrutetorkarna aktiveras och anpassas automatiskt i förhållande till regnet.',
  remoteStart:
    'Möjliggör att du kan starta bilens motor med hjälp av exempelvis en app i telefonen',
  rimSize: 'Fälgstorlek angivet i tum.',
  roofColor: 'Någon del av bilen, ex taket skiljer sig i kulör mot övriga bilen.',
  roofRailing: 'Bilen har takreling som du kan fästa takräcken i.',
  safetyAssistNCAP:
    'Poängen för förarstödsystem bestäms genom tester av de viktigaste förarstöd teknikerna som stöder säker körning för att undvika och begränsa olyckor.',
  seats: 'Antal personer som får åka i bilen.',
  segment: 'Vilken typ av bil det handlar om - t.ex. familjebil',
  serviceWeight: 'Anger hur mycket bilen väger med en passagerare som väger ca 75kg.',
  shoulderRoomFront: 'Avstånd i bredd för bilens framsäte.',
  shoulderRoomRear: 'Avstånd i bredd för bilens baksäte.',
  sideMirrorFolding:
    'Bilens yttre backspeglar går att automatiskt fälla in, exempelvis bra på trånga parkeringar.',
  speakerBrand: '',
  startAndStop: 'Bilens motor stoppas när bilen står still för att minska utsläppen.',
  steeringWheelMaterial: '',
  sunRoof: '',
  tankVolume: 'Antal liter bränsle som ryms i tanken.',
  timingBeltServiceIntervalDistance:
    'Bilen är utrustad med kamrem som måste bytas vid olika distansintervall.',
  timingBeltServiceIntervalTime:
    'Bilen är utrustad med kamrem som måste bytas vid olika tidsintervall.',
  tintedWindows: 'Bilens rutor har en mörkare toning.',
  tiresFront:
    'Däckdimension fram. Presenteras i höjd/bredd och inom ett spann. Däcken som sitter på bilen måste alltså falla inom det spannet.',
  tiresRear:
    'Däckdimension bak. Presenteras i höjd/bredd och inom ett spann. Däcken som sitter på bilen måste alltså falla inom det spannet.',
  torque:
    'Bilens vridkraft. Hög siffra möjliggör att t.ex. dra tunga släp. Dieselmotorer har generellt mer vridmoment.',
  touchScreen: 'Mittskärmen i bilen är en pekskärm.',
  towHitch: '',
  towHitchDetachable: '',
  towHitchFoldable: '',
  trafficSignRecognition: 'Bilen är utrustad med kameror som läser av gällande trafikskyltar.',
  trailerTotalWeightB: 'Vikten man får dra med släp och ett vanligt B-körkort.',
  transmissionKnobMaterial: '',
  trcSystem: 'Får bilen att skicka kraft till hjulet som har bästa kontakt med underlaget.',
  tripComputer:
    'I färddatorn som sitter framför ratten kan du se lite information om motorn och bränsleförbrukningen, bland annat kan du ofta läsa ut den återstående körsträckan på nuvarande bränslevolym.',
  trunkDepth: '',
  trunkHeight: '',
  trunkOutlet: '',
  trunkSpace: 'Volym på bagageutrymmet med uppfällda säten. Det mäts i liter.',
  trunkSpaceFront: '',
  trunkWidth: '',
  typeOfElectricCar: 'Anger om bilen drivs av el eller om den är en hybrid av el och bränsle.',
  upholstery: '',
  usb: 'Bilen är utrustad med en USB-port',
  ventilatedSeats:
    'Bilens stolar har ventilation inbyggd, bland annat bra för att få bort fukt från sätena.',
  wheelBase: 'Avståndet mellan fram- och bakhjul.',
  wiFi: 'Bilen är utrustad med ett internt WIFI som du kan koppla upp dina egna enheter mot.',
  width: 'Avståndet mellan bilens båda yttre långsidor.',
  windowLifts: '',
  wirelessPhoneCharger:
    'Bilen är utrustad med induktionsladdare, så att telefoner som stödjer trådlös laddning kan laddas i bilen utan laddningssladd.',
});

const enrichWithHint = (properties: { [key: string]: EnhancedProperty }) => {
  const clone = deepCopy(properties);

  const keys = Object.keys(clone);
  keys.forEach((key) => {
    if (!!HINTS[key]) {
      clone[key].hint = HINTS[key];
    }
  });

  return clone;
};

export default enrichWithHint;
