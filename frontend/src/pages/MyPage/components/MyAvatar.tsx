import React from 'react';
import styled from 'styled-components';
import { profileImage } from '../../../assets/index';

const MyAvatar = () => {
  return <Avatar src={profileImage} />;
};

const Avatar = styled.img`
  display: block;
  width: 128px;
  height: 128px;
  margin-right: 2em;
`;

export default MyAvatar;
