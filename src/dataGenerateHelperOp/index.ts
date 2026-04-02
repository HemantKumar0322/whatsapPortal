import { underscorIfEmpty } from "@/utils";

export const renderDataBcMatrix = (dataObj: any) => {
  if (!dataObj) return [];

  return [
    { title: 'Item No', value: underscorIfEmpty(dataObj?.proposedPurchaseOrderLine?.item_no) },
    { title: 'Description', value: underscorIfEmpty(dataObj?.article?.description) },
    { title: 'Replenishment', value: underscorIfEmpty(dataObj?.article?.replenishment) },
    { title: 'Item Category Code', value: underscorIfEmpty(dataObj?.article?.itemCategoryCode) },
    { title: 'Minimum Order Quantity', value: underscorIfEmpty(dataObj?.article?.minimumOrderQuantity) },
    { title: 'Maximum Order Quantity', value: underscorIfEmpty(dataObj?.article?.maximumOrderQuantity) },
    { title: 'Order Multiple', value: underscorIfEmpty(dataObj?.article?.orderMultiple) },
    { title: 'Leadtime', value: underscorIfEmpty(dataObj?.proposedPurchaseOrderLine?.lead_time_days) },
    { title: 'Buffer leadtime', value: underscorIfEmpty(dataObj?.article?.safetyLeadTime) },
    { title: 'Vendor name', value: underscorIfEmpty(dataObj?.proposedPurchaseOrderLine?.vendor_name) },
    { title: 'Unit cost', value: underscorIfEmpty(dataObj?.article?.unitCost) },
    { title: 'Current stock', value: underscorIfEmpty(dataObj?.article?.inventory) },
  ];
};

export const renderDataUpurchase = (dataObj: any) => {
  if (!dataObj) return [];

  return [
    { title: 'Forecast adj. %', value: underscorIfEmpty(dataObj?.proposedPurchaseOrderLine?.forecastAdjustment) },
    { title: 'Forecast adj. Period', value: underscorIfEmpty(dataObj?.article?.forecastAdjustmentPeriod) },
    { title: 'Stocked Y/N', value: underscorIfEmpty(dataObj?.article?.Replenishment) },
  ];
};

export const renderDataCalculatedFields = (dataObj: any) => {
  if (!dataObj) return [];

  return [
    { title: 'ROP (Re-order Point)', value: underscorIfEmpty(dataObj?.proposedPurchaseOrderLine?.rop) },
    { title: 'Service level', value: underscorIfEmpty(dataObj?.proposedPurchaseOrderLine?.service_level) },
    { title: 'Safety stock level', value: underscorIfEmpty(dataObj?.proposedPurchaseOrderLine?.safety_stock) },
    { title: 'Z-value', value: underscorIfEmpty(dataObj?.proposedPurchaseOrderLine?.z_value) },
    { title: 'DDLT (Demand During LeadTime)', value: underscorIfEmpty(dataObj?.proposedPurchaseOrderLine?.ddlt) },
    { title: 'EOQ (Economic Order Quantity)', value: underscorIfEmpty(dataObj?.proposedPurchaseOrderLine?.eoq) },
    { title: 'Annual Demand', value: underscorIfEmpty(dataObj?.proposedPurchaseOrderLine?.annual_demand) },
    { title: 'Ordering cost per order', value: underscorIfEmpty(dataObj?.article?.orderingCost) },
    { title: 'Annual holding cost per unit', value: underscorIfEmpty(dataObj?.article?.holdingCost) },
    { title: 'Correction Factor', value: underscorIfEmpty(dataObj?.article?.correctionFactor) },
    { title: 'Suggested Qty', value: underscorIfEmpty(dataObj?.proposedPurchaseOrderLine?.suggested_qty) }
  ];
};
