import { create } from "zustand";

type State = {
  
  exhibitor: any;
  events: any;
  collection: any;
  insurance: any;
  onsite: any;
  return_shipping: any;
  service_logistics: any;
  shipment_intention: any;
};

type Action = {
  setExhibitor: (payload: any) => void;
  setEvents: (payload: any) => void;
  setCollection: (payload: any) => void;
  setInsurance: (payload: any) => void;
  setOnSite: (payload: any) => void;  
  setReturnShipping: (payload: any) => void;
  setServiceLogistics: (payload: any) => void;
  setShipmentIntention: (payload: any) => void;
  };

const useEnquiryStore = create<State & Action>((set) => ({

  exhibitor: '',
  setExhibitor: (payload: any) => set({ exhibitor: payload }),

  events: '',
  setEvents: (payload: any) => set({ events: payload }),

  collection: '',
  setCollection: (payload: any) => set({ collection: payload }),

  insurance: '',
  setInsurance: (payload: any) => set({ insurance: payload }),

  onsite: '',
  setOnSite: (payload: any) => set({ onsite: payload }),

  return_shipping: '',
  setReturnShipping: (payload: any) => set({ return_shipping: payload }),

  service_logistics: '',
  setServiceLogistics: (payload: any) => set({ service_logistics: payload }),

  shipment_intention: { shipping_goods: 'yes' },
  setShipmentIntention: (payload: any) => set({ shipment_intention: payload }),

}));

export default useEnquiryStore;
