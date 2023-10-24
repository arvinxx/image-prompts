'use client';

import { usePluginState } from '@lobehub/chat-plugin-sdk/client';
import { Col, Row, Typography } from 'antd';
import { useTheme } from 'antd-style';
import { FC, useEffect } from 'react';
import { Flexbox } from 'react-layout-kit';

import AttributeSection from '@/components/AttributeSection';
import ObjectSection from '@/components/ObjectSection';
import ResultSection from '@/components/ResultSection';
import SelectedTagsSection from '@/components/SelectedTagsSection';
import TagSection from '@/components/TagSection';

import tagsData from './prompt.json';

interface Tag {
  attribute: string;
  displayName: string;
  langName: string;
  object: string;
}

const { Title } = Typography;

const getObjects = (data: Tag[]) => {
  const objectsSet = new Set(data.map((tag) => tag.object));
  return [...objectsSet];
};

const getAttributes = (currentObject: string, data: Tag[]) => {
  const attributesSet = new Set(
    data.filter((tag) => tag.object === currentObject).map((tag) => tag.attribute),
  );
  return [...attributesSet];
};

const Home: FC = () => {
  const objects = getObjects(tagsData) || [];
  const [activeObject, setActiveObject] = usePluginState('object', objects[0]);
  const attributes = getAttributes(activeObject, tagsData) || [];
  const [activeAttribute, setActiveAttribute] = usePluginState('attribute', attributes[0]);
  const [selectedTags, setSelectedTags] = usePluginState<Tag[]>('tags', []);

  useEffect(() => {
    const attributes = getAttributes(activeObject, tagsData);
    setActiveAttribute(attributes[0]);
  }, [activeObject]);

  const handleObjectClick = (object: string) => {
    setActiveObject(object);
  };

  const handleAttributeClick = (attribute: string) => {
    setActiveAttribute(attribute);
  };
  const updateSelectedTags = (tag: Tag) => {
    const isSelected = selectedTags.some((t) => t.displayName === tag.displayName);

    return isSelected
      ? selectedTags.filter((t) => t.displayName !== tag.displayName)
      : [...selectedTags, tag];
  };

  const handleTagClick = (tag: Tag) => {
    setSelectedTags(updateSelectedTags(tag));
  };

  const theme = useTheme();
  return (
    <Flexbox
      style={{
        background: theme.colorBgLayout,
        margin: '0 auto',
        maxWidth: '1200px',
        padding: '24px',
      }}
    >
      <Title
        level={2}
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '24px',
        }}
      >
        Image Prompts
      </Title>
      <Row gutter={[24, 16]}>
        <Col lg={18} xs={24}>
          <Flexbox gap={24}>
            <Flexbox>
              <h3>对象选择区</h3>
              <ObjectSection
                activeObject={activeObject}
                objects={objects}
                onObjectClick={handleObjectClick}
              />
            </Flexbox>
            <Flexbox>
              <h3>属性选择区</h3>
              <AttributeSection
                attributes={getAttributes(activeObject, tagsData)}
                onAttributeClick={handleAttributeClick}
                selectedAttribute={activeAttribute}
              />
            </Flexbox>
            <Flexbox>
              <h3>标签选择区</h3>
              <TagSection
                onTagClick={handleTagClick}
                selectedTags={selectedTags}
                tags={tagsData.filter(
                  (tag) => tag.object === activeObject && tag.attribute === activeAttribute,
                )}
              />
            </Flexbox>
            <Flexbox>
              <h3>当前选中</h3>
              <SelectedTagsSection onTagClick={handleTagClick} selectedTags={selectedTags} />
            </Flexbox>
          </Flexbox>
        </Col>
        <Col lg={6} xs={24}>
          <ResultSection
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags as any}
            tagsData={tagsData}
          />
        </Col>
      </Row>
    </Flexbox>
  );
};

export default Home;
