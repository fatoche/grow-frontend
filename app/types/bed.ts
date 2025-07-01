export interface Bed {
  id: string;
  index: number; // User-readable bed index (1-based)
  length: number; // in centimeters
  width: number; // in centimeters
}

export interface BedCreationRequest {
  numberOfBeds: number;
  length: number; // in centimeters
  width: number; // in centimeters
}

export interface BedCreationResponse {
  beds: Bed[];
  message: string;
}
