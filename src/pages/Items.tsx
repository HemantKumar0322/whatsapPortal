import React, { useCallback, useEffect, useState } from 'react';
import { Card, Row, Col, Typography, Space, Tabs } from 'antd';
import { useAppNotification } from '@/hooks/useAppNotification';
import { useSearchParams } from 'react-router-dom';

import ButtonSimple from '@/components/ButtonSimple';
import DemandForcast from '@/container/DemandForcast';
import AnnualDemand from '@/container/AnnualDemand';
import DetailsCard from '@/components/DetailsCard';

import { logHelper } from '@/utils';
import { renderDataBcMatrix, renderDataUpurchase, renderDataCalculatedFields } from '@/dataGenerateHelperOp';
import { useGetItemsQuery } from '@/services/service';
import { renderDataType, HistoricalData } from '@/interface/interface';
const { Title, Text } = Typography;

const TAG: string = "Items page : ";

const Items: React.FC = () => {

  const { errorToast } = useAppNotification();

  const [searchParams] = useSearchParams();
  const itemNo = searchParams.get('item_no');

  const [loading, setLoading] = useState<boolean>(false);
  const [bcMatrix, setBcMatrix] = useState<renderDataType[]>([]);
  const [uPurchaseMetrics, setuPurchaseMetrics] = useState<renderDataType[]>([]);
  const [calculatedFields, setCalculatedFields] = useState<renderDataType[]>([]);
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([]);
  const [articlesData, setArticlesData] = useState<any[]>([]);

  const {
    data: itemsData,
    isLoading: isLoadingItems,
    error: itemsError
  } = useGetItemsQuery(itemNo, {
    skip: !itemNo
  });

  // itemsData().then(data => {
  //   console.log("Fetched item data:", data);
  // }).catch(error => {
  //   console.error("Error fetching item data:", error);
  // });

  useEffect(() => {
    if (itemsData) {
      handleApiResponseData(itemsData);
    } else if (itemsError) {
      logHelper(TAG, "Error fetching proposed orders", itemsError);
      errorToast("Failed to fetch data");
    }
  }, [itemsData, isLoadingItems]);

  const handleApiResponseData = useCallback((itemDetails: any) => {
    console.log("Handling API response data", itemDetails);
    try {
      if (!itemDetails || !itemDetails.data || !itemDetails.data.data) {
        logHelper(TAG, "No data found in API response", itemDetails);
        return [];
      }

      const mappedData = itemDetails.data.data;
      const bcMatrix = renderDataBcMatrix(mappedData);
      const uPurchase = renderDataUpurchase(mappedData);
      const calculatedFields = renderDataCalculatedFields(mappedData);
      setBcMatrix(bcMatrix);
      setuPurchaseMetrics(uPurchase);
      setCalculatedFields(calculatedFields);
      setHistoricalData(mappedData?.ledgerEntries || []);
      setArticlesData(mappedData?.article || []);

      logHelper(TAG, "Successfully mapped API data", { count: mappedData.length });
      return mappedData;
    } catch (error) {
      logHelper(TAG, "Error mapping API data", error);
      errorToast("Failed to process data from server");
      return [];
    }
  }, [errorToast]);

  const tabItems: any = useCallback(() => [
    {
      key: '1',
      label: 'Demand and Forecast',
      children: <DemandForcast historicalData={historicalData} articlesData={articlesData} />,
    },
    {
      key: '2',
      label: 'Annual Demand',
      children: <AnnualDemand historicalData={historicalData} articlesData={articlesData} />,
    },
  ], [historicalData, articlesData])();

  const handleAcceptProposal = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Handle success
    }, 1000);
  };

  const handleOpenInBC = () => {
    // Handle open in BC action
    console.log('Opening in BC...');
  };

  return (
    <div className="w-full flex-1 flex flex-col overflow-hidden max-h-full p-6">

      <div className="mb-6">
        <Title level={2} className="!mb-0 !text-2xl font-bold">
          {itemNo ? `Item No - ${itemNo}` : 'Item No - Item Name'}
        </Title>
      </div>

      {!itemNo ? (
        <Card>
          <div className="text-center py-8">
            <Text className="text-gray-500">
              Please provide an itemNo parameter in the URL. Example: ?itemNo=ITEM001
            </Text>
          </div>
        </Card>
      ) : isLoadingItems ? (
        <Card>
          <div className="text-center py-8">
            <Text>Loading item data...</Text>
          </div>
        </Card>
      ) : (

        <Row gutter={[24, 24]} className="flex-1">
          {/* Left Column - Historical Data */}
          <Col xs={24} lg={14}>
            <Card className="h-full">
              <Title level={4} className="!mb-4">Historical Data</Title>
              <Tabs
                defaultActiveKey="1"
                items={tabItems}
              />
            </Card>
          </Col>

          {/* Right Column - Metrics and Actions */}
          <Col xs={24} lg={10}>
            <Space direction="vertical" size="large" className="w-full">

              <DetailsCard title="BC Metrics" data={bcMatrix} className="!mb-4" />
              <DetailsCard title="uPurchase Metrics" data={uPurchaseMetrics} className="!mb-4" />
              <DetailsCard title="Calculated Fields" data={calculatedFields} className="!mb-4" />

              {/* Action Buttons */}
              <Card className='hidden'>
                <Space direction="vertical" size="middle" className="w-full">
                  <ButtonSimple
                    type="primary"
                    loading={loading}
                    onClick={handleAcceptProposal}
                    className="!bg-green-600 !hover:bg-green-700 !text-white !border-green-600"
                  >
                    Accept Proposal
                  </ButtonSimple>
                  <ButtonSimple
                    onClick={handleOpenInBC}
                    className="!bg-blue-600 !hover:bg-blue-700 !text-white !border-blue-600"
                  >
                    Open in BC
                  </ButtonSimple>
                </Space>
              </Card>
            </Space>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Items;
