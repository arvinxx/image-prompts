import { Button, Flex } from 'antd';
import React, { FC } from 'react';

interface Tag {
  attribute: string;
  displayName: string;
  langName: string;
  object: string;
}

interface TagSectionProps {
  onTagClick: (tag: Tag) => void;
  selectedTags: Tag[];
  tags?: Tag[];
}

const TagSection: FC<TagSectionProps> = ({ tags = [], selectedTags, onTagClick }) => {
  return (
    <Flex className="tag-section" gap={12} wrap={'wrap'}>
      {tags.map((tag) => (
        <Button
          className={`${
            selectedTags.some((t) => t.displayName === tag.displayName) ? 'opacity-50' : ''
          }`}
          key={tag.displayName}
          onClick={() => onTagClick(tag)}
          shape={'round'}
          size={'small'}
          type={selectedTags.some((t) => t.displayName === tag.displayName) ? 'primary' : 'dashed'}
        >
          <span>{tag.displayName}</span>
          <span>{tag.langName}</span>
        </Button>
      ))}
    </Flex>
  );
};

export default TagSection;
