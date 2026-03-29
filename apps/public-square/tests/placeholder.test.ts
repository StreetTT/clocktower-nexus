import { describe, expect, it } from 'vitest';

import {
  publicSquareActiveWorkflowProjectionUpdate,
  publicSquareProjectionUpdateResult,
  publicSquareProjectionUpdateSchema,
} from '../src/placeholder.js';

describe('public square placeholder projection schema', () => {
  it('parses the active workflow projection update sample', () => {
    expect(publicSquareProjectionUpdateResult.success).toBe(true);

    expect(
      publicSquareProjectionUpdateSchema.parse(
        publicSquareActiveWorkflowProjectionUpdate,
      ),
    ).toEqual(publicSquareActiveWorkflowProjectionUpdate);
  });
});
