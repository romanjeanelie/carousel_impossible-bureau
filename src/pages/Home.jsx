import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import { motion } from "framer-motion";

/**
 * Styles
 */
const HomePage = styled.div`
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
`;

const Header = styled.div`
  position: absolute;
  top: 35%;
  right: 33%;

  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
`;

const Title = styled.div`
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
`;

const List = styled.ul`
  margin-top: 7rem;
  width: 100%;
  text-align: right;
  font-size: 1.8rem;
  li {
    margin-bottom: 2rem;
    transition: opacity 300ms;
  }

  li:hover {
    opacity: 0.5;
  }

  li a {
    display: block;
  }
`;

/**
 * Animations
 */
const goUp = {
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
const goDown = {
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

const fadeOut = {
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

const Home = () => {
  return (
    <HomePage className="page">
      <Header>
        <Title>
          <h1>
            <motion.span variants={goUp} initial="hidden" animate="visible" exit="exit">
              Carrousel for
            </motion.span>
            <motion.span className="italic" variants={goDown} initial="hidden" animate="visible" exit="exit">
              Impossible Bureau
            </motion.span>
          </h1>
        </Title>
        <List as={motion.ul} variants={fadeOut} initial="hidden" animate="visible" exit="exit">
          <li>
            <Link to="/ClassicCarrousel">classic version</Link>
          </li>
          <li>
            <Link to="/WebglCarrousel">webgl version</Link>
          </li>
        </List>
      </Header>
    </HomePage>
  );
};

export default Home;
