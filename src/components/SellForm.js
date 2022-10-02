import React, { useEffect, useState } from "react";
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
    background-color: dodgerblue;
  }
`;

function SellForm({
  web3,
  swapApi,
  tokenApi,
  userTokenBalance,
  userEthBalance,
  userAccount,
}) {
  const [inputValue, setInputValue] = useState();
  // eslint-disable-next-line
  const [Loading, setLoading] = useState(false);
  const sellTokens = (tokenAmount) => {
    setLoading(true);
    tokenApi.methods
      .approve("0x41b580aFF14203b5fB441AB0092923393E4bE6f8", tokenAmount)
      .send({ from: userAccount });
    swapApi.methods
      .sellTokens(tokenAmount)
      .send({ from: userAccount })
      .on("transactionHash", (hash) => setLoading(false));
  };
  useEffect(() => {}, [tokenApi]);

  return (
    <>
      <div>
        <WrapInfoBox>
          <InOutBox>
            <div>INPUT</div>
            <div>
              Balance : {userTokenBalance}
              TOKENS
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
            <div>OUTPUT</div>
            <div>
              Balance :{userEthBalance}
              ETH
            </div>
          </InOutBox>
          <input placeholder="0" value={inputValue / 100} readOnly></input>
        </WrapInfoBox>
        <RateInfoBox>
          <div>Exchange Rate</div>
          <div>100 Tokens = 1 ETH</div>
        </RateInfoBox>
        <ButtonBox>
          <button
            onClick={(e) => {
              console.log("purchaing...");
              let tokenAmount;
              tokenAmount = String(inputValue);
              tokenAmount = web3.utils.toWei(tokenAmount, "ether");
              console.log(tokenAmount);
              sellTokens(tokenAmount);
            }}
          >
            SWAP SELL TOKENS
          </button>
        </ButtonBox>
      </div>
    </>
  );
}

export default SellForm;
