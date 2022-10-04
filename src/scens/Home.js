import React, { useEffect, useState } from "react";
import Web3 from "web3";
import styled from "styled-components";

import TokenContractApi from "../contractApi/TokenApi";
import SwapContractApi from "../contractApi/EthSwapApi";

import SwapSection from "../components/SwapSection";
import NaviBar from "../components/NaviBar";

const Container = styled.div`
  width: 480px;
  margin: 0 auto;
  margin-top: 50px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;

  background-color: ${(props) => props.theme.colors.primary};
`;
const Button = styled.button`
  align-items: flex-end;
  border: 0px;
  margin-top: 10px;
  color: white;
  background-color: transparent;
  cursor: pointer;
  /* background-color: ${(props) => props.theme.colors.secondary}; */
`;
const Section = styled.div`
  margin-bottom: 10px;
`;

function Home(props) {
  const [message, setMessage] = useState("");
  const [showAccount, setShowAccount] = useState(false);

  const [web3, setWeb3] = useState(null);
  const [userAccount, setUserAccount] = useState();
  const [userEthBalance, setUserEthBalance] = useState();

  const [tokenApi, setTokenApi] = useState(null);
  const [swapApi, setSwapApi] = useState(null);

  const [wasAdded, setWasAdded] = useState(false);

  async function walletHandler() {
    try {
      if (typeof window.ethereum !== "undefined") {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        setShowAccount(true);
        await getUserAccountInfo();
        setMessage("");
        makeContractApi();
      } else {
        setMessage("Please install MetaMask");
      }
    } catch (err) {
      setMessage(err.message);
    }
  }
  async function getUserAccountInfo() {
    const accounts = await web3.eth.getAccounts();
    setUserAccount(accounts[0]);
    let balance = await web3.eth.getBalance(accounts[0]);
    balance = web3.utils.fromWei(balance, "ether");
    setUserEthBalance(balance);
  }
  async function WatchAsset() {
    // SWAP 할때 ...
    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      const wasAdded = await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20", // Initially only supports ERC20, but eventually more!
          options: {
            address: "0xe9568f4f42f44c6cfd68d3ff26e405cf6bcdfbf1", // The address that the token is at.
            symbol: "SCW", // A ticker symbol or shorthand, up to 5 chars.
            decimals: 18, // The number of decimals in the token
            image: "https://iili.io/L8t4cl.jpg", // A string url of the token logo
            //https://freeimage.host/i/beauty-07.L8t4cl
          },
        },
      });

      if (wasAdded) {
        setWasAdded(true);
        console.log("Thanks for your interest!");
      } else {
        console.log("Your loss!");
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function makeContractApi() {
    const tokenApi = await TokenContractApi(web3);
    setTokenApi(tokenApi);
    const swapApi = await SwapContractApi(web3);
    setSwapApi(swapApi);
    console.log("get APIS");
  }

  useEffect(() => {
    try {
      if (typeof window.ethereum !== "undefined") {
        setWeb3(new Web3(window.ethereum));
      }
    } catch (error) {
      setMessage(error.message);
    }
  }, []);

  return (
    <Container>
      <NaviBar
        walletHandler={walletHandler}
        showAccount={showAccount}
        userAccount={userAccount}
      ></NaviBar>
      {wasAdded ? null : (
        <>
          <Button onClick={WatchAsset}>
            SCW 토큰을 지갑에 등록하시겠습니까?
          </Button>
        </>
      )}
      <SwapSection
        web3={web3}
        userAccount={userAccount}
        userEthBalance={userEthBalance}
        tokenApi={tokenApi}
        swapApi={swapApi}
        walletHandler={walletHandler}
      ></SwapSection>
      <Section>{message}</Section>
    </Container>
  );
}

export default Home;
