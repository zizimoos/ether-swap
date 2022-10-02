import React, { useEffect, useState } from "react";
import styled from "styled-components";

import InfoSection from "./InfoSection";
import BuyForm from "./BuyForm";
import SellForm from "./SellForm";

const Container = styled.div`
  width: 600px;
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const BuySellBox = styled.div`
  width: 600px;
  margin: 0 auto;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const ExchangeButton = styled.button`
  width: 200px;
  height: 30px;
  border-radius: 5px;
  border: none;
  font-size: 16px;
  color: white;
  background-color: ${(props) => props.backgroundColor};
  cursor: pointer;
`;

const Section = styled.div`
  margin-bottom: 10px;
`;

function SwapSection({
  web3,
  userAccount,
  userEthBalance,
  tokenApi,
  swapApi,
  walletHandler,
}) {
  const [message, setMessage] = useState("");
  const [userTokenBalance, setUserTokenBalance] = useState(null);
  const [swapTokenBalance, setSwapTokenBalance] = useState(null);
  const [swapEtherBalance, setSwapEtherBalance] = useState(null);
  const [sellForm, setSellForm] = useState(false);

  async function loadBlockchainData() {
    // Load Token
    if (tokenApi) {
      let tokenBalance = await tokenApi.methods.balanceOf(userAccount).call();
      console.log("usertokenBalance", tokenBalance.toString());
      setUserTokenBalance(tokenBalance);
    } else {
      setMessage("");
    }
    if (swapApi) {
      let tokenBalance = await tokenApi.methods
        .balanceOf("0x41b580aFF14203b5fB441AB0092923393E4bE6f8")
        .call();
      tokenBalance = web3.utils.fromWei(tokenBalance, "ether");
      setSwapTokenBalance(tokenBalance);
      let etherBalance = await web3.eth.getBalance(
        "0x41b580aFF14203b5fB441AB0092923393E4bE6f8"
      );
      setSwapEtherBalance(etherBalance);
    } else {
      setMessage("");
    }
  }

  useEffect(() => {
    loadBlockchainData();
    console.log(web3);
    // eslint-disable-next-line
  }, [tokenApi, web3]);

  return (
    <Container>
      <InfoSection
        userTokenBalance={userTokenBalance}
        userEthBalance={userEthBalance}
        swapTokenBalance={swapTokenBalance}
        swapEtherBalance={swapEtherBalance}
      ></InfoSection>
      <Section>
        <BuySellBox>
          <ExchangeButton
            onClick={() => setSellForm(false)}
            backgroundColor={"hotpink"}
          >
            Buy
          </ExchangeButton>
          <ExchangeButton
            onClick={() => setSellForm(true)}
            backgroundColor={"dodgerblue"}
          >
            Sell
          </ExchangeButton>
        </BuySellBox>
      </Section>
      {sellForm === true ? (
        <SellForm
          web3={web3}
          swapApi={swapApi}
          tokenApi={tokenApi}
          userAccount={userAccount}
          userTokenBalance={userTokenBalance}
          userEthBalance={userEthBalance}
        ></SellForm>
      ) : (
        <BuyForm
          web3={web3}
          swapApi={swapApi}
          userAccount={userAccount}
          userTokenBalance={userTokenBalance}
          userEthBalance={userEthBalance}
        ></BuyForm>
      )}
      <Section>{message}</Section>
    </Container>
  );
}

export default SwapSection;
