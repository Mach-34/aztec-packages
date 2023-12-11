import {
    KernelCircuitPublicInputs,
    KernelCircuitPublicInputsFinal,
    Proof,
} from '@aztec/circuits.js';

/**
 * Represents the output of the proof creation process for init and inner private kernel circuit.
 * Contains the public inputs required for the init and inner private kernel circuit and the generated proof.
 */
export interface ProofOutput {
    /**
     * The public inputs required for the proof generation process.
     */
    publicInputs: KernelCircuitPublicInputs;
    /**
     * The zk-SNARK proof for the kernel execution.
     */
    proof: Proof;
}

/**
 * Represents the output of the proof creation process for final ordering private kernel circuit.
 * Contains the public inputs required for the final ordering private kernel circuit and the generated proof.
 */
export interface ProofOutputFinal {
    /**
     * The public inputs required for the proof generation process.
     */
    publicInputs: KernelCircuitPublicInputsFinal;
    /**
     * The zk-SNARK proof for the kernel execution.
     */
    proof: Proof;
}