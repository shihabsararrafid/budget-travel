import { ComboboxOption } from "@/components/ui/combobox";

export const popularDestinations: ComboboxOption[] = [
  // Asia
  { value: "bangkok-thailand", label: "Bangkok, Thailand", category: "Asia" },
  { value: "tokyo-japan", label: "Tokyo, Japan", category: "Asia" },
  { value: "bali-indonesia", label: "Bali, Indonesia", category: "Asia" },
  { value: "singapore", label: "Singapore", category: "Asia" },
  { value: "kuala-lumpur-malaysia", label: "Kuala Lumpur, Malaysia", category: "Asia" },
  { value: "seoul-south-korea", label: "Seoul, South Korea", category: "Asia" },
  { value: "hanoi-vietnam", label: "Hanoi, Vietnam", category: "Asia" },
  { value: "mumbai-india", label: "Mumbai, India", category: "Asia" },
  { value: "hong-kong", label: "Hong Kong", category: "Asia" },
  { value: "manila-philippines", label: "Manila, Philippines", category: "Asia" },

  // Europe
  { value: "paris-france", label: "Paris, France", category: "Europe" },
  { value: "london-uk", label: "London, UK", category: "Europe" },
  { value: "rome-italy", label: "Rome, Italy", category: "Europe" },
  { value: "amsterdam-netherlands", label: "Amsterdam, Netherlands", category: "Europe" },
  { value: "prague-czech-republic", label: "Prague, Czech Republic", category: "Europe" },
  { value: "barcelona-spain", label: "Barcelona, Spain", category: "Europe" },
  { value: "berlin-germany", label: "Berlin, Germany", category: "Europe" },
  { value: "vienna-austria", label: "Vienna, Austria", category: "Europe" },
  { value: "budapest-hungary", label: "Budapest, Hungary", category: "Europe" },
  { value: "lisbon-portugal", label: "Lisbon, Portugal", category: "Europe" },
  { value: "santorini-greece", label: "Santorini, Greece", category: "Europe" },
  { value: "zurich-switzerland", label: "Zurich, Switzerland", category: "Europe" },

  // North America
  { value: "new-york-usa", label: "New York City, USA", category: "North America" },
  { value: "los-angeles-usa", label: "Los Angeles, USA", category: "North America" },
  { value: "toronto-canada", label: "Toronto, Canada", category: "North America" },
  { value: "vancouver-canada", label: "Vancouver, Canada", category: "North America" },
  { value: "mexico-city-mexico", label: "Mexico City, Mexico", category: "North America" },
  { value: "cancun-mexico", label: "Cancun, Mexico", category: "North America" },
  { value: "san-francisco-usa", label: "San Francisco, USA", category: "North America" },
  { value: "chicago-usa", label: "Chicago, USA", category: "North America" },

  // South America
  { value: "rio-de-janeiro-brazil", label: "Rio de Janeiro, Brazil", category: "South America" },
  { value: "buenos-aires-argentina", label: "Buenos Aires, Argentina", category: "South America" },
  { value: "lima-peru", label: "Lima, Peru", category: "South America" },
  { value: "santiago-chile", label: "Santiago, Chile", category: "South America" },
  { value: "bogota-colombia", label: "Bogota, Colombia", category: "South America" },

  // Africa
  { value: "cape-town-south-africa", label: "Cape Town, South Africa", category: "Africa" },
  { value: "marrakech-morocco", label: "Marrakech, Morocco", category: "Africa" },
  { value: "cairo-egypt", label: "Cairo, Egypt", category: "Africa" },
  { value: "nairobi-kenya", label: "Nairobi, Kenya", category: "Africa" },

  // Oceania
  { value: "sydney-australia", label: "Sydney, Australia", category: "Oceania" },
  { value: "melbourne-australia", label: "Melbourne, Australia", category: "Oceania" },
  { value: "auckland-new-zealand", label: "Auckland, New Zealand", category: "Oceania" },
];

