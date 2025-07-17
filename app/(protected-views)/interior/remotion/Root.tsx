import React from 'react';
import { Composition } from 'remotion';
import { InteriorTransformation } from './InteriorTransformation';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="InteriorTransformation"
        component={InteriorTransformation as any}
        durationInFrames={450} // 15 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          beforeImage: '',
          afterImage: '',
          styleName: 'Modern Design',
        }}
      />
    </>
  );
};