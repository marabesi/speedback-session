import { Member, SpeedbackSession } from './Speedback'

describe('Speedback room', () => {
  it('empty team should return empty array', () => {
    const team: Member[] = []

    const speedback = new SpeedbackSession(team).generateRounds();

    expect(speedback).toEqual([]);
  });

  it('team of one should make one alone', () => {
    const team: Member[] = [
      {id: '1', name: 'Ana'},
    ]

    const alone: Member = {
      id: '-',
      name: 'Alone'
    };
    const speedback = new SpeedbackSession(team).generateRounds();

    expect(speedback[0].pairs).toIncludeAllMembers([[ team[0], alone ] ]);
  });

  it('team of three should make make use of "Alone"', () => {
    const team: Member[] = [
      {id: '1', name: 'Ana'},
      {id: '2', name: 'John'},
      {id: '3', name: 'Maria'},
    ]

    const speedback = new SpeedbackSession(team).generateRounds();

    const alone: Member = {
      id: '-',
      name: 'Alone'
    };

    expect(speedback[0].pairs).toIncludeAllMembers([
      [team[0], team[1]],
      [team[2], alone],
    ]);

    expect(speedback[1].pairs).toIncludeAllMembers([
      [team[0], team[2]],
      [team[1], alone],
    ]);

    expect(speedback[2].pairs).toIncludeAllMembers([
      [team[0], alone],
      [team[1], team[2]],
    ]);
  });

  it('team of two should make one round', () => {
    const team: Member[] = [
      {id: '1', name: 'Ana'},
      {id: '2', name: 'John'},
    ]

    const speedback = new SpeedbackSession(team).generateRounds();

    expect(speedback[0].pairs[0]).toEqual(expect.arrayContaining([team[0], team[1]]));
  });

  it('team of four should make three rounds', () => {
    const team: Member[] = [
      { id: '1', name: 'Ana' },
      { id: '2', name: 'John' },
      { id: '3', name: 'Maria' },
      { id: '4', name: 'Clara' },
    ]

    const speedback = new SpeedbackSession(team).generateRounds();

    expect(speedback[0].pairs).toEqual([
      [team[0], team[1]],
      [team[2], team[3]],
    ]);

    expect(speedback[1].pairs).toIncludeAllMembers([
      [team[0], team[2]],
      [team[1], team[3]],
    ]);

    expect(speedback[2].pairs).toIncludeAllMembers([
      [team[0], team[3]],
      [team[1], team[2]],
    ]);
  });
});
