import React from 'react';
import styled from 'styled-components'

const Review: React.FC = () => {	

	return(
		<ReviewWrap>
			<Header>
				<ReviewHeader>700</ReviewHeader>
				<ReviewHeader>D-12</ReviewHeader>
			</Header>
			<Title>
				Need a quick help for my history essay
			</Title>
			<Body>
				sorry for being hurry
			</Body>
			<Footer>
				<p>답변 2</p>
				<p>작성일 2021.4.29</p>
			</Footer>
		</ReviewWrap>
	);
};
const ReviewWrap = styled.div`
	// border: 2px solid gray;
	box-shadow: 0px 5px 20px 2px rgba(48, 70, 89, 0.15);
	border-radius: 10px;
	padding: .4em;
`;
const Header = styled.div`
	display: flex;
	flex-direction: start;
	font-weight: 600;
	font-size: 16px;
`;
const ReviewHeader = styled.span`
	font-size: 16px;
	margin-right: 12px;
	border-radius: 20px;
	padding: 4px 15px;
	color: ${({ theme }) => theme.colors.white};
	background-color: #038EFC;
`;
const Title = styled.h2`
	font-weight: 700;
	font-size: 1.4rem;
	text-align: start;
`;
const Body = styled.h3`
	font-weight: 400;
	font-size: 1.2rem;
	text-align: start;
`;
const Footer = styled.footer`
	font-weight: 400;
	font-size: 1.1rem;
	text-align: end;
`;

export default Review;