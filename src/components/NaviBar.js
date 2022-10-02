import React from "react";
import Identicon from "react-identicons";
import styled from "styled-components";

const Container = styled.div`
  width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
const SectionNavi = styled(Container)`
  height: 50px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  div:nth-child(2) {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    span {
      font-size: 12px;
      margin-right: 5px;
    }
  }
`;
function NaviBar({ showAccount, walletHandler, userAccount }) {
  return (
    <Container>
      <SectionNavi>
        <div>ETHER SWAP SCW </div>
        {showAccount ? (
          <div>
            <span>{userAccount}</span>
            <Identicon
              string={`${userAccount}+randomness+0-`}
              size="25"
              bg="#000000"
              fg="#FFAFB8"
            />
          </div>
        ) : (
          <button onClick={walletHandler}>CONNECT WALLET</button>
        )}
      </SectionNavi>
    </Container>
  );
}

export default NaviBar;
