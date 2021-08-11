import React from "react";

const status = ["Listing", "Not Listing", "Cancel", "Reserved", "Sold"];
const types = [
  "Apartment",
  "Condo",
  "Commercial",
  "Hotel/Resort",
  "House",
  "Land",
  "Office",
  "Retail Space",
  "Shophouse",
  "Town House",
  "Villa",
  "Warehouse/Factory",
];
const contracts = ["Sell", "Rent", "New house"];
const rent_payments = ["Week", "Month", "Quater", "Year"];
const districts = [
  "Bang Bon",
  "Bang Kapi",
  "Bang Khae",
  "Bang Khen",
  "Bang Kho Laem",
  "Bang Khun Thian",
  "Bang Na",
  "Bang Phlat",
  "Bang Rak",
  "Bang Sue",
  "Bangkok Noi",
  "Bangkok Yai",
  "Bueng Kum",
  "Chatuchak",
  "Chom Thong",
  "Din Daeng",
  "Don Mueang",
  "Dusit",
  "Huai Khwang",
  "Khan Na Yao",
  "Khlong Sam Wa",
  "Khlong San",
  "Khlong Toei",
  "Lak Si",
  "Lat Krabang",
  "Lat Phrao",
  "Min Buri",
  "Nong Chok",
  "Nong Khaem",
  "Pathum Wan",
  "Phasi Charoen",
  "Phaya Thai",
  "Phra Khanong",
  "Phra Nakhon",
  "Pom Prap Sattru Phai",
  "Prawet",
  "Rat Burana",
  "Ratchathewi",
  "Sai Mai",
  "Samphanthawong",
  "Saphan Sung",
  "Sathon",
  "Suan Luang",
  "Taling Chan",
  "Thawi Watthana",
  "Thon Buri",
  "Thung Khru",
  "Wang Thonglang",
  "Watthana",
  "Yan Nawa",
];
const provinces = ["Bangkok"];
const stations = [
  "None",
  "ARL Ban Thap Chang",
  "ARL Bang Sue (Central Station)",
  "ARL Don Mueang (Airport)",
  "ARL Hua Mak",
  "ARL Lat Krabang",
  "ARL Makkasan",
  "ARL Phaya Thai",
  "ARL Ramkhamhaeng",
  "ARL Ratchaprarop",
  "ARL Suvarnabhumi (Airport)",
  "BTS 11th Infantry Regiment",
  "BTS Ari",
  "BTS Asok",
  "BTS Bang Bua",
  "BTS Bang Chak",
  "BTS Bang Na",
  "BTS Bang Wa",
  "BTS Bearing",
  "BTS Bhumibol Adulyadej Hospital",
  "BTS Chit Lom",
  "BTS Chong Nonsi",
  "BTS Ekkamai",
  "BTS Ha Yaek Lat Phrao",
  "BTS Kasetsart University",
  "BTS Krung Thon Buri",
  "BTS Mo Chit",
  "BTS National Stadium",
  "BTS On Nut",
  "BTS Phahon Yothin 24",
  "BTS Phahon Yothin 59",
  "BTS Phaya Thai",
  "BTS Phloen Chit",
  "BTS Pho Nimit",
  "BTS Phra Khanong",
  "BTS Phrom Phong",
  "BTS Punnawithi",
  "BTS Ratchadamri",
  "BTS Ratchathewi",
  "BTS Ratchayothin",
  "BTS Royal Forest Department",
  "BTS Royal Thai Air Force Museum",
  "BTS Sai Yud",
  "BTS Saint Louis",
  "BTS Sala Daeng",
  "BTS Sanam Pao",
  "BTS Saphan Khwai",
  "BTS Saphan Mai",
  "BTS Saphan Taksin",
  "BTS Sena Nikhom",
  "BTS Sena Ruam",
  "BTS Siam",
  "BTS Surasak",
  "BTS Talat Phlu",
  "BTS Thong Lo",
  "BTS Udom Suk",
  "BTS Victory Monument",
  "BTS Wat Phra Sri Mahathat",
  "BTS Wongwian Yai",
  "BTS Wutthakat",
  "BTS Yaek Kor Por Aor",
  "MRT Bang Khae",
  "MRT Bang Khun Non",
  "MRT Bang O",
  "MRT Bang Phai",
  "MRT Bang Phlat",
  "MRT Bang Pho",
  "MRT Bang Son",
  "MRT Bang Sue",
  "MRT Bang Wa",
  "MRT Bang Yi Khan",
  "MRT Charan 13",
  "MRT Chatuchak Park",
  "MRT Fai Chai",
  "MRT Hua Lamphong",
  "MRT Huai Khwang",
  "MRT Itsaraphap",
  "MRT Kamphaeng Phet",
  "MRT Khlong Toei",
  "MRT Lak Song",
  "MRT Lat Phrao",
  "MRT Lumphini",
  "MRT Phahon Yothin",
  "MRT Phasi Charoen",
  "MRT Phetchaburi",
  "MRT Phetkasem 48",
  "MRT Phra Ram 9",
  "MRT Queen Sirikit National Convention Centre",
  "MRT Ratchadaphisek",
  "MRT Sam Yan",
  "MRT Sam Yot",
  "MRT Sanam Chai",
  "MRT Si Lom",
  "MRT Sirindhorn",
  "MRT Sukhumvit",
  "MRT Sutthisan",
  "MRT Tao Poon",
  "MRT Tha Phra",
  "MRT Thailand Cultural Centre",
  "MRT Wat Mangkon",
  "MRT Wong Sawang",
];
const furnishing = ["Furnished", "Partly furnished", "Unfurnished"];
const ownership = ["Freehold", "Leasehold"];
const bedroom = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const bathroom = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const getStatusAsOption = () => {
  const elements = [];
  status.forEach((status) =>
    elements.push(<option value={status}>{status}</option>)
  );
  return elements;
};
const getTypesAsOption = () => {
  const elements = [];
  types.forEach((type) => elements.push(<option value={type}>{type}</option>));
  return elements;
};
const getContractsAsOption = () => {
  const elements = [];
  contracts.forEach((contract) =>
    elements.push(<option value={contract}>{contract}</option>)
  );
  return elements;
};
const getRentPaymentsAsOption = () => {
  const elements = [];
  rent_payments.forEach((rent_payment) =>
    elements.push(
      <option value={rent_payment}>{`Baht / ${rent_payment}`}</option>
    )
  );
  return elements;
};
const getDistrictsAsOption = () => {
  const elements = [];
  districts.forEach((district) =>
    elements.push(<option value={district}>{district}</option>)
  );
  return elements;
};
const getProvincesAsOption = () => {
  const elements = [];
  provinces.forEach((province) =>
    elements.push(<option value={province}>{province}</option>)
  );
  return elements;
};
const getStationsAsOption = () => {
  const elements = [];
  stations.forEach((station) =>
    elements.push(<option value={station}>{station}</option>)
  );
  return elements;
};
const getFurnishingAsOption = () => {
  const elements = [];
  furnishing.forEach((furnish) =>
    elements.push(<option value={furnish}>{furnish}</option>)
  );
  return elements;
};
const getOwnershipAsOption = () => {
  const elements = [];
  ownership.forEach((owner) =>
    elements.push(<option value={owner}>{owner}</option>)
  );
  return elements;
};
const getBedroomAsOption = () => {
  const elements = [];
  bedroom.forEach((amount) =>
    elements.push(
      <option value={amount}>{`${amount} ${
        amount === 1 ? "Bedroom" : "Bedrooms"
      }`}</option>
    )
  );
  return elements;
};
const getBathroomAsOption = () => {
  const elements = [];
  bathroom.forEach((amount) =>
    elements.push(
      <option value={amount}>{`${amount} ${
        amount === 1 ? "Bathroom" : "Bathrooms"
      }`}</option>
    )
  );
  return elements;
};

const getFacilityName = (facility) => {
  switch (facility) {
    case "air_conditioning":
      return "Air Conditioning";
    case "cctv":
      return "CCTV";
    case "fitness":
      return "Fitness";
    case "library":
      return "Library";
    case "parking":
      return "Parking";
    case "pet_friendly":
      return "Pet Friendly";
    case "security":
      return "Security";
    case "swimming_pool":
      return "Swimming Pool";
    case "tv":
      return "TV";
    case "balcony":
      return "Balcony";
    case "concierge":
      return "Concierge";
    case "garden":
      return "Garden";
    case "lift":
      return "Lift";
    case "playground":
      return "Playground";
    case "river_view":
      return "River View";
    case "single_storey":
      return "Single Storey";
    case "sport_center":
      return "Sport Center";
    case "wifi":
      return "WIFI";
    default:
      return "";
  }
};

export default {
  getStatusAsOption,
  getTypesAsOption,
  getContractsAsOption,
  getRentPaymentsAsOption,
  getDistrictsAsOption,
  getProvincesAsOption,
  getStationsAsOption,
  getFurnishingAsOption,
  getOwnershipAsOption,
  getBedroomAsOption,
  getBathroomAsOption,
  getFacilityName,
};
