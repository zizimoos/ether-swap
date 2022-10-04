import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const Container = styled.div`
  width: 400px;
  margin: 0 auto;
  margin-top: 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  color: ${(props) => props.theme.colors.secondary};
`;
const WrapInfoBox = styled.div`
  width: 400px;
  margin-bottom: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  input {
    width: 400px;
    height: 40px;
    padding-left: 10px;
    border-radius: 5px;
    border: 1px solid ${(props) => props.theme.colors.primary};
  }
`;
const InOutBox = styled.div`
  width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const RateInfoBox = styled.div`
  width: 400px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const ButtonBox = styled.div`
  width: 400px;
  margin: 0 auto;
  justify-content: flex-start;
  align-items: center;
`;
const SellButton = styled.button`
  width: 400px;
  height: 40px;
  border-radius: 10px;
  border: none;
  color: white;
  background-color: dodgerblue;
  cursor: pointer;
`;
const LoadingAnimation = keyframes`
  from {
    color: white;
  }

  to {
    color: blue;
  }
`;
const LoadingSection = styled.div`
  margin-bottom: 20px;
  animation: ${LoadingAnimation} 1s linear infinite;
`;

function SellForm({
  web3,
  swapApi,
  tokenApi,
  userTokenBalance,
  userEthBalance,
  userAccount,
  walletHandler,
  loadBlockchainData,
}) {
  const [inputValue, setInputValue] = useState(0);
  // eslint-disable-next-line
  const [Loading, setLoading] = useState(false);
  const sellTokens = async (tokenAmount) => {
    await tokenApi.methods
      .approve("0x41b580aFF14203b5fB441AB0092923393E4bE6f8", tokenAmount)
      .send({ from: userAccount });
    swapApi.methods
      .sellTokens(tokenAmount)
      .send({ from: userAccount })
      .on("transactionHash", (hash) => {})
      .then(() => {
        loadBlockchainData();
        setLoading(false);
      });
  };
  useEffect(() => {}, [tokenApi]);

  return (
    <>
      <LoadingSection>{Loading ? "LOADING..." : null}</LoadingSection>
      <Container>
        <WrapInfoBox>
          <InOutBox>
            <div>SEND SCW</div>
            <div>
              {userTokenBalance / 1000000000000000000} TOKENS in your account
            </div>
          </InOutBox>
          <input
            onChange={(e) => {
              setInputValue(e.currentTarget.value);
            }}
            placeholder="0"
          ></input>
        </WrapInfoBox>
        <WrapInfoBox>
          <InOutBox>
            <div>RECEIVE ETHER</div>
            <div>
              {userEthBalance
                ? Math.floor(userEthBalance * 100000) / 100000
                : 0}
              ETH in your account
            </div>
          </InOutBox>
          <input placeholder="0" value={inputValue / 100} readOnly></input>
        </WrapInfoBox>
        <RateInfoBox>
          <div>Exchange Rate</div>
          <div>100 Tokens = 1 ETH</div>
        </RateInfoBox>
        <ButtonBox>
          <SellButton
            onClick={(e) => {
              let tokenAmount;
              tokenAmount = String(inputValue);
              tokenAmount = web3.utils.toWei(tokenAmount, "ether");
              sellTokens(tokenAmount);
              setLoading(true);
            }}
          >
            CLICK ! SELL TOKENS
          </SellButton>
        </ButtonBox>
      </Container>
    </>
  );
}

export default SellForm;
