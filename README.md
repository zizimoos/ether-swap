# Truffle

```zsh
Ganache CLI v6.12.2 (ganache-core: 2.13.2)
```

```zsh
> truffle migrate --reset
> truffle console

contract = await EthSwap.deployed()
contract.address
name = await contract.name()
token = await Token.deployed()
tokenname = await token.name()
balance = await token.balanceOf("0xD984e1db07E86a324e8459d84bB51552D9a95b4E")
//EthSwapcontract.address
'0xD984e1db07E86a324e8459d84bB51552D9a95b4E'
balance.toString()
```

```zsh
truffle migrate --network goerli --reset
```

```zsh
Starting migrations...
======================
> Network name:    'goerli'
> Network id:      5
> Block gas limit: 30000000 (0x1c9c380)


1_deploy_contract.js
====================

   Deploying 'Token'
   -----------------
   > transaction hash:    0xc3d16b7f13e39c1942531cb14291e0145d2bd360f80b76a8c37e880c4b7b8312
   > Blocks: 1            Seconds: 13
   > contract address:    0xe9568F4F42f44C6CFD68d3Ff26e405CF6BcDfBf1
   > block number:        7698216
   > block timestamp:     1664711844
   > account:             0xB2b92a995Ea5e9542a36f573F01EbABCBAcCAb62
   > balance:             61.428448132893709342
   > gas used:            864436 (0xd30b4)
   > gas price:           2.500000009 gwei
   > value sent:          0 ETH
   > total cost:          0.002161090007779924 ETH

   Pausing for 2 confirmations...

   -------------------------------
   > confirmation number: 1 (block: 7698217)
   > confirmation number: 2 (block: 7698218)

   Deploying 'EthSwap'
   -------------------
   > transaction hash:    0x00cca992d67f9c51507b30250b5419bb1767d39fcb6b83ac8efb424faad7abcb
   > Blocks: 2            Seconds: 21
   > contract address:    0x41b580aFF14203b5fB441AB0092923393E4bE6f8
   > block number:        7698220
   > block timestamp:     1664711892
   > account:             0xB2b92a995Ea5e9542a36f573F01EbABCBAcCAb62
   > balance:             61.426659455386554632
   > gas used:            715471 (0xaeacf)
   > gas price:           2.50000001 gwei
   > value sent:          0 ETH
   > total cost:          0.00178867750715471 ETH

   Pausing for 2 confirmations...

   -------------------------------
   > confirmation number: 1 (block: 7698221)
   > confirmation number: 2 (block: 7698222)
   > Saving artifacts
   -------------------------------------
   > Total cost:     0.003949767514934634 ETH

Summary
=======
> Total deployments:   2
> Final cost:          0.003949767514934634 ETH
```
