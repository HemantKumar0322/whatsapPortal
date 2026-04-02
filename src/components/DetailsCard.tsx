import { Card, Typography, } from 'antd';

const { Title, Text } = Typography;

const DetailsCard = (props: any) => {

  const { title, data, className } = props

  return (
    <>
      <Card>
        <Title level={4} className="!mb-4">{title ? title : 'Title'}</Title>
        <div className="space-y-1">
          {data.map((item: any) => (
            <div className={`flex justify-between items-center ${className}`}>
              <Text className="text-gray-600 text-sm me-2 min-w-[100px]">{item?.title ? item?.title : '-'}</Text>
              <Text strong className="text-lg text-end">{item?.value ? item?.value.toLocaleString() : '-'}</Text>
            </div>
          ))}
        </div>
      </Card>
    </>
  )
}

export default DetailsCard
