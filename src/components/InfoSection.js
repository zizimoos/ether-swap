import React, { useEffect } from "react";
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
  web3,
  userTokenBalance,
  userEthBalance,
  swapTokenBalance,
  swapEtherBalance,
}) {
  useEffect(() => {}, [web3, swapEtherBalance]);
  return (
    <Container>
      <SectionInfo>
        <Section>
          SWAP CONTRACT Ethers : {swapEtherBalance / 1000000000000000000}
        </Section>
        <Section>SWAP CONTRACT Tokens : {swapTokenBalance}</Section>
      </SectionInfo>
    </Container>
  );
}

export default InfoSection;
