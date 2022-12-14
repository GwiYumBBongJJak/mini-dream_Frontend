import styled, { css } from "styled-components";

export const Text = styled.p`
	width: ${({ width }) => (width ? width : "")};
	height: ${({ height }) => (height ? height : "")};
	display: ${({ dp }) => (dp ? dp : "")};
	color: ${({ color }) => (color ? color : "")};
	font-size: ${({ fs }) => (fs ? fs : "")};
	font-weight: ${({ fw }) => (fw ? fw : "")};
	text-align: ${({ ta }) => (ta ? ta : "")};
	letter-spacing: ${({ ls }) => (ls ? ls : "")};
	line-height: ${({ lh }) => (lh ? lh : "18px")};
	color: ${({ color }) => (color ? color : "")};
	padding: ${({ pd }) => (pd ? pd : "")}px;
	margin: ${({ margin }) => (margin ? margin : "")}px;

	${({ variant }) => {
		switch (variant) {
			case "join-alert-text":
				return css`
					color: #744a73;
					font-weight: 600;
					font-size: 17px;
					letter-spacing: 0.04em;
					position: relative;
				`;
			case "lucky":
				return css`
					color: #4fbe94;
					font-weight: 600;
					font-size: 20px;
				`;
			case "sad":
				return css`
					color: #80bfff;
					font-weight: 600;
					font-size: 20px;
				`;
			case "horror":
				return css`
					color: #9e9e9e;
					font-weight: 600;
					font-size: 20px;
				`;
			default:
				break;
		}
	}}
`;
