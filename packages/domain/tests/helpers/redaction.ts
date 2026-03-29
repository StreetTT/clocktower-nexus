import { expect } from 'vitest';

export function expectNoOwnKeys(
  value: object,
  forbiddenKeys: readonly string[],
): void {
  for (const forbiddenKey of forbiddenKeys) {
    expect(Object.hasOwn(value, forbiddenKey)).toBe(false);
  }
}
