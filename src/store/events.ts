import { create } from "zustand";

type State = {
  currentEvent: string;
  formCheckLog: any;
  formStatus: any
};

type Action = {
  setCurrentEvent: (currentEvent: State["currentEvent"]) => void;
  setFormCheckLog: (currentEvent: State["formCheckLog"]) => void;
  setFormStatus: any
};  

const useEventsStore = create<State & Action>((set) => ({
  currentEvent: 'empty',
  setCurrentEvent: (currentEvent) => set({ currentEvent: currentEvent }),
  formCheckLog: [],
  setFormCheckLog: (payload) => set({formCheckLog: payload}),
  formStatus: { exhibitor_status: "pending" },
  setFormStatus: (payload: any) => set({formStatus: payload}),
}));

export default useEventsStore;
