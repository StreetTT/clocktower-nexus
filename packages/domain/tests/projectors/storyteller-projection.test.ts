import { describe, expect, it } from 'vitest';

import { createMinimalStorytellerProjection } from '../fixtures/storyteller-projection.js';

describe('StorytellerProjection fixtures', () => {
  it('constructs a minimal private storyteller read model', () => {
    const projection = createMinimalStorytellerProjection();

    expect(projection.session.phase.current).toBe('setup');
    expect(projection.seats).toHaveLength(1);
    expect(projection.players).toHaveLength(1);
    expect(projection.selectedScript?.scriptName).toBe('Trouble Brewing');
  });

  it('keeps seat notes on seats and hidden artifacts on player views', () => {
    const projection = createMinimalStorytellerProjection();

    expect(projection.seats[0]?.note).toBeNull();
    expect(projection.players[0]?.role?.roleName).toBe('Washerwoman');
    expect(projection.players[0]?.reminders[0]?.text).toBe('Shown first night');
    expect(projection.players[0]?.note).toBeNull();
    expect(projection.sessionNote).toBeNull();
  });
});
