import { describe, expect, it } from 'vitest';

import {
  createPublicProjectionFromScenario,
  createStorytellerProjectionFromScenario,
  createVisibilityRegressionProjectionScenario,
} from '../fixtures/projection-scenarios.js';
import { expectNoOwnKeys } from '../helpers/redaction.js';

describe('Projection redaction regressions', () => {
  it('keeps public-safe fields aligned across private and public views of the same scenario', () => {
    const scenario = createVisibilityRegressionProjectionScenario();
    const storytellerProjection =
      createStorytellerProjectionFromScenario(scenario);
    const publicProjection = createPublicProjectionFromScenario(scenario);

    expect(publicProjection.session).toEqual(storytellerProjection.session);
    expect(publicProjection.selectedScript).toEqual(
      storytellerProjection.selectedScript,
    );
    expect(publicProjection.publicStatus).toEqual(
      storytellerProjection.workflow.publicStatus,
    );

    expect(publicProjection.seats).toHaveLength(
      storytellerProjection.seats.length,
    );

    expect(publicProjection.seats[0]).toMatchObject({
      seatId: storytellerProjection.seats[0]?.seatId,
      position: storytellerProjection.seats[0]?.position,
      displayName: storytellerProjection.players[0]?.displayName,
      isAlive: storytellerProjection.players[0]?.isAlive,
      ghostVoteAvailable: storytellerProjection.players[0]?.ghostVoteAvailable,
    });

    expect(publicProjection.seats[1]).toMatchObject({
      seatId: storytellerProjection.seats[1]?.seatId,
      position: storytellerProjection.seats[1]?.position,
      displayName: storytellerProjection.players[1]?.displayName,
      isAlive: storytellerProjection.players[1]?.isAlive,
      ghostVoteAvailable: storytellerProjection.players[1]?.ghostVoteAvailable,
    });

    expect(publicProjection.workflow.activeNomination).toEqual({
      nominatorSeatId: storytellerProjection.seats[0]?.seatId,
      nomineeSeatId: storytellerProjection.seats[1]?.seatId,
      isOpen: true,
    });
    expect(publicProjection.workflow.activeVote).toEqual({
      nomineeSeatId: storytellerProjection.seats[1]?.seatId,
      participatingSeatIds: [storytellerProjection.seats[0]?.seatId],
      isOpen: true,
    });
    expect(publicProjection.workflow.timer).toEqual({
      isRunning: true,
      remainingSeconds: 42,
    });
  });

  it('fails visibility regressions when storyteller-only fields leak into the public shape', () => {
    const publicProjection = createPublicProjectionFromScenario(
      createVisibilityRegressionProjectionScenario(),
    );

    expectNoOwnKeys(publicProjection, ['players', 'sessionNote']);

    for (const seat of publicProjection.seats) {
      expectNoOwnKeys(seat, ['occupantPlayerId', 'note']);
    }

    expect(publicProjection.workflow.activeNomination).not.toBeNull();
    expectNoOwnKeys(publicProjection.workflow.activeNomination ?? {}, [
      'nominatorPlayerId',
      'nomineePlayerId',
    ]);

    expect(publicProjection.workflow.activeVote).not.toBeNull();
    expectNoOwnKeys(publicProjection.workflow.activeVote ?? {}, [
      'nomineePlayerId',
      'participatingPlayerIds',
    ]);

    expect(publicProjection.workflow.timer).not.toBeNull();
    expectNoOwnKeys(publicProjection.workflow.timer ?? {}, ['visibleToPublic']);
  });
});
