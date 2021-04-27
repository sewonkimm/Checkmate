import React, { ReactElement } from 'react';

interface VideoProps {
  url: string;
}

const Video = ({ url }: VideoProps): ReactElement => {
  return (
    <iframe
      width="100%"
      height="400px"
      src={url}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
};

export default Video;
