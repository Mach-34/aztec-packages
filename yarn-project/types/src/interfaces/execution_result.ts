import { PrivateCallStackItem, PublicCallRequest, ReadRequestMembershipWitness } from '@aztec/circuits.js';
import { DecodedReturn } from '@aztec/foundation/abi';
import { Fr } from '@aztec/foundation/fields';
import { FunctionL2Logs, Note } from '@aztec/types';

/**
 * ACVMField
 */
type ACVMField = string;

/**
 * The contents of a new note.
 */
export interface NoteAndSlot {
    /** The note. */
    note: Note;
    /** The storage slot of the note. */
    storageSlot: Fr;
}

/**
 * The result of executing a private function.
 */
export interface ExecutionResult {
    // Needed for prover
    /** The ACIR bytecode. */
    acir: Buffer;
    /** The verification key. */
    vk: Buffer;
    /** The partial witness. */
    partialWitness: Map<number, ACVMField>;
    // Needed for the verifier (kernel)
    /** The call stack item. */
    callStackItem: PrivateCallStackItem;
    /** The partially filled-in read request membership witnesses for commitments being read. */
    readRequestPartialWitnesses: ReadRequestMembershipWitness[];
    // Needed when we enable chained txs. The new notes can be cached and used in a later transaction.
    /** The notes created in the executed function. */
    newNotes: NoteAndSlot[];
    /** The decoded return values of the executed function. */
    returnValues: DecodedReturn;
    /** The nested executions. */
    nestedExecutions: this[];
    /** Enqueued public function execution requests to be picked up by the sequencer. */
    enqueuedPublicFunctionCalls: PublicCallRequest[];
    /**
     * Encrypted logs emitted during execution of this function call.
     * Note: These are preimages to `encryptedLogsHash`.
     */
    encryptedLogs: FunctionL2Logs;
    /**
     * Unencrypted logs emitted during execution of this function call.
     * Note: These are preimages to `unencryptedLogsHash`.
     */
    unencryptedLogs: FunctionL2Logs;
}