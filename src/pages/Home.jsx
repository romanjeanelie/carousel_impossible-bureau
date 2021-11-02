import React from "react";
import { Link } from "react-router-dom";
import { useViewport } from "../hooks/Viewport";

// Styles
import styled from "styled-components";
import { device } from "../styles/GlobalStyles";
import { motion } from "framer-motion";

/**
 * Styles
 */
const HomePage = styled.div`
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.main};
`;

const Header = styled.div`
  position: absolute;
  width: 100%;
  top: 35%;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
`;

const Title = styled.div`
  position: relative;
  left: 43%;
  h1 {
    font-size: 4rem;
    text-transform: uppercase;
    overflow: hidden;
    span {
      display: block;
    }
    span.italic {
      font-family: ${({ theme }) => theme.fonts.detail};
      font-style: italic;
      margin-left: 3rem;
      transform: translateY(60%);
    }
  }

  @media ${device.mobile} {
    h1 {
      font-size: 2rem;
    }
  }
`;

const List = styled.ul`
  margin-top: 7rem;
  position: absolute;
  left: 58%;
  text-align: right;
  font-size: 1.8rem;
  li {
    margin-bottom: 2rem;
    a {
      display: inline-block;
      transition: opacity 300ms;
      &:hover {
        opacity: 0.5;
      }
    }
  }
  @media ${device.mobile} {
    text-align: right;
    margin-top: 2rem;
    font-size: 1rem;
    li {
      margin-bottom: 1rem;
    }
  }
`;

/**
 * Animations
 */
const titleUp = {
  hidden: {
    y: "-100%",
  },
  visible: {
    y: 0,
    transition: { duration: 1.5 },
  },
  exit: {
    opacity: 0,
    transition: { ease: "easeOut", duration: 0.5 },
  },
};

const titleDown = {
  hidden: {
    y: "100%",
  },
  visible: {
    y: 0,
    transition: { duration: 1.5 },
  },
  exit: {
    opacity: 0,
    transition: { ease: "easeOut", duration: 0.5 },
  },
};

const linksFadeOut = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { duration: 1.55 },
  },
  exit: {
    opacity: 0,
    transition: { ease: "easeOut", duration: 0.5 },
  },
};

/**
 *  Page
 */
const Home = () => {
  const { isTablet } = useViewport();
  return (
    <HomePage className="page">
      <Header>
        <Title>
          <h1>
            <motion.span variants={titleUp} initial="hidden" animate="visible" exit="exit">
              Carousel for
            </motion.span>
            <motion.span className="italic" variants={titleDown} initial="hidden" animate="visible" exit="exit">
              Impossible Bureau
            </motion.span>
          </h1>
        </Title>
        <List as={motion.ul} variants={linksFadeOut} initial="hidden" animate="visible" exit="exit">
          <li>
            <Link to="/ClassicCarousel">classic version</Link>
          </li>
          <li>
            <Link to="/WebglCarousel">webgl version</Link>
          </li>
        </List>
      </Header>
    </HomePage>
  );
};

export default Home;
