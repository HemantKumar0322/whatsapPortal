import { create } from "zustand";
import { ENQUIRY_PANELS_KEYS } from "@/utils/constants";

type State = {
  activeKey: string[];
};

type Action = {
  setActiveKey: (activeKey: State["activeKey"]) => void;
};  

const useActiveKeyStore = create<State & Action>((set) => ({
  activeKey: [...Object.values(ENQUIRY_PANELS_KEYS)],
  // activeKey: [ENQUIRY_PANELS_KEYS.service as string],
  setActiveKey: (activeKey) => set({ activeKey: activeKey })
}));

export default useActiveKeyStore;
