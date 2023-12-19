import {
  AztecAddress,
  CompleteAddress,
  EthAddress,
  Fr,
  FunctionSelector,
  GrumpkinScalar,
  Point,
  KernelCircuitPublicInputs,
  Proof,
  VerificationKey,
} from '@aztec/circuits.js';
import { createJsonRpcClient, makeFetch } from '@aztec/foundation/json-rpc/client';
import {
  AuthWitness,
  ContractData,
  ExtendedContractData,
  ExtendedNote,
  ExtendedUnencryptedL2Log,
  L2Block,
  L2BlockL2Logs,
  L2Tx,
  LogId,
  Note,
  PXE,
  Tx,
  TxExecutionRequest,
  TxHash,
  TxReceipt,
  KernelProofData
} from '@aztec/types';

// import { ExecutionResult } from '@aztec/acir-simulator';

export { makeFetch } from '@aztec/foundation/json-rpc/client';

/**
 * Creates a JSON-RPC client to remotely talk to PXE.
 * @param url - The URL of the PXE.
 * @param fetch - The fetch implementation to use.
 * @returns A JSON-RPC client of PXE.
 */
export const createPXEClient = (url: string, fetch = makeFetch([1, 2, 3], true)): PXE =>
  createJsonRpcClient<PXE>(
    url,
    {
      CompleteAddress,
      FunctionSelector,
      AztecAddress,
      TxExecutionRequest,
      ContractData,
      ExtendedContractData,
      ExtendedUnencryptedL2Log,
      TxHash,
      EthAddress,
      Point,
      Fr,
      GrumpkinScalar,
      Note,
      ExtendedNote,
      AuthWitness,
      L2Tx,
      LogId,
      L2Block,
      Proof,
      VerificationKey,
    },
    {
      Tx,
      TxReceipt,
      L2BlockL2Logs,
      KernelCircuitPublicInputs,
      KernelProofData
    },
    false,
    fetch,
  );
