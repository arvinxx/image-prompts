import { Button, Flex } from 'antd';
import React, { FC } from 'react';

interface AttributeSectionProps {
  attributes: string[];
  onAttributeClick: (attribute: string) => void;
  selectedAttribute: string;
}

const AttributeSection: FC<AttributeSectionProps> = ({
  attributes = [],
  selectedAttribute,
  onAttributeClick,
}) => {
  return (
    <Flex className="attribute-section" gap={8} wrap={'wrap'}>
      {attributes.map((attribute) => (
        <Button
          key={attribute}
          onClick={() => onAttributeClick(attribute)}
          type={attribute === selectedAttribute ? 'primary' : undefined}
        >
          {attribute}
        </Button>
      ))}
    </Flex>
  );
};

export default AttributeSection;
