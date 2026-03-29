import { describe, expect, it } from 'vitest';

import { createMinimalPublicProjection } from '../fixtures/public-projection.js';

describe('PublicProjection fixtures', () => {
  it('constructs a minimal public read model', () => {
    const projection = createMinimalPublicProjection();

    expect(projection.session.phase.current).toBe('setup');
    expect(projection.seats).toHaveLength(1);
    expect(projection.seats[0]?.displayName).toBe('Player One');
    expect(projection.workflow.phase.current).toBe('setup');
    expect(projection.selectedScript?.scriptName).toBe('Trouble Brewing');
  });

  it('allows a public selected script summary while omitting private fields', () => {
    const projection = createMinimalPublicProjection();

    expect(Object.hasOwn(projection, 'players')).toBe(false);
    expect(projection.selectedScript?.scriptId).toBe('tb');
    expect(Object.hasOwn(projection, 'sessionNote')).toBe(false);
    expect(Object.hasOwn(projection.seats[0] ?? {}, 'note')).toBe(false);
    expect(Object.hasOwn(projection.seats[0] ?? {}, 'role')).toBe(false);
    expect(Object.hasOwn(projection.seats[0] ?? {}, 'alignment')).toBe(false);
    expect(Object.hasOwn(projection.seats[0] ?? {}, 'reminders')).toBe(false);
  });
});
