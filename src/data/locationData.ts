// Location data: State -> Districts with wind, seismic, temperature data
export interface LocationData {
  windSpeed: number;
  seismicZone: string;
  zoneFactor: number;
  tempMax: number;
  tempMin: number;
}

export const locationDatabase: Record<string, Record<string, LocationData>> = {
  Maharashtra: {
    Mumbai: { windSpeed: 44, seismicZone: "III", zoneFactor: 0.16, tempMax: 40, tempMin: 14 },
    Pune: { windSpeed: 39, seismicZone: "III", zoneFactor: 0.16, tempMax: 42, tempMin: 8 },
    Nagpur: { windSpeed: 44, seismicZone: "II", zoneFactor: 0.10, tempMax: 47, tempMin: 6 },
    Nashik: { windSpeed: 39, seismicZone: "III", zoneFactor: 0.16, tempMax: 43, tempMin: 7 },
    Aurangabad: { windSpeed: 39, seismicZone: "II", zoneFactor: 0.10, tempMax: 44, tempMin: 8 },
  },
  Delhi: {
    "New Delhi": { windSpeed: 47, seismicZone: "IV", zoneFactor: 0.24, tempMax: 47, tempMin: 2 },
    "Central Delhi": { windSpeed: 47, seismicZone: "IV", zoneFactor: 0.24, tempMax: 47, tempMin: 2 },
    "South Delhi": { windSpeed: 47, seismicZone: "IV", zoneFactor: 0.24, tempMax: 46, tempMin: 3 },
  },
  Karnataka: {
    Bengaluru: { windSpeed: 33, seismicZone: "II", zoneFactor: 0.10, tempMax: 38, tempMin: 12 },
    Mysuru: { windSpeed: 33, seismicZone: "II", zoneFactor: 0.10, tempMax: 38, tempMin: 11 },
    Mangaluru: { windSpeed: 39, seismicZone: "III", zoneFactor: 0.16, tempMax: 37, tempMin: 19 },
    Hubli: { windSpeed: 39, seismicZone: "III", zoneFactor: 0.16, tempMax: 40, tempMin: 10 },
  },
  "Tamil Nadu": {
    Chennai: { windSpeed: 50, seismicZone: "III", zoneFactor: 0.16, tempMax: 43, tempMin: 18 },
    Coimbatore: { windSpeed: 39, seismicZone: "III", zoneFactor: 0.16, tempMax: 39, tempMin: 14 },
    Madurai: { windSpeed: 39, seismicZone: "II", zoneFactor: 0.10, tempMax: 41, tempMin: 17 },
  },
  Gujarat: {
    Ahmedabad: { windSpeed: 39, seismicZone: "III", zoneFactor: 0.16, tempMax: 46, tempMin: 6 },
    Surat: { windSpeed: 44, seismicZone: "III", zoneFactor: 0.16, tempMax: 43, tempMin: 10 },
    Rajkot: { windSpeed: 39, seismicZone: "III", zoneFactor: 0.16, tempMax: 44, tempMin: 5 },
    Kutch: { windSpeed: 50, seismicZone: "V", zoneFactor: 0.36, tempMax: 48, tempMin: 2 },
  },
  "West Bengal": {
    Kolkata: { windSpeed: 50, seismicZone: "III", zoneFactor: 0.16, tempMax: 43, tempMin: 8 },
    Howrah: { windSpeed: 50, seismicZone: "III", zoneFactor: 0.16, tempMax: 43, tempMin: 9 },
    Siliguri: { windSpeed: 47, seismicZone: "IV", zoneFactor: 0.24, tempMax: 38, tempMin: 4 },
  },
  "Uttar Pradesh": {
    Lucknow: { windSpeed: 47, seismicZone: "III", zoneFactor: 0.16, tempMax: 46, tempMin: 3 },
    Varanasi: { windSpeed: 47, seismicZone: "III", zoneFactor: 0.16, tempMax: 46, tempMin: 5 },
    Agra: { windSpeed: 47, seismicZone: "IV", zoneFactor: 0.24, tempMax: 47, tempMin: 2 },
    Noida: { windSpeed: 47, seismicZone: "IV", zoneFactor: 0.24, tempMax: 47, tempMin: 2 },
  },
  Rajasthan: {
    Jaipur: { windSpeed: 47, seismicZone: "II", zoneFactor: 0.10, tempMax: 48, tempMin: 2 },
    Jodhpur: { windSpeed: 47, seismicZone: "II", zoneFactor: 0.10, tempMax: 49, tempMin: 2 },
    Udaipur: { windSpeed: 47, seismicZone: "II", zoneFactor: 0.10, tempMax: 44, tempMin: 4 },
  },
};

export const states = Object.keys(locationDatabase);

export function getDistricts(state: string): string[] {
  return state ? Object.keys(locationDatabase[state] || {}) : [];
}

export function getLocationData(state: string, district: string): LocationData | null {
  return locationDatabase[state]?.[district] || null;
}
