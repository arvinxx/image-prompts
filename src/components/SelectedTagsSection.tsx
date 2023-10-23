import { Button, Flex, Typography } from 'antd';
import React, { FC } from 'react';

interface ITag {
  attribute: string;
  displayName: string;
  langName: string;
  object: string;
}

interface SelectedTagsSectionProps {
  onTagClick: (tag: ITag) => void;
  selectedTags: ITag[];
}

const SelectedTagsSection: FC<SelectedTagsSectionProps> = ({ selectedTags = [], onTagClick }) => {
  // 按对象和属性对标签进行分组
  const tagsByObjectAndAttribute = selectedTags.reduce<Record<string, Record<string, ITag[]>>>(
    (acc, tag) => {
      if (!acc[tag.object]) {
        acc[tag.object] = {};
      }
      if (!acc[tag.object][tag.attribute]) {
        acc[tag.object][tag.attribute] = [];
      }
      acc[tag.object][tag.attribute].push(tag);
      return acc;
    },
    {},
  );

  return (
    <Flex className="selected-tags-section" gap={8} wrap={'wrap'}>
      {Object.entries(tagsByObjectAndAttribute).flatMap(([object, tagsByAttribute]) =>
        Object.entries(tagsByAttribute).map(([attribute, tags]) => (
          <Flex align={'center'} gap={12} key={attribute} wrap={'wrap'}>
            <Typography>
              {object} - {attribute}
            </Typography>

            {(tags as ITag[]).map((tag) => (
              <Button key={tag.displayName} shape={'round'}>
                <div onClick={() => onTagClick(tag)}>
                  <span>{tag.displayName}</span>
                  <span>{tag.langName}</span>
                </div>
              </Button>
            ))}
          </Flex>
        )),
      )}
    </Flex>
  );
};

export default SelectedTagsSection;
