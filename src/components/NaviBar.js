import React from "react";
import Identicon from "react-identicons";
import styled from "styled-components";

const Container = styled.div`
  width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  color: ${(props) => props.theme.colors.secondary};
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
const WalletButton = styled.button`
  width: 150px;
  height: 25px;
  border: none;
  border-radius: 20px;
  color: #baad98;
  background-color: #48617c;
`;
const Title = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: 400;
`;
function NaviBar({ showAccount, walletHandler, userAccount }) {
  return (
    <Container>
      <Title> SWAP SCW </Title>
      <SectionNavi>
        <img
          src="https://img.icons8.com/bubbles/50/000000/earth-planet.png"
          alt="logo"
        ></img>

        {showAccount ? (
          <div>
            <span style={{ marginRight: "10px" }}>{String(userAccount)}</span>
            <Identicon
              string={`${userAccount}+randomness+0-`}
              size="25"
              bg="#000000"
              fg="#FFAFB8"
            />
          </div>
        ) : (
          <WalletButton onClick={walletHandler}>CONNECT WALLET</WalletButton>
        )}
      </SectionNavi>
    </Container>
  );
}

export default NaviBar;
