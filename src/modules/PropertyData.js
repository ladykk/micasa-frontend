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
  getFacilityName,
};
