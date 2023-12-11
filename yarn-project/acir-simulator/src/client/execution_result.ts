import {  PublicCallRequest } from '@aztec/circuits.js';
import { FunctionL2Logs, ExecutionResult, NoteAndSlot } from '@aztec/types';

/**
 * Collect all encrypted logs across all nested executions.
 * @param execResult - The topmost execution result.
 * @returns All encrypted logs.
 */
export function collectEncryptedLogs(execResult: ExecutionResult): FunctionL2Logs[] {
  // without the .reverse(), the logs will be in a queue like fashion which is wrong as the kernel processes it like a stack.
  return [execResult.encryptedLogs, ...[...execResult.nestedExecutions].reverse().flatMap(collectEncryptedLogs)];
}

/**
 * Collect all unencrypted logs across all nested executions.
 * @param execResult - The topmost execution result.
 * @returns All unencrypted logs.
 */
export function collectUnencryptedLogs(execResult: ExecutionResult): FunctionL2Logs[] {
  // without the .reverse(), the logs will be in a queue like fashion which is wrong as the kernel processes it like a stack.
  return [execResult.unencryptedLogs, ...[...execResult.nestedExecutions].reverse().flatMap(collectUnencryptedLogs)];
}

/**
 * Collect all enqueued public function calls across all nested executions.
 * @param execResult - The topmost execution result.
 * @returns All enqueued public function calls.
 */
export function collectEnqueuedPublicFunctionCalls(execResult: ExecutionResult): PublicCallRequest[] {
  // without the reverse sort, the logs will be in a queue like fashion which is wrong
  // as the kernel processes it like a stack, popping items off and pushing them to output
  return [
    ...execResult.enqueuedPublicFunctionCalls,
    ...[...execResult.nestedExecutions].flatMap(collectEnqueuedPublicFunctionCalls),
  ].sort((a, b) => b.sideEffectCounter! - a.sideEffectCounter!); // REVERSE SORT!
}

// @TODO if reasonable - replace imports across codebase with @aztec/types instead of re-exporting here
export { ExecutionResult, NoteAndSlot }