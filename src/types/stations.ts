export type Station = {
  id: string | number;
  name: string;
  address: string;
  availableSlots: number;
  totalSlots: number;
  powerKW: number;
  isBusy: boolean;
};
