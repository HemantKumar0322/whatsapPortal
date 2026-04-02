import { Typography } from 'antd';

const { Title } = Typography;

interface PageTitleProps {
  title: string;
}

export const PageTitle: React.FC<PageTitleProps> = (props: PageTitleProps) => {
  const { title } = props;
  return (
    <div className="flex justify-between items-center mb-0">
      <Title level={2}>{title}</Title>
    </div>
  );
};


export const FormError = ({ error }: { error: string }) => {
  return <div className=" text-[#ff4d4f] text-[12px] mt-1 " >{error} </div>;
};
