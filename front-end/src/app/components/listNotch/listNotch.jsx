import React from "react";
import styled from "styled-components";

const ListNotch = ({ open, setOpen }) => {
  return (
    <StyledWrapper className="md:hidden relative">
      <div className="background">
        <button
          className={`menu__icon ${open ? "open" : ""}`}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  /* <reset-style> ============================ */
  button {
    border: none;
    background: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
    font-family: inherit;
  }
  /* ============================ */
  /* <style for bg> ======== */
  .background {
    border-radius: 16px;
    mix-blend-mode: luminosity;
    box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(15px);
    width: 35px;
    height: 35px;
    padding: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* <style for menu__icon> ======== */
  .menu__icon {
    width: 26px;
    height: 26px;
    padding: 4px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: end;
    transition: transform 0.4s;
  }

  .menu__icon span {
    width: 100%;
    height: 0.25rem;
    border-radius: 0.125rem;
    background-color: rgb(0, 122, 255);
    box-shadow: 0 0.5px 2px 0 hsla(0, 0%, 0%, 0.2);
    transition:
      width 0.4s,
      transform 0.4s,
      background-color 0.4s;
    background-color: #d1d1d1;
  }

  .menu__icon :nth-child(2) {
    width: 75%;
  }

  .menu__icon :nth-child(3) {
    width: 50%;
  }

  .menu__icon:hover {
    transform: rotate(-90deg);
  }

  .menu__icon:hover span {
    width: 0.25rem;
    transform: translateX(-10px);
    background-color: rgb(255, 59, 48);
  }
  .menu__icon.open span:nth-child(1) {
    transform: rotate(45deg) translate(6px, 6px);
  }

  .menu__icon.open span:nth-child(2) {
    opacity: 0;
  }

  .menu__icon.open span:nth-child(3) {
    transform: rotate(-45deg) translate(6px, -6px);
  }
`;

export default ListNotch;