export const popularCities: ComboboxOption[] = [
  // Major US Cities
  { value: "new-york-usa", label: "New York City, USA", category: "USA" },
  { value: "los-angeles-usa", label: "Los Angeles, USA", category: "USA" },
  { value: "chicago-usa", label: "Chicago, USA", category: "USA" },
  { value: "houston-usa", label: "Houston, USA", category: "USA" },
  { value: "miami-usa", label: "Miami, USA", category: "USA" },
  { value: "san-francisco-usa", label: "San Francisco, USA", category: "USA" },
  { value: "seattle-usa", label: "Seattle, USA", category: "USA" },
  { value: "boston-usa", label: "Boston, USA", category: "USA" },
  { value: "washington-dc-usa", label: "Washington DC, USA", category: "USA" },
  { value: "atlanta-usa", label: "Atlanta, USA", category: "USA" },

  // Canadian Cities
  { value: "toronto-canada", label: "Toronto, Canada", category: "Canada" },
  { value: "vancouver-canada", label: "Vancouver, Canada", category: "Canada" },
  { value: "montreal-canada", label: "Montreal, Canada", category: "Canada" },
  { value: "calgary-canada", label: "Calgary, Canada", category: "Canada" },
  { value: "ottawa-canada", label: "Ottawa, Canada", category: "Canada" },

  // European Cities
  { value: "london-uk", label: "London, UK", category: "Europe" },
  { value: "paris-france", label: "Paris, France", category: "Europe" },
  { value: "berlin-germany", label: "Berlin, Germany", category: "Europe" },
  { value: "madrid-spain", label: "Madrid, Spain", category: "Europe" },
  { value: "rome-italy", label: "Rome, Italy", category: "Europe" },
  { value: "amsterdam-netherlands", label: "Amsterdam, Netherlands", category: "Europe" },
  { value: "zurich-switzerland", label: "Zurich, Switzerland", category: "Europe" },
  { value: "vienna-austria", label: "Vienna, Austria", category: "Europe" },
  { value: "stockholm-sweden", label: "Stockholm, Sweden", category: "Europe" },
  { value: "copenhagen-denmark", label: "Copenhagen, Denmark", category: "Europe" },

  // Asian Cities
  { value: "tokyo-japan", label: "Tokyo, Japan", category: "Asia" },
  { value: "singapore", label: "Singapore", category: "Asia" },
  { value: "hong-kong", label: "Hong Kong", category: "Asia" },
  { value: "seoul-south-korea", label: "Seoul, South Korea", category: "Asia" },
  { value: "bangkok-thailand", label: "Bangkok, Thailand", category: "Asia" },
  { value: "kuala-lumpur-malaysia", label: "Kuala Lumpur, Malaysia", category: "Asia" },
  { value: "shanghai-china", label: "Shanghai, China", category: "Asia" },
  { value: "mumbai-india", label: "Mumbai, India", category: "Asia" },
  { value: "jakarta-indonesia", label: "Jakarta, Indonesia", category: "Asia" },
  { value: "manila-philippines", label: "Manila, Philippines", category: "Asia" },

  // Australian Cities
  { value: "sydney-australia", label: "Sydney, Australia", category: "Oceania" },
  { value: "melbourne-australia", label: "Melbourne, Australia", category: "Oceania" },
  { value: "brisbane-australia", label: "Brisbane, Australia", category: "Oceania" },
  { value: "perth-australia", label: "Perth, Australia", category: "Oceania" },

  // Middle Eastern Cities
  { value: "dubai-uae", label: "Dubai, UAE", category: "Middle East" },
  { value: "doha-qatar", label: "Doha, Qatar", category: "Middle East" },
  { value: "istanbul-turkey", label: "Istanbul, Turkey", category: "Middle East" },

  // South American Cities
  { value: "sao-paulo-brazil", label: "São Paulo, Brazil", category: "South America" },
  { value: "rio-de-janeiro-brazil", label: "Rio de Janeiro, Brazil", category: "South America" },
  { value: "buenos-aires-argentina", label: "Buenos Aires, Argentina", category: "South America" },
  { value: "lima-peru", label: "Lima, Peru", category: "South America" },

  // African Cities
  { value: "cape-town-south-africa", label: "Cape Town, South Africa", category: "Africa" },
  { value: "johannesburg-south-africa", label: "Johannesburg, South Africa", category: "Africa" },
  { value: "cairo-egypt", label: "Cairo, Egypt", category: "Africa" },
  { value: "casablanca-morocco", label: "Casablanca, Morocco", category: "Africa" },
];

// Function to get current location
export const getCurrentLocation = (): Promise<ComboboxOption> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by this browser."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Use a reverse geocoding service (you can replace this with your preferred service)
          // For now, we'll return a generic current location
          resolve({
            value: `current-location-${latitude}-${longitude}`,
            label: `Current Location (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`,
            category: "Current Location"
          });
        } catch {
          resolve({
            value: "current-location",
            label: "Current Location",
            category: "Current Location"
          });
        }
      },
      (error) => {
        reject(new Error(`Geolocation error: ${error.message}`));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 600000 // 10 minutes
      }
    );
  });
};