import React from 'react';
import { Collapse } from 'antd';
import { AccordionProps } from '@/interface/interface';

const Accordion: React.FC<AccordionProps> = ({ panels, className = '', defaultActiveKey = [], setActiveKey, activeKey, mode = 'edit' }) => {
  const items = panels.map(panel => ({
    key: panel.key,
    label: <span className="font-medium text-base">{panel.label}</span>,
    children: panel.children,
    className: "bg-white !rounded-[8px] mb-3 overflow-hidden "
  }));

  return (
    <Collapse
      className={`rounded-lg border-none shadow-none bg-transparent overflow-y-auto ${mode === 'view' ? " pointer-events-none  " : " "} ${className}`}
      accordion={false}
      bordered={false}
      defaultActiveKey={defaultActiveKey}
      expandIconPosition="end"
      activeKey={activeKey || []}
      items={items}
      onChange={(key) => {
        if (key.length > 0) {
          setActiveKey?.(key as string[] || []);
        } else {
          setActiveKey?.([]);
        }
      }}
    />
  );
};

export default Accordion; 