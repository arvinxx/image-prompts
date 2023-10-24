import { Button, Flex } from 'antd';
import React, { FC } from 'react';

interface ObjectSectionProps {
  activeObject: string;
  objects: string[];
  onObjectClick: (object: string) => void;
}

const ObjectSection: FC<ObjectSectionProps> = ({ objects = [], activeObject, onObjectClick }) => {
  return (
    <Flex className="object-section" gap={8} wrap={'wrap'}>
      {objects.map((object, index) => (
        <Button
          key={index}
          onClick={() => onObjectClick(object)}
          type={activeObject === object ? 'primary' : undefined}
        >
          {object}
        </Button>
      ))}
    </Flex>
  );
};

export default ObjectSection;
