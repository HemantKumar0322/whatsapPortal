import { create } from "zustand";
 

type State = {
  backTrackUrl: string;
  trackingType: string;
};

type Action = {
  setBackTrackUrl: (backTrackUrl: State["backTrackUrl"]) => void;
  setTrackingType: (trackingType: State["trackingType"]) => void;
};

const useBackTrackStore = create<State & Action>((set) => ({
  backTrackUrl: '',
  setBackTrackUrl: (backTrackUrl) => set({ backTrackUrl: backTrackUrl }),
  trackingType: 'shipping',
  setTrackingType: (trackingType) => set({ trackingType: trackingType }),
}));

export default useBackTrackStore;
