import { create } from 'zustand';
import { type BookingInfo } from './constants';

type BookingStore = {
  step: 1 | 2 | 3 | 4;
  helpOpen: boolean;
  booking: BookingInfo;
  setStep: (step: BookingStore['step']) => void;
  setHelpOpen: (helpOpen: BookingStore['helpOpen']) => void;
  setBooking: (booking: BookingStore['booking']) => void;
  resetAll: () => void;
};

export const useBookingStore = create<BookingStore>((set) => ({
  step: 1,
  helpOpen: false,
  booking: {},
  setStep: (step) => set(() => ({ step: step })),
  setHelpOpen: (helpOpen) => set(() => ({ helpOpen: helpOpen })),
  setBooking: (booking) => set(() => ({ booking: booking })),
  resetAll: () => set(() => ({ step: 1, helpOpen: false, booking: {} })),
}));
