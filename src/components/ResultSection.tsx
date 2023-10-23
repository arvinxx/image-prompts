import { App, Button, Flex, Input, Tooltip, Typography } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { Flexbox } from 'react-layout-kit';

interface Tag {
  attribute: string | undefined;
  displayName: string | undefined;
  langName: string | undefined;
  object: string | undefined;
}

interface ResultSectionProps {
  selectedTags: Tag[];
  setSelectedTags: (tags: Tag[]) => void;
  tagsData: Tag[];
}

const ResultSection: FC<ResultSectionProps> = ({
  selectedTags = [],
  setSelectedTags,
  tagsData,
}) => {
  const { message } = App.useApp();

  const CONSTANT_TEXT_1 =
    'Natural Lighting, Studio lighting, Cinematic Lighting, Crepuscular Rays, X-Ray, Backlight';
  const CONSTANT_TEXT_2 =
    'insanely detailed and intricate, gorgeous, Surrealistic, smooth, sharp focus, Painting, Digital Art, Concept Art, Illustration, Trending on ArtStation, in a symbolic and meaningful style, 8K';

  const [resultText, setResultText] = useState(
    selectedTags.map((tag) => tag.displayName).join(', '),
  );
  const [charCount, setCharCount] = useState(resultText.length);

  useEffect(() => {
    setResultText(selectedTags.map((tag) => tag.displayName).join(', '));
  }, [selectedTags]);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedTags.map((tag) => tag.displayName).join(', '));
    message.success('已复制到剪贴板');
  };

  const handleClear = () => {
    setSelectedTags([]);
    setCharCount(0);
    message.success('已清空结果框');
  };

  // 更新 findTagData 函数
  const findTagData = (displayName: string) => {
    const foundTag = tagsData.find(
      (tag) => tag.displayName?.toLowerCase() === displayName.toLowerCase(),
    );
    if (foundTag) {
      return {
        attribute: foundTag.attribute,
        displayName: foundTag.displayName,
        langName: foundTag.langName,
        object: foundTag.object,
      };
    }
    return {
      attribute: undefined,
      displayName: undefined,
      langName: undefined,
      object: undefined,
    };
  };

  // 更新 handleConstantText 函数
  const handleConstantText = (constantText: string) => {
    const newText = resultText ? resultText + ', ' + constantText : constantText;
    const displayNames = newText.split(', ');
    const uniqueDisplayNames = [...new Set(displayNames)];

    const newSelectedTags = uniqueDisplayNames.map((displayName) => {
      const {
        object,
        attribute,
        langName,
        displayName: foundDisplayName,
      } = findTagData(displayName);
      return {
        attribute,
        displayName: foundDisplayName || displayName,
        langName,
        object,
      };
    });

    setSelectedTags(newSelectedTags);
    setResultText(uniqueDisplayNames.join(', '));
    message.success('已插入指定文本');
    setCharCount(uniqueDisplayNames.join(', ').length);
  };

  // 更新 handleResultTextChange 函数
  const handleResultTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setResultText(newText);
    setCharCount(newText.length); // 更新 charCount
    const newSelectedTags = newText.split(', ').map((displayName) => {
      const { object, attribute, langName } = findTagData(displayName);
      return { attribute, displayName, langName, object };
    });
    setSelectedTags(newSelectedTags);
  };

  const handleBlur = () => {
    // Replace symbols in text
    const replacedText = resultText
      .replaceAll('，', ', ')
      .replaceAll(/,(\s{0,1})/g, ', ')
      .replaceAll(/(,\s*){2,}/g, ', ');

    // Remove duplicate items
    const displayNames = replacedText.split(', ');
    const uniqueDisplayNames = [
      ...new Set(displayNames.map((displayName) => displayName.toLowerCase())),
    ];

    const uniqueSelectedTags = uniqueDisplayNames.map((displayName) => {
      const {
        object,
        attribute,
        langName,
        displayName: foundDisplayName,
      } = findTagData(displayName);
      return {
        attribute,
        displayName: foundDisplayName || displayName,
        langName,
        object,
      };
    });

    setSelectedTags(uniqueSelectedTags);

    const newText = uniqueSelectedTags.map((tag) => tag.displayName).join(', ');
    setResultText(newText);
    setCharCount(newText.length);
  };

  return (
    <Flexbox className="result-section" gap={8}>
      <Flex gap={8} wrap={'wrap'}>
        <Tooltip title="插入肖像常用光线">
          <Button onClick={() => handleConstantText(CONSTANT_TEXT_1)}>肖像光线</Button>
        </Tooltip>
        <Tooltip title="插入常用图像润色词">
          <Button onClick={() => handleConstantText(CONSTANT_TEXT_2)}>常用润色</Button>
        </Tooltip>
        <Button onClick={handleCopy}>复制</Button>
        <Button onClick={handleClear}>清空</Button>
      </Flex>

      <Input.TextArea
        onBlur={handleBlur}
        onChange={handleResultTextChange}
        readOnly={false}
        rows={10}
        value={resultText}
      />
      <Typography.Text style={{ color: charCount > 380 ? 'red' : 'inherit' }}>
        {charCount}/380
      </Typography.Text>
      <Typography.Paragraph type="secondary">
        Tips：Prompt
        中的词语顺序代表其权重，越靠前权重越大。物体不要太多，两到三个就好。若要特别强调某个元素，可以加很多括号或者惊叹号，比如
        beautiful forest background, desert!!, (((sunset))) 中会优先体现「desert」和「sunset」元素。
        <br />
        假设你在提示词中使用了
        mountain，生成的图像很可能会有树。但如果你想要生成没有树的山的图像，可以使用 mountain |
        tree:-10。其中 tree:-10 表示对于树的权重非常负，因此生成的图像中不会出现树。
      </Typography.Paragraph>
    </Flexbox>
  );
};

export default ResultSection;
