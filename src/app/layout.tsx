import { Metadata } from 'next';
import React from 'react';

import App from './App';
import StyleRegistry from './StyleRegistry';
import './global.css';

export const metadata: Metadata = {
  description:
    'IMGPrompt 是一个直观的图像提示词生成工具，可以方便地在 Stable Diffusion 和 Midjourney 的流程中使用，使图像提示词的创建变得简单而有效，轻松激发创意并获得更好的图片结果。通过 IMGPrompt，你可以将自己的创意想法转化为视觉现实。',
  title: 'IMGPrompt - Stable Diffusion 和 Midjourney 的图像提示词生成工具',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html>
    <body>
      <StyleRegistry>
        <App>{children}</App>
      </StyleRegistry>
    </body>
  </html>
);

export default RootLayout;
