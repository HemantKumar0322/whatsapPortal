import { create } from "zustand";
 

type State = {
  shipmentList: Array<{
    item_number: number;
    dimensions_length: string;
    dimensions_width: string;
    dimensions_height: string;
    weight: number | string;
    declared_value: number | string;
    description: string;
  }>;
};

type Action = {
  setShipmentList: (shipment: State["shipmentList"]) => void;
};

const useShipmentStore = create<State & Action>((set) => ({
  shipmentList: [
    {
      item_number: 1,
      dimensions_length: '',
      dimensions_width: '',
      dimensions_height: '',
      weight: '',
      declared_value: '',
      description: ''
    }
  ],
  setShipmentList: (shipment) => set({ shipmentList: shipment }),
}));

export default useShipmentStore;
