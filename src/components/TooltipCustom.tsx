import React from 'react';
import { Tooltip, TooltipProps } from 'antd';

interface TooltipCustomProps extends Omit<TooltipProps, 'children'> {
  children: React.ReactNode;
  className?: string;
}

const TooltipCustom: React.FC<TooltipCustomProps> = ({
  children,
  className = '',
  ...rest
}) => {
  return (
    <Tooltip
      className={className}
      placement="top"
      mouseEnterDelay={0.5}
      title="Tooltip content"
      {...rest}
    >
      {children}
    </Tooltip>
  );
};

export default TooltipCustom; 