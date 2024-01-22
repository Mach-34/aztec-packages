import { NoteAndSlot } from './execution_result.js';
import { AztecAddress, Fr } from '@aztec/circuits.js';
/**
 * Represents an output note data object.
 * Contains the contract address, new note data and commitment for the note,
 * resulting from the execution of a transaction in the Aztec network.
 */
export interface OutputNoteData {
    /**
     * The address of the contract the note was created in.
     */
    contractAddress: AztecAddress;
    /**
     * The encrypted note data for an output note.
     */
    data: NoteAndSlot;
    /**
     * The unique value representing the note.
     */
    commitment: Fr;
}
