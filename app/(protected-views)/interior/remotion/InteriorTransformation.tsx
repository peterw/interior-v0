import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  Img,
  Audio,
  staticFile,
} from 'remotion';

interface InteriorTransformationProps {
  beforeImage: string;
  afterImage: string;
  styleName: string;
  videoStyle?: string;
}

export const InteriorTransformation: React.FC<InteriorTransformationProps> = ({
  beforeImage,
  afterImage,
  styleName,
  videoStyle = 'smooth-transition',
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  // Timeline:
  // 0-90 frames (3s): Show before image with zoom in
  // 90-180 frames (3s): Transition effect
  // 180-360 frames (6s): Show after image with pan
  // 360-450 frames (3s): Split screen comparison

  const beforeOpacity = interpolate(
    frame,
    [0, 90, 120, 180],
    [1, 1, 0, 0],
    { extrapolateRight: 'clamp' }
  );

  const afterOpacity = interpolate(
    frame,
    [90, 120, 180],
    [0, 0, 1],
    { extrapolateRight: 'clamp' }
  );

  const zoomBefore = interpolate(
    frame,
    [0, 90],
    [1, 1.1],
    { extrapolateRight: 'clamp' }
  );

  const zoomAfter = interpolate(
    frame,
    [180, 360],
    [1.1, 1],
    { extrapolateRight: 'clamp' }
  );

  const splitPosition = interpolate(
    frame,
    [360, 390, 450],
    [100, 50, 50],
    { extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: '#000' }}>
      {/* Background music */}
      {/* <Audio src={staticFile('elegant-music.mp3')} volume={0.3} /> */}

      {/* Before Image */}
      <Sequence from={0} durationInFrames={180}>
        <AbsoluteFill
          style={{
            opacity: beforeOpacity,
            transform: `scale(${zoomBefore})`,
          }}
        >
          <Img
            src={beforeImage}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 50,
              left: 50,
              color: 'white',
              fontSize: 48,
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
            }}
          >
            BEFORE
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Transition Effect */}
      <Sequence from={90} durationInFrames={90}>
        <AbsoluteFill
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)',
            opacity: interpolate(frame, [90, 120, 150, 180], [0, 1, 1, 0]),
          }}
        />
      </Sequence>

      {/* After Image */}
      <Sequence from={120} durationInFrames={240}>
        <AbsoluteFill
          style={{
            opacity: afterOpacity,
            transform: `scale(${zoomAfter})`,
          }}
        >
          <Img
            src={afterImage}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 50,
              right: 50,
              color: 'white',
              fontSize: 48,
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
            }}
          >
            {styleName.toUpperCase()}
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Split Screen Comparison */}
      <Sequence from={360} durationInFrames={90}>
        <AbsoluteFill>
          {/* Left side - Before */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: `${splitPosition}%`,
              height: '100%',
              overflow: 'hidden',
            }}
          >
            <Img
              src={beforeImage}
              style={{
                width: '1920px',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 50,
                left: 50,
                color: 'white',
                fontSize: 36,
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
              }}
            >
              BEFORE
            </div>
          </div>

          {/* Right side - After */}
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              width: `${100 - splitPosition}%`,
              height: '100%',
              overflow: 'hidden',
            }}
          >
            <Img
              src={afterImage}
              style={{
                width: '1920px',
                height: '100%',
                objectFit: 'cover',
                position: 'absolute',
                right: 0,
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 50,
                right: 50,
                color: 'white',
                fontSize: 36,
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
              }}
            >
              AFTER
            </div>
          </div>

          {/* Divider line */}
          <div
            style={{
              position: 'absolute',
              left: `${splitPosition}%`,
              top: 0,
              width: 4,
              height: '100%',
              backgroundColor: 'white',
              transform: 'translateX(-50%)',
              boxShadow: '0 0 10px rgba(255,255,255,0.5)',
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Watermark */}
      <div
        style={{
          position: 'absolute',
          top: 30,
          right: 30,
          color: 'white',
          fontSize: 18,
          opacity: 0.8,
          fontFamily: 'Arial, sans-serif',
        }}
      >
        Styled Interior AI
      </div>
    </AbsoluteFill>
  );
};