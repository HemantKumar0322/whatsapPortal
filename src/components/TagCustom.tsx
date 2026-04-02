import { Tag } from 'antd';

interface TagCustomProps {
  children: React.ReactNode;
  color: string;
}

export const TagCustom = (props: TagCustomProps) => {

  const { children, color, ...rest } = props;

  return <Tag color={color} {...rest}>{children}</Tag>;
};