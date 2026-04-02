import { Button, Result } from 'antd';
import { IconHome } from '@/utils/icons';

interface ResultPageProps {
  status: 'success' | 'error' | 'warning' | 'info';
  title: string;
  subTitle: string;
}

const ResultPage = (props: ResultPageProps) => {

  const {
    status = 'error',
    title = 'Something went wrong',
    subTitle,
    ...rest
  } = props;

  return (
    <Result
      status={status}
      title={title}
      subTitle={subTitle}
      {...rest}
      extra={[
        <Button
          type="primary"
          key="home"
          icon={<IconHome />}
          onClick={() => window.location.href = '/'}
        >
          Back to Home
        </Button>
      ]}
    />
  );
};

export default ResultPage;