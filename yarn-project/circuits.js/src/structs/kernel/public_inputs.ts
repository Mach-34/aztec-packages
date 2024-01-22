import { BufferReader, serializeToBuffer } from '@aztec/foundation/serialize';

import { CombinedAccumulatedData } from './combined_accumulated_data.js';
import { CombinedConstantData } from './combined_constant_data.js';

/**
 * Public inputs of the public and private kernel circuits.
 */
export class KernelCircuitPublicInputs {
  constructor(
    /**
     * Data accumulated from both public and private circuits.
     */
    public end: CombinedAccumulatedData,
    /**
     * Data which is not modified by the circuits.
     */
    public constants: CombinedConstantData,
    /**
     * Indicates whether the input is for a private or public kernel.
     */
    public isPrivate: boolean,
  ) {}

  toBuffer() {
    return serializeToBuffer(this.end, this.constants, this.isPrivate);
  }

  /**
   * Deserializes from a buffer or reader, corresponding to a write in cpp.
   * @param buffer - Buffer or reader to read from.
   * @returns A new instance of KernelCircuitPublicInputs.
   */
  static fromBuffer(buffer: Buffer | BufferReader): KernelCircuitPublicInputs {
    const reader = BufferReader.asReader(buffer);
    return new KernelCircuitPublicInputs(
      reader.readObject(CombinedAccumulatedData),
      reader.readObject(CombinedConstantData),
      reader.readBoolean(),
    );
  }

  /**
   * Convert a KernelCircuitPublicInputs class object to a plain JSON object.
   * @returns A plain object with KernelCircuitPublicInputs properties, serialized into buffers.
   */
  public toJSON() {
    return {
      end: this.end.toBuffer(),
      constants: this.constants.toBuffer(),
      isPrivate: this.isPrivate,
    };
  }

  /**
   * Convert a plain JSON object to a KernelCircuitsPublicInputs class object.
   * @param obj - A plain KernelCircuitsPublicInputs JSON object with end and constants as serialized buffers
   * @returns A KernelCircuitsPublicInputs class object.
   */
  public static fromJSON(obj: any) {
    return new KernelCircuitPublicInputs(
      CombinedAccumulatedData.fromBuffer(obj.end),
      CombinedConstantData.fromBuffer(obj.constants),
      obj.isPrivate,
    );
  }

  static empty() {
    return new KernelCircuitPublicInputs(CombinedAccumulatedData.empty(), CombinedConstantData.empty(), true);
  }
}

/**
 * Public inputs of the public kernel circuit.
 */
export class PublicKernelPublicInputs extends KernelCircuitPublicInputs {
  constructor(end: CombinedAccumulatedData, constants: CombinedConstantData) {
    super(end, constants, false);
  }

  static empty(): PublicKernelPublicInputs {
    return new PublicKernelPublicInputs(CombinedAccumulatedData.empty(), CombinedConstantData.empty());
  }
}

/**
 * Public inputs of the private kernel circuit.
 */
export class PrivateKernelPublicInputs extends KernelCircuitPublicInputs {
  constructor(end: CombinedAccumulatedData, constants: CombinedConstantData) {
    super(end, constants, true);
  }

  static empty(): PrivateKernelPublicInputs {
    return new PrivateKernelPublicInputs(CombinedAccumulatedData.empty(), CombinedConstantData.empty());
  }
}
