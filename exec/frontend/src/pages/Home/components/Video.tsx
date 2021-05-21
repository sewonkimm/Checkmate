import React, { ReactElement } from 'react';

// Video props 관련 type 설정
interface VideoProps {
  url: string;
}

const Video = ({ url }: VideoProps): ReactElement => {
  return (
    <iframe
      width="100%"
      height="600px"
      src={url}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
};

export default Video;
