import { ExecutionResult } from "./execution_result.js";
import { VerificationKey, Proof, KernelCircuitPublicInputs, AztecAddress, Fr } from "@aztec/circuits.js"
import { ProofOutput } from "./proof_output.js"
import { OutputNoteData } from "./output_note_data.js";
import { Note } from "../index.js";
/**
 * Interstitial data for each kernel proof
 */
export class KernelProofData {
    constructor(
        /**
         * The actual proof of execution for the Kernel Circuit, including public inputs
         */
        public readonly proof: ProofOutput,
        /**
         * The verification key for the function circuit proof verified inside the kernel circuit
         */
        public readonly verificationKey: VerificationKey,
        /**
         * The result of executing the kernel circuit, including the nested executions
         */
        public readonly executionStack: ExecutionResult[],
        /**
         * Notes created by the execution of the kernel circuit
         */
        public readonly newNotes: { [commitmentStr: string]: OutputNoteData },
    ) {}

    /**
     * Converts the KernelProofData instance to a JSON object
     */
    public toJSON() {
        // convert proof
        const proof = {
            proof: this.proof.toString(),
            publicInputs: this.proof.publicInputs.toJSON()
        };
        // convert vkey
        const verificationKey = this.verificationKey.toString();
        // convert execution result
        // const executionStack = this.executionStack
        //     .map(er => (er as ExecutionResultSerializer).toJSON());
        const executionStack: ExecutionResult[] = [];
        // convert output note data
        const outputNoteData: any = {};
        for (const key in this.newNotes) {
            outputNoteData[key] = outputNoteDataToJson(this.newNotes[key])
        }
        // const outputNoteData = instance.outputNoteData
        return {
            proof,
            verificationKey,
            executionStack,
            outputNoteData
        }
    }

    /**
     * Converts serialized json object to KernelProofData instance
     * @param obj - JSON object to convert to KernelProofData
     * @returns KernelProofData instance
     */
    public static fromJSON(obj: any): KernelProofData {
        // convert proof
        const proof = {
            proof: Proof.fromString(obj.proof.proof),
            publicInputs: KernelCircuitPublicInputs.fromJSON(obj.proof.publicInputs)
        };
        // convert vkey
        const verificationKey = VerificationKey.fromString(obj.verificationKey);
        // convert execution result
        // const executionStack = obj.executionStack
        //     .map((er: any) => ExecutionResultSerializer.fromJSON(er));
        const executionStack: ExecutionResult[] = [];
        // convert output note data
        const newNotes: { [commitmentStr: string]: OutputNoteData } = {};
        for (const key in obj.newNotes) {
            newNotes[key] = outputNoteDataFromJson(obj.newNotes[key])
        }

        return new KernelProofData(
            proof,
            verificationKey,
            executionStack,
            newNotes
        );
    }
}

/**
 * Converts output note data to stringified JSON
 * @param data - output note data to convert
 */
function outputNoteDataToJson(data: OutputNoteData) {
    return {
        contractAddress: data.contractAddress.toString(),
        data: {
            note: data.data.note.toString(),
            storageSlot: data.data.storageSlot.toString(),
        },
        commitment: data.commitment.toString()
    }
}

/**
 * Converts stringified JSON to output note data
 * @param data - stringified JSON to convert
 */
function outputNoteDataFromJson(data: any): OutputNoteData {
    return {
        contractAddress: AztecAddress.fromString(data.contractAddress),
        data: {
            note: Note.fromString(data.data.note),
            storageSlot: Fr.fromString(data.data.storageSlot),
        },
        commitment: Fr.fromString(data.commitment)
    }
}