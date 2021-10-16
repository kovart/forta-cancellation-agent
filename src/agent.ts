import {
  Finding,
  FindingSeverity,
  FindingType,
  HandleTransaction,
  TransactionEvent,
  getJsonRpcUrl
} from 'forta-agent';
import Web3 from 'web3';

const web3 = new Web3(getJsonRpcUrl());

const isTargetAddress = (address: string) => true;

const isRegularTransaction = async (txEvent: TransactionEvent) => {
  const isFromContractAddress =
    (await web3.eth.getCode(txEvent.transaction.from)) !== '0x';
  return txEvent.transaction.gas === '21000' && !isFromContractAddress;
};

const handleTransaction: HandleTransaction = async (
  txEvent: TransactionEvent
) => {
  const findings: Finding[] = [];
  const { transaction } = txEvent;

  if (
    transaction.value === '0' &&
    isTargetAddress(transaction.from) &&
    (await isRegularTransaction(txEvent))
  ) {
    findings.push(
      Finding.fromObject({
        name: 'Possible Transaction Cancellation',
        description: `0 ETH was sent from ${transaction.from} to ${transaction.to} as a regular transaction`,
        alertId: 'FORTA-TRANSACTION-CANCELLATION',
        severity: FindingSeverity.Low,
        type: FindingType.Suspicious,
        metadata: {
          gasUsed: txEvent.receipt.gasUsed,
          gasPrice: transaction.gasPrice
        }
      })
    );
  }

  return findings;
};

export default {
  handleTransaction
};
