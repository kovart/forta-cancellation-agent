# Transaction Cancellation Agent

> Please add me as a Agent Developer [Published] on Discord, my username is kovart#3924

## Description

This agent monitors Ethereum network and detects possible cancellation transactions 
from externally-owned accounts. 

## Supported Chains

- Ethereum

## Alerts

- FORTA-TRANSACTION-CANCELLATION
  - Fired when an externally-owned account sends 0 ETH as a regular transaction
  - Severity is always set to "low"
  - Type is always set to "suspicious"
  - Metadata: 
    - "gasUsed": the total used gas by all transactions in this block
    - "gasPrice": price used for each paid gas

## Test Data

The agent behaviour can be verified with the following transactions (Göerli):

- 0xd8a971dc6b1ce7d7f6394a96585f5e74cf55d24b34e866d864d5c34ac9f416d0
- 0x980b718687c3c05cead4e368786a96c1524b6a5cef627714f99cbd66f473660f
