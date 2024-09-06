import { shuffle } from './shuffle';
import { Member, SpeedbackSession } from './Speedback';

jest.mock('./shuffle');

const shuffleMocked = jest.mocked(shuffle);

const alone: Member = { id: '-', name: 'Alone' };
const ana = { id: '1', name: 'Ana' };
const john = { id: '2', name: 'John' };
const maria = { id: '3', name: 'Maria' };
const clara = { id: '4', name: 'Clara' };
const andy = { id: '5', name: 'Andy' };

describe('Speedback room', () => {
  it('empty team should return empty array', () => {
    const team: Member[] = []

    const speedback = new SpeedbackSession(team).generateRounds();

    expect(speedback).toEqual([]);
  });

  it('team of one should make one alone', () => {
    const team: Member[] = [ ana ]

    const speedback = new SpeedbackSession(team).generateRounds();

    expect(speedback[0].pairs).toIncludeAllMembers([[ ana, alone ] ]);
  });

  it('team of two should make one round', () => {
    const team: Member[] = [ ana, john, ];

    const speedback = new SpeedbackSession(team).generateRounds();

    expect(speedback[0].pairs[0]).toEqual([ana, john]);
  });

  describe('team of three should make use of "Alone"', () => {
    const team: Member[] = [
      ana,
      john,
      maria,
    ];

    it("first round should have three pairs", () => {
      const speedback = new SpeedbackSession(team).generateRounds();
      expect(speedback).toHaveLength(3);
    });

    it("For first round Ana should pair with Alone", () => {
      const speedback = new SpeedbackSession(team).generateRounds();

      expect(speedback[0].pairs[0]).toEqual([ana, alone]);
    });

    it("For first round John should pair with Maria", () => {
      const speedback = new SpeedbackSession(team).generateRounds();

      expect(speedback[0].pairs[1]).toEqual([john, maria]);
    });

    it("For second round Ana should pair with Maria", () => {
      const speedback = new SpeedbackSession(team).generateRounds();

      expect(speedback[1].pairs[0]).toEqual([ana, maria]);
    });

    it("For second round John should pair with Alone", () => {
      const speedback = new SpeedbackSession(team).generateRounds();

      expect(speedback[1].pairs[1]).toEqual([john, alone]);
    });

    it("For third round Maria should pair with Alone", () => {
      const speedback = new SpeedbackSession(team).generateRounds();

      expect(speedback[2].pairs[1]).toEqual([maria, alone]);
    });

    it("For third round Ana should pair with John", () => {
      const speedback = new SpeedbackSession(team).generateRounds();

      expect(speedback[2].pairs[0]).toEqual([ana, john]);
    });
  });

  describe('team of four', () => {
    const team: Member[] = [
      ana,
      john,
      maria,
      clara,
    ];

    it('team of four should make three rounds', () => {  
      const speedback = new SpeedbackSession(team).generateRounds();
  
      expect(speedback[0].pairs).toEqual([
        [ana, clara],
        [john, maria],
      ]);
  
      expect(speedback[1].pairs).toIncludeAllMembers([
        [ana, maria],
        [john, clara],
      ]);
  
      expect(speedback[2].pairs).toIncludeAllMembers([
        [ana, john],
        [maria, clara],
      ]);
    });
  });

  describe('team of five', () => {
    const team: Member[] = [
      ana,
      john,
      maria,
      clara,
      andy
    ];

    it('First round', () => {
      const speedback = new SpeedbackSession(team).generateRounds();
  
      expect(speedback[0].pairs).toEqual([
        [ana, alone],
        [john, andy],
        [maria, clara],
      ]);
    });
    
    it('Second round', () => {
      const speedback = new SpeedbackSession(team).generateRounds();
  
      expect(speedback[1].pairs).toEqual([
        [ana, andy],
        [john, clara],
        [maria, alone]
      ]);
    });

    it('Third round', () => {
      const speedback = new SpeedbackSession(team).generateRounds();
  
      expect(speedback[2].pairs).toEqual([
        [ana, clara],
        [john, maria],
        [andy, alone]
      ]);
    });
  });

  it('should shuffle pairs randomly', () => {
    const team: Member[] = [
      ana,
      john,
      maria,
      clara,
    ];

    shuffleMocked.mockReturnValue(team);

    const speedback = new SpeedbackSession(team, { shuffle: true });
    speedback.generateRounds();

    expect(shuffleMocked).toHaveBeenCalled();
  });
});
