import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { logo } from '../assets';

// Sitemap 관련 type 설정
type Site = {
  id: number;
  name: string;
  link: string;
};
interface Sitemap {
  id: number;
  category: string;
  sites: Site[];
}

const Footer = (): ReactElement => {
  // sitemap 데이터
  const sitemap: Sitemap[] = [
    {
      id: 1,
      category: '체크메이트',
      sites: [
        {
          id: 1,
          name: '서비스 소개',
          link: '/service',
        },
        {
          id: 2,
          name: '팀',
          link: '/service/team',
        },
      ],
    },
    {
      id: 2,
      category: '서비스',
      sites: [
        {
          id: 3,
          name: 'AI 첨삭',
          link: '/check/ai',
        },
        {
          id: 4,
          name: '원어민 첨삭',
          link: '/check/mate',
        },
      ],
    },
    {
      id: 3,
      category: '회원정보',
      sites: [
        {
          id: 5,
          name: '이용약관',
          link: '/service/policy',
        },
        {
          id: 6,
          name: '개인정보처리방침',
          link: '/service/terms',
        },
      ],
    },
  ];

  // Link 컴포넌트 반복 렌더링
  const sitemapElements = sitemap.map((value) => {
    return (
      <LinkContainer key={value.id}>
        <Category>{value.category}</Category>
        {value.sites.map((site) => {
          return (
            <SiteLink to={site.link} key={site.id}>
              {site.name}
            </SiteLink>
          );
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
