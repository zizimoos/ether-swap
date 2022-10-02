# Truffle

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
Ganache CLI v6.12.2 (ganache-core: 2.13.2)

Available Accounts
==================
(0) 0x538acd9ee0abCD46581Be3B8dD60038458a30b6D (100 ETH)
(1) 0xd38b1Fa362d0Ba1E7D7E9d0EceC19B282d0CAE31 (100 ETH)

Private Keys
==================
(0) 0x3d784528081c999dbc3d4ec904cc3ccbc09fb857a927ee5c08608eb4b44a9a3b
(1) 0xd04d1c4a18a1603a3db69c067fef09665ebf6ec358958b5f868e784a746dd9dc
```
