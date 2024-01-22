import { BufferReader, serializeToBuffer } from '@aztec/foundation/serialize';

/**
 * The Proof class is a wrapper around the circuits proof.
 * Underlying it is a buffer of proof data in a form a barretenberg prover understands.
 * It provides methods to easily create, serialize, and deserialize the proof data for efficient
 * communication and storage.
 */
export class Proof {
  // Make sure this type is not confused with other buffer wrappers
  readonly __proofBrand: any;
  constructor(
    /**
     * Holds the serialized proof data in a binary buffer format.
     */
    public buffer: Buffer,
  ) {}

  /**
   * Create a Proof from a Buffer or BufferReader.
   * Expects a length-encoding.
   *
   * @param buffer - A Buffer or BufferReader containing the length-encoded proof data.
   * @returns A Proof instance containing the decoded proof data.
   */
  static fromBuffer(buffer: Buffer | BufferReader): Proof {
    const reader = BufferReader.asReader(buffer);
    const size = reader.readNumber();
    const buf = reader.readBytes(size);
    return new Proof(buf);
  }

  /**
   * Convert the Proof instance to a custom Buffer format.
   * This function serializes the Proof's buffer length and data sequentially into a new Buffer.
   *
   * @returns A Buffer containing the serialized proof data in custom format.
   */
  public toBuffer() {
    return serializeToBuffer(this.buffer.length, this.buffer);
  }

  /**
   * Deserializes `Proof` object from a hex string representation.
   * @param data - A hex string representation of the proof.
   * @returns A `Proof` object.
   */
  public static fromString(data: string): Proof {
    return Proof.fromBuffer(Buffer.from(data, 'hex'));
  }

  /**
   * Serializes and stringifies the Proof instance to a custom buffer format.
   * This function serializes the Proof's buffer length and data sequentially into a new Buffer, then into a string.
   *
   * @returns A hex string containing the serialized proof data in custom format.
   */
  public toString() {
    return this.toBuffer().toString('hex');
  }
}

/**
 * Makes an empty proof.
 * Note: Used for local devnet milestone where we are not proving anything yet.
 * @returns The empty "proof".
 */
export function makeEmptyProof() {
  return new Proof(Buffer.alloc(0));
}
