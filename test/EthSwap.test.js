const Token = artifacts.require("Token");
const EthSwap = artifacts.require("EthSwap");

function tokensToWei(n) {
  return web3.utils.toWei(n, "ether");
}

contract("EthSwap", ([deployer, user]) => {
  let token;
  let ethSwap;
  before(async () => {
    token = await Token.new();
    ethSwap = await EthSwap.new(token.address);
    await token.transfer(ethSwap.address, tokensToWei("1000000"));
  });
  describe("Token deployment", async () => {
    it("token has a name", async () => {
      const name = await token.name();
      assert.equal(name, "SCW Token");
    });
  });
  describe("EthSwap deployment", async () => {
    it("contract has a name", async () => {
      const name = await ethSwap.name();
      assert.equal(name, "EthSwap Instant Exchange");
    });
    it("contract has tokens", async () => {
      const balance = await token.balanceOf(ethSwap.address);
      assert.equal(balance, tokensToWei("1000000"));
    });
  });
  describe("Buy tokens", async () => {
    let result;
    let ethSwapBalance;
    before(async () => {
      result = await ethSwap.buyTokens({
        from: user,
        value: web3.utils.toWei("1", "ether"),
      });
    });
    it("Check user token balance after purchase", async () => {
      let userBalance = await token.balanceOf(user);
      assert.equal(userBalance.toString(), tokensToWei("100"));
    });
    it("Check ethSwap token balance after purchase", async () => {
      ethSwapBalance = await token.balanceOf(ethSwap.address);
      assert.equal(ethSwapBalance.toString(), tokensToWei("999900"));
    });
    it("Check ethSwap Ether balance after purchase", async () => {
      ethSwapBalance = await web3.eth.getBalance(ethSwap.address);
      assert.equal(ethSwapBalance.toString(), web3.utils.toWei("1", "Ether"));
    });
    it("Check result.logs", async () => {
      // console.log(result.logs);
      const event = result.logs[0].args;
      assert.equal(event.account, user);
      assert.equal(event.token, token.address);
      assert.equal(event.rate.toString(), "100");
      assert.equal(event.amount.toString(), tokensToWei("100").toString());
    });
  });
  describe("Sell tokens", async () => {
    let result;
    let ethSwapBalance;
    before(async () => {
      await token.approve(ethSwap.address, tokensToWei("100"), {
        from: user,
      });
      result = await ethSwap.sellTokens(tokensToWei("100"), {
        from: user,
      });
    });
    it("Check user token balance after sell", async () => {
      let userBalance = await token.balanceOf(user);
      assert.equal(userBalance.toString(), tokensToWei("0").toString());
    });
    it("Check ethSwap token balance after sell", async () => {
      ethSwapBalance = await token.balanceOf(ethSwap.address);
      assert.equal(ethSwapBalance.toString(), tokensToWei("1000000"));
    });
    it("Check ethSwap Ether balance after sell", async () => {
      ethSwapBalance = await web3.eth.getBalance(ethSwap.address);
      assert.equal(ethSwapBalance.toString(), web3.utils.toWei("0", "Ether"));
    });

    it("Check result.logs", async () => {
      //   console.log(result.logs);
      const event = result.logs[0].args;
      assert.equal(event.account, user);
      assert.equal(event.token, token.address);
      assert.equal(event.rate.toString(), "100");
      assert.equal(event.amount.toString(), tokensToWei("100").toString());
    });
    it("Check users try to sell more tokens that they have", async () => {
      //   await ethSwap.sellTokens(tokensToWei("500"), { from: user });
      try {
        await ethSwap.sellTokens(tokensToWei("500"), { from: user });
      } catch (error) {
        assert(
          error.message,
          "Returned error: VM Exception while processing transaction: revert"
        );
      }
    });
  });
});
