import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 600px;
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
const WrapInfoBox = styled.div`
  width: 600px;
  margin-bottom: 40px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  input {
    width: 600px;
    height: 40px;
    padding-left: 10px;
  }
`;
const InOutBox = styled.div`
  width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const RateInfoBox = styled.div`
  width: 600px;
  margin: 0 auto;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const ButtonBox = styled.div`
  width: 600px;
  margin: 0 auto;
  justify-content: flex-start;
  align-items: center;
  button {
    width: 600px;
    height: 40px;
    border-radius: 10px;
    border: none;
    color: white;
    background-color: hotpink;
  }
`;

function BuyForm({
  userTokenBalance,
  userEthBalance,
  swapApi,
  userAccount,
  web3,
  walletHandler,
}) {
  const [inputValue, setInputValue] = useState(0);
  const [nuUserEthBalance, setNuUserEthBalance] = useState("0");
  // eslint-disable-next-line
  const [Loading, setLoading] = useState(false);

  const buyTokens = (etherAmount) => {
    setLoading(true);
    swapApi.methods
      .buyTokens()
      .send({
        value: etherAmount,
        from: userAccount,
      })
      .on("transactionHash", (hash) => setLoading(false));
    walletHandler();
  };

  useEffect(() => {
    let uEthBalance = Number(userEthBalance);
    setNuUserEthBalance(uEthBalance);
  }, [userEthBalance, web3]);

  return (
    <>
      <Container>
        <WrapInfoBox>
          <InOutBox>
            <div>SEND ETHER</div>
            <div>
              {Math.floor(nuUserEthBalance * 100000) / 100000} ETH in your
              account
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
          <button
            onClick={(e) => {
              console.log("purchaing...");
              let etherAmount;
              etherAmount = String(inputValue);
              etherAmount = web3.utils.toWei(etherAmount, "ether");
              console.log(etherAmount);
              buyTokens(etherAmount);
            }}
          >
            CLICK ! BUY TOKENS
          </button>
        </ButtonBox>
      </Container>
    </>
  );
}

export default BuyForm;
