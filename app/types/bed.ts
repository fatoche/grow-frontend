export interface Bed {
  id: string;
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
