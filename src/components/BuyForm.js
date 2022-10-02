import React, { useState } from "react";
import styled from "styled-components";

const WrapInfoBox = styled.div`
  width: 600px;
  margin-bottom: 40px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  input {
    width: 500px;
    height: 40px;
    padding-left: 10px;
  }
`;

const InOutBox = styled.div`
  width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const RateInfoBox = styled.div`
  width: 500px;
  margin: 0 auto;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ButtonBox = styled.div`
  width: 500px;
  margin: 0 auto;
  justify-content: flex-start;
  align-items: center;
  button {
    width: 500px;
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
}) {
  const [inputValue, setInputValue] = useState();
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
  };

  return (
    <>
      <div>
        <WrapInfoBox>
          <InOutBox>
            <div>INPUT</div>
            <div>Balance :{userEthBalance} ETH</div>
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
            <div>OUTPUT</div>
            <div>
              Balance : {userTokenBalance}
              TOKENS
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
            SWAP BUY TOKENS
          </button>
        </ButtonBox>
      </div>
    </>
  );
}

export default BuyForm;
