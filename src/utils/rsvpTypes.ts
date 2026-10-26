export type AgeGroup = 'adult' | 'teen' | 'child' | 'under5' | 'senior';
export type DietType = 'veg' | 'non-veg' | 'jain' | 'vegan' | 'eggetarian';
export type AllergyType =
  | 'peanut'
  | 'tree nut'
  | 'dairy'
  | 'gluten'
  | 'shellfish'
  | 'egg'
  | 'soy'
  | 'sesame';

export type SpecialNeed = 'high chair' | 'wheelchair' | 'elder seat' | 'stroller space';

export type WeddingSide = 'dulhan' | 'dulhe' | 'dono';

export type RelationshipType =
  | 'Family'
  | 'Friend'
  | 'Colleague'
  | 'Relative'
  | 'Neighbour'
  | 'Other';

export type AttendanceStatus = 'attending' | 'tentative' | 'declined';

export type TravelMode = 'Train' | 'Flight' | 'Car' | 'Bus';

export type RoomType = 'couple' | 'family' | 'shared';

export type PerformanceType = 'Dance' | 'Song' | 'Skit' | 'Shayari';

export interface GuestMember {
  id: string;
  name: string;
  ageGroup: AgeGroup;
  diet: DietType;
  allergies: AllergyType[];
  otherAllergy: string;
  attendingEvents: string[];
  needs: SpecialNeed[];
}

export interface TravelDetails {
  city: string;
  arrivalDate: string;
  arrivalTime: string;
  departureDate: string;
  departureTime: string;
  mode: TravelMode;
  carrierNumber: string;
  needPickup: boolean;
  pickupLoc: 'station' | 'airport';
  pickupTime: string;
  needDrop: boolean;
  dropLoc: 'station' | 'airport';
  dropTime: string;
  carsCount: number;
  needParking: boolean;
  carpoolOfferSeats: number;
  carpoolNeed: boolean;
}

export interface StayDetails {
  needRoom: boolean;
  roomsCount: number;
  checkInDate: string;
  checkOutDate: string;
  roomType: RoomType;
  extraBed: boolean;
  accessibleRoom: boolean;
  earlyCheckIn: boolean;
  ownStay: boolean;
  ownHotelName: string;
  accessibility: Array<'wheelchair ramp' | 'lift' | 'quiet room'>;
}

export interface SeatingDetails {
  groupName: string;
  sitWithNames: string;
  eldersNearEntrance: boolean;
  kidsZone: boolean;
}

export interface MastiDetails {
  danceLevel: number; // 1 to 4
  songRequest: string;
  performTypes: PerformanceType[];
  performMinutes: number;
  outfitColor: string;
  hasCelebration: boolean;
  celebrationType: 'birthday' | 'anniversary';
  celebrationDate: string;
  celebrationName: string;
  photoConsent: boolean;
  waGroupConsent: boolean;
  blessingWish: string;
  customAdvice: string;
}

export interface SpecialDietPreferences {
  noOnionGarlic: boolean;
  sattvic: boolean;
  jainSpecialPlates: number;
  glutenFreeCount: number;
  diabeticFriendlyCount: number;
  softFoodSeniors: boolean;
  spiceLevel: 1 | 2 | 3 | 4; // Mild, Medium, Teekha, Mirchi ka dushman
  beverages: string[];
  sweetToothLevel: 1 | 2 | 3 | 4 | 5;
  chefNote: string;
  menuFavorites: string[]; // up to 5 dish IDs/names
  suggestedDish: string;
}

export interface FullRsvpState {
  // Step 1: Kaun aa raha hai
  primaryName: string;
  phone: string;
  email: string;
  city: string;
  side: WeddingSide;
  relationship: string;
  howWeMet: string;
  attendance: AttendanceStatus;
  declineBlessing: string;

  // Step 2: Parivaar
  members: GuestMember[];
  sameDietForAll: boolean;

  // Step 3: Khana
  dietPreferences: SpecialDietPreferences;
  seating: SeatingDetails;

  // Step 4: Safar aur Stay
  travel: TravelDetails;
  stay: StayDetails;

  // Step 5: Masti aur Aashirwad
  masti: MastiDetails;

  // Meta & Status
  currentStep: number; // 1 to 6
  rsvpCode: string;
  createdAt: string;
  updatedAt: string;
  isConfirmed: boolean;
}
