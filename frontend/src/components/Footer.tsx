import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { logo } from '../assets';

// Sitemap 관련 type 설정
type Site = {
  name: string;
  link: string;
};
interface Sitemap {
  category: string;
  sites: Site[];
}

const Footer = (): ReactElement => {
  // sitemap 데이터
  const sitemap: Sitemap[] = [
    {
      category: '체크메이트',
      sites: [
        {
          name: '서비스 소개',
          link: '/Service',
        },
        {
          name: '팀',
          link: '/Service/team',
        },
      ],
    },
    {
      category: '서비스',
      sites: [
        {
          name: 'AI 첨삭',
          link: '/Check/ai',
        },
        {
          name: '원어민 첨삭',
          link: '/Check/mate',
        },
      ],
    },
    {
      category: '회원정보',
      sites: [
        {
          name: '이용약관',
          link: '/Service/policy',
        },
        {
          name: '개인정보처리방침',
          link: '/Service/terms',
        },
      ],
    },
  ];

  // Link 컴포넌트 반복 렌더링
  const sitemapElements = sitemap.map((value) => {
    return (
      <LinkContainer>
        <Category>{value.category}</Category>
        {value.sites.map((site) => {
          return <SiteLink to={site.link}>{site.name}</SiteLink>;
        })}
      </LinkContainer>
    );
  });

  // Footer 컴포넌트 렌더링
  return (
    <FooterContainer>
      <SitemapContainer>
        <img src={logo} alt="logo" width="185" />

        {sitemapElements}
      </SitemapContainer>
      <Copyright>Copyright © SAMSUNG All Rights Reserved.</Copyright>
    </FooterContainer>
  );
};

// Footer style
const FooterContainer = styled.div`
  width: 100%;
  height: 312px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 200px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
`;

const SitemapContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 20px;
  gap: 100px;
`;

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-contents: start;
  gap: 10px;
  text-align: left;
`;
const Category = styled.p`
  font-weight: bold;
`;
const SiteLink = styled(Link)`
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSizes.body};
  color: ${({ theme }) => theme.colors.white};
`;

const Copyright = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.body};
`;
export default Footer;
