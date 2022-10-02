import React from "react";
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
const SectionInfo = styled.div`
  width: 600px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  font-size: 14px;
`;
const Section = styled.div`
  margin-bottom: 10px;
`;

function InfoSection({
  userTokenBalance,
  userEthBalance,
  swapTokenBalance,
  swapEtherBalance,
}) {
  return (
    <Container>
      <SectionInfo>
        <Section>SWAP CONTRACT Ethers : {swapEtherBalance}</Section>
        <Section>
          SWAP CONTRACT Tokens : {swapTokenBalance}
          {/* SWAP CONTRACT Tokens : {web3.utils.fromWei(swapTokenBalance, "ether")} */}
        </Section>
        <Section>USER Ether : {userEthBalance}</Section>
        <Section>USER SWC Tokens : {userTokenBalance}</Section>
      </SectionInfo>
    </Container>
  );
}

export default InfoSection;
