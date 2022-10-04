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
const BuyButton = styled.button`
  width: 400px;
  height: 40px;
  border-radius: 10px;
  border: none;
  color: white;
  background-color: hotpink;
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

function BuyForm({
  userTokenBalance,
  userEthBalance,
  swapApi,
  userAccount,
  web3,
  walletHandler,
  loadBlockchainData,
}) {
  const [inputValue, setInputValue] = useState(0);
  // const [nuUserEthBalance, setNuUserEthBalance] = useState("0");
  // eslint-disable-next-line
  const [Loading, setLoading] = useState(false);

  const buyTokens = async (etherAmount) => {
    await swapApi.methods
      .buyTokens()
      .send({
        value: etherAmount,
        from: userAccount,
      })
      .on("transactionHash", (hash) => {})
      .then(() => {
        setLoading(false);
        loadBlockchainData();
      });
  };

  useEffect(() => {
    // let uEthBalance = Number(userEthBalance);
    // setNuUserEthBalance(uEthBalance);
    // eslint-disable-next-line
  }, [userEthBalance, web3, userTokenBalance]);

  return (
    <>
      <LoadingSection>{Loading ? "LOADING..." : null}</LoadingSection>
      <Container>
        <WrapInfoBox>
          <InOutBox>
            <div>SEND ETHER</div>
            <div>
              {userEthBalance
                ? Math.floor(userEthBalance * 100000) / 100000
                : 0}{" "}
              ETH in your account
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
            <div>RECEIVE SCW</div>
            <div>
              {userTokenBalance / 1000000000000000000}
              SCW TOKENS in your account
            </div>
          </InOutBox>
          <input placeholder="0" value={inputValue * 100} readOnly></input>
        </WrapInfoBox>
        <RateInfoBox>
          <div>Exchange Rate</div>
          <div>1 ETH = 100 Tokens</div>
        </RateInfoBox>
        <ButtonBox>
          <BuyButton
            onClick={(e) => {
              let etherAmount;
              etherAmount = String(inputValue);
              etherAmount = web3.utils.toWei(etherAmount, "ether");
              buyTokens(etherAmount);
              setLoading(true);
            }}
          >
            CLICK ! BUY TOKENS
          </BuyButton>
        </ButtonBox>
      </Container>
    </>
  );
}

export default BuyForm;
