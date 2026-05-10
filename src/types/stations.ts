export type Station = {
  id: string | number;
  name: string;
  address: string;
  availableSlots: number;
  totalSlots: number;
  location: {
    lat: number;
    lng: number;
  };
  distance?: string;
  powerKW: number;
  isBusy: boolean;
};
