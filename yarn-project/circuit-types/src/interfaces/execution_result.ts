import { PrivateCallStackItem, PublicCallRequest, ReadRequestMembershipWitness } from '@aztec/circuits.js';
import { DecodedReturn } from '@aztec/foundation/abi';
import { Fr } from '@aztec/foundation/fields';
import { FunctionL2Logs, Note } from '@aztec/circuit-types';

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
    nestedExecutions: ExecutionResult[];
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

/**
 * Serializes or deserializes an execution result
 */
export class ExecutionResultSerializer implements ExecutionResult {
    constructor(
        /** The ACIR bytecode. */
        public readonly acir: Buffer,
        /** The verification key. */
        public readonly vk: Buffer,
        /** The partial witness. */
        public readonly partialWitness: Map<number, ACVMField>,
        /** The call stack item. */
        public readonly callStackItem: PrivateCallStackItem,
        /** The partially filled-in read request membership witnesses for commitments being read. */
        public readonly readRequestPartialWitnesses: ReadRequestMembershipWitness[],
        /** The notes created in the executed function. */
        public readonly newNotes: NoteAndSlot[],
        /** The decoded return values of the executed function. */
        public readonly returnValues: DecodedReturn,
        /** The nested executions. */
        public readonly nestedExecutions: ExecutionResult[],
        /** Enqueued public function execution requests to be picked up by the sequencer. */
        public readonly enqueuedPublicFunctionCalls: PublicCallRequest[],
        /** Encrypted logs emitted during execution of this function call. */
        public readonly encryptedLogs: FunctionL2Logs,
        /** Unencrypted logs emitted during execution of this function call. */
        public readonly unencryptedLogs: FunctionL2Logs,
    ) { };

    /**
     * Converts the ExecutionResult instance to a JSON object
     */
    public toJSON(): any {
        return {
            acir: this.acir.toString('hex'),
            vk: this.vk.toString('hex'),
            partialWitness: JSON.stringify(this.partialWitness),
            callStackItem: this.callStackItem.toBuffer().toString('hex'),
            readRequestPartialWitnesses: this.readRequestPartialWitnesses
                .map(rr => rr.toBuffer().toString('hex')),
            newNotes: this.newNotes.map(nn => {
                return {
                    note: nn.note.toString(),
                    storageSlot: nn.storageSlot.toString(),
                }
            }),
            returnValues: JSON.stringify(this.returnValues),
            nestedExecutions: this.nestedExecutions
                .map(ne => (ne as ExecutionResultSerializer).toJSON()),
            enqueuedPublicFunctionCalls: this.enqueuedPublicFunctionCalls
                .map(ec => ec.toBuffer().toString('hex')),
            encryptedLogs: this.encryptedLogs.toBuffer().toString('hex'),
            unencryptedLogs: this.unencryptedLogs.toBuffer().toString('hex'),
        }
    }

    public static fromJSON(obj: any): ExecutionResultSerializer {
        return {
            acir: Buffer.from(obj.acir, 'hex'),
            vk: Buffer.from(obj.vk, 'hex'),
            partialWitness: new Map(JSON.parse(obj.partialWitness)),
            callStackItem: PrivateCallStackItem.fromBuffer(Buffer.from(obj.callStackItem, 'hex')),
            readRequestPartialWitnesses: obj.readRequestPartialWitnesses
                .map((rr: string) => ReadRequestMembershipWitness.fromBuffer(Buffer.from(rr, 'hex'))),
            newNotes: obj.newNotes.map((nn: any) => {
                return {
                    note: Note.fromString(nn.note),
                    storageSlot: Fr.fromString(nn.storageSlot),
                }
            }),
            returnValues: JSON.parse(obj.returnValues),
            nestedExecutions: obj.nestedExecutions
                .map((ne: any) => ExecutionResultSerializer.fromJSON(ne)),
            enqueuedPublicFunctionCalls: obj.enqueuedPublicFunctionCalls
                .map((ec: string) => PublicCallRequest.fromBuffer(Buffer.from(ec, 'hex'))),
            encryptedLogs: FunctionL2Logs.fromBuffer(Buffer.from(obj.encryptedLogs, 'hex')),
            unencryptedLogs: FunctionL2Logs.fromBuffer(Buffer.from(obj.unencryptedLogs, 'hex')),
        } as ExecutionResultSerializer;
    }
}