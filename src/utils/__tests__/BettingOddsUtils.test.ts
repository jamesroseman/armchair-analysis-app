import { Day, TeamName, Surface } from "../../types/ModelConstantTypes";
import { SchedulePrediction } from "../../types/SchedulePredictionTypes";
import { Bet, BettingOddsUtils, BettingSimulation, BetType } from "../BettingOddsUtils";

describe('BettingOddsUtils', () => {
  describe('combineBettingSimulations', () => {
    test('should correctly combine betting simulations', () => {
      const testSimulationA: BettingSimulation = {
        stake: 15,
        payout: 30,
        profit: 15,
        bets: []
      };
      const testSimulationB: BettingSimulation = {
        stake: 4,
        payout: 0,
        profit: -4,
        bets: []
      };
      const expectedSimulation: BettingSimulation = {
        stake: 19,
        payout: 30,
        profit: 11,
        bets: []
      };
      const simulation: BettingSimulation = BettingOddsUtils.combineBettingSimulations([
        testSimulationA,
        testSimulationB
      ]);

      expect(simulation).toStrictEqual(expectedSimulation);
    })
  });

  describe('getAccumulatorBetFromSchedulePredictions', () => {
    test('should correctly calculate single occurred bet', () => {
      const testStake: number = 5;
      const testVisitingMoneylineOdds: number = 1.5;

      const testSchedulePrediction: SchedulePrediction = {
        scheduleId: "123",
        gameId: "345",
        game: {
          gameId: "345",
          seasonYear: 2020,
          weekNumber: 8,
          dayOfWeek: Day.Thursday,
          visitingTeamName: TeamName.NewEnglandPatriots,
          homeTeamName: TeamName.NewYorkJets,
          stadium: "MetLife Stadium",
          surface: Surface.AstroPlay,
          overUnderNo: 27.5,
          visitorPointSpreadNo: -3,
          pointsScoredVisitorAmt: 28,
          pointsScoredHomeAmt: 16
        },
        bettingOdds: {
          id: "456",
          scheduleId: "123",
          visitingMoneylineOdds: testVisitingMoneylineOdds,
          homeMoneylineOdds: 0
        },
        seasonYear: 2020,
        weekNumber: 8,
        dayOfWeek: Day.Thursday,
        date: "11/08/2020 21:15",
        visitingTeamName: TeamName.NewEnglandPatriots,
        visitingTeamEloRating: 1410,
        visitingTeamEloRatingRank: 1,
        visitingTeamEloWinExp: 0.52,
        homeTeamName: TeamName.NewYorkJets,
        homeTeamEloRating: 1390,
        homeTeamEloRatingRank: 2,
        homeTeamEloWinExp: 0.48
      };

      // The visiting team wins and has a moneyline of 1.5
      // With a $5 stake, you would expect a $7.5 return
      const expectedPayout: number = testStake * testVisitingMoneylineOdds;

      const expectedBet: Bet = {
        type: BetType.Accumulator,
        odds: testVisitingMoneylineOdds,
        stake: testStake,
        payout: expectedPayout,
        predictions: [testSchedulePrediction]
      };

      const bet: Bet = BettingOddsUtils.getAccumulatorBetFromSchedulePredictions(
        testStake,
        [testSchedulePrediction]
      );

      expect(bet).toStrictEqual(expectedBet);
    });

    test('should correctly calculate single scheduled bet', () => {
      const testStake: number = 5;
      const testVisitingMoneylineOdds: number = 1.5;

      const testSchedulePrediction: SchedulePrediction = {
        scheduleId: "123",
        gameId: "345",
        bettingOdds: {
          id: "456",
          scheduleId: "123",
          visitingMoneylineOdds: testVisitingMoneylineOdds,
          homeMoneylineOdds: 0
        },
        seasonYear: 2020,
        weekNumber: 8,
        dayOfWeek: Day.Thursday,
        date: "11/08/2020 21:15",
        visitingTeamName: TeamName.NewEnglandPatriots,
        visitingTeamEloRating: 1410,
        visitingTeamEloRatingRank: 1,
        visitingTeamEloWinExp: 0.52,
        homeTeamName: TeamName.NewYorkJets,
        homeTeamEloRating: 1390,
        homeTeamEloRatingRank: 2,
        homeTeamEloWinExp: 0.48
      };

      // The visiting team wins and has a moneyline of 1.5
      // With a $5 stake, you would expect a $7.5 return
      const expectedPayout: number = testStake * testVisitingMoneylineOdds;

      const expectedBet: Bet = {
        type: BetType.Accumulator,
        odds: testVisitingMoneylineOdds,
        stake: testStake,
        payout: expectedPayout,
        predictions: [testSchedulePrediction]
      };

      const bet: Bet = BettingOddsUtils.getAccumulatorBetFromSchedulePredictions(
        testStake,
        [testSchedulePrediction]
      );

      expect(bet).toStrictEqual(expectedBet);
    });

    test('should correctly calculate multiple bets', () => {
      const testStake: number = 5;

      const testNewEnglandMoneylineOdds: number = 1.5;
      const newEnglandAtNewYork: SchedulePrediction = {
        scheduleId: "123",
        gameId: "345",
        game: {
          gameId: "345",
          seasonYear: 2020,
          weekNumber: 8,
          dayOfWeek: Day.Thursday,
          visitingTeamName: TeamName.NewEnglandPatriots,
          homeTeamName: TeamName.NewYorkJets,
          stadium: "MetLife Stadium",
          surface: Surface.AstroPlay,
          overUnderNo: 27.5,
          visitorPointSpreadNo: -3,
          pointsScoredVisitorAmt: 28,
          pointsScoredHomeAmt: 16
        },
        bettingOdds: {
          id: "456",
          scheduleId: "123",
          visitingMoneylineOdds: testNewEnglandMoneylineOdds,
          homeMoneylineOdds: 0
        },
        seasonYear: 2020,
        weekNumber: 8,
        dayOfWeek: Day.Thursday,
        date: "11/08/2020 21:15",
        visitingTeamName: TeamName.NewEnglandPatriots,
        visitingTeamEloRating: 1410,
        visitingTeamEloRatingRank: 1,
        visitingTeamEloWinExp: 0.52,
        homeTeamName: TeamName.NewYorkJets,
        homeTeamEloRating: 1390,
        homeTeamEloRatingRank: 2,
        homeTeamEloWinExp: 0.48
      };

      const testTampaBayMoneylineOdds: number = 1.04;
      const tampaBayAtNewOrleans: SchedulePrediction = {
        scheduleId: "234",
        gameId: "456",
        game: {
          gameId: "456",
          seasonYear: 2020,
          weekNumber: 8,
          dayOfWeek: Day.Thursday,
          visitingTeamName: TeamName.TampaBayBuccaneers,
          homeTeamName: TeamName.NewOrleansSaints,
          stadium: "MetLife Stadium",
          surface: Surface.AstroPlay,
          overUnderNo: 27.5,
          visitorPointSpreadNo: -3,
          pointsScoredVisitorAmt: 28,
          pointsScoredHomeAmt: 16
        },
        bettingOdds: {
          id: "789",
          scheduleId: "234",
          visitingMoneylineOdds: testTampaBayMoneylineOdds,
          homeMoneylineOdds: 0
        },
        seasonYear: 2020,
        weekNumber: 8,
        dayOfWeek: Day.Thursday,
        date: "11/08/2020 21:15",
        visitingTeamName: TeamName.TampaBayBuccaneers,
        visitingTeamEloRating: 1410,
        visitingTeamEloRatingRank: 1,
        visitingTeamEloWinExp: 0.52,
        homeTeamName: TeamName.NewOrleansSaints,
        homeTeamEloRating: 1390,
        homeTeamEloRatingRank: 2,
        homeTeamEloWinExp: 0.48
      };

      // The visiting team wins and has a moneyline of 1.5
      // With a $5 stake, you would expect a $7.5 return
      const testMoneylineOdds: number = testNewEnglandMoneylineOdds * testTampaBayMoneylineOdds;
      const expectedPayout: number = testStake * testMoneylineOdds;

      const expectedBet: Bet = {
        type: BetType.Accumulator,
        odds: testMoneylineOdds,
        stake: testStake,
        payout: expectedPayout,
        predictions: [newEnglandAtNewYork, tampaBayAtNewOrleans]
      };

      const bet: Bet = BettingOddsUtils.getAccumulatorBetFromSchedulePredictions(
        testStake,
        [newEnglandAtNewYork, tampaBayAtNewOrleans]
      );

      expect(bet).toStrictEqual(expectedBet);
    });

    test('should correctly invalidate multiple bets if one loses', () => {
      const testStake: number = 5;

      const testNewEnglandMoneylineOdds: number = 1.5;
      const newEnglandAtNewYork: SchedulePrediction = {
        scheduleId: "123",
        gameId: "345",
        game: {
          gameId: "345",
          seasonYear: 2020,
          weekNumber: 8,
          dayOfWeek: Day.Thursday,
          visitingTeamName: TeamName.NewEnglandPatriots,
          homeTeamName: TeamName.NewYorkJets,
          stadium: "MetLife Stadium",
          surface: Surface.AstroPlay,
          overUnderNo: 27.5,
          visitorPointSpreadNo: -3,
          pointsScoredVisitorAmt: 3,
          pointsScoredHomeAmt: 38
        },
        bettingOdds: {
          id: "456",
          scheduleId: "123",
          visitingMoneylineOdds: testNewEnglandMoneylineOdds,
          homeMoneylineOdds: 0
        },
        seasonYear: 2020,
        weekNumber: 8,
        dayOfWeek: Day.Thursday,
        date: "11/08/2020 21:15",
        visitingTeamName: TeamName.NewEnglandPatriots,
        visitingTeamEloRating: 1410,
        visitingTeamEloRatingRank: 1,
        visitingTeamEloWinExp: 0.52,
        homeTeamName: TeamName.NewYorkJets,
        homeTeamEloRating: 1390,
        homeTeamEloRatingRank: 2,
        homeTeamEloWinExp: 0.48
      };

      const testTampaBayMoneylineOdds: number = 1.04;
      const tampaBayAtNewOrleans: SchedulePrediction = {
        scheduleId: "234",
        gameId: "456",
        game: {
          gameId: "456",
          seasonYear: 2020,
          weekNumber: 8,
          dayOfWeek: Day.Thursday,
          visitingTeamName: TeamName.TampaBayBuccaneers,
          homeTeamName: TeamName.NewOrleansSaints,
          stadium: "MetLife Stadium",
          surface: Surface.AstroPlay,
          overUnderNo: 27.5,
          visitorPointSpreadNo: -3,
          pointsScoredVisitorAmt: 28,
          pointsScoredHomeAmt: 16
        },
        bettingOdds: {
          id: "789",
          scheduleId: "234",
          visitingMoneylineOdds: testTampaBayMoneylineOdds,
          homeMoneylineOdds: 0
        },
        seasonYear: 2020,
        weekNumber: 8,
        dayOfWeek: Day.Thursday,
        date: "11/08/2020 21:15",
        visitingTeamName: TeamName.TampaBayBuccaneers,
        visitingTeamEloRating: 1410,
        visitingTeamEloRatingRank: 1,
        visitingTeamEloWinExp: 0.52,
        homeTeamName: TeamName.NewOrleansSaints,
        homeTeamEloRating: 1390,
        homeTeamEloRatingRank: 2,
        homeTeamEloWinExp: 0.48
      };

      // If a team "busts" you expect to get nothing
      const testMoneylineOdds: number = testNewEnglandMoneylineOdds * testTampaBayMoneylineOdds;
      const expectedPayout: number = 0;

      const expectedBet: Bet = {
        type: BetType.Accumulator,
        odds: testMoneylineOdds,
        stake: testStake,
        payout: expectedPayout,
        predictions: [newEnglandAtNewYork, tampaBayAtNewOrleans]
      };

      const bet: Bet = BettingOddsUtils.getAccumulatorBetFromSchedulePredictions(
        testStake,
        [newEnglandAtNewYork, tampaBayAtNewOrleans]
      );

      expect(bet).toStrictEqual(expectedBet);
    });
  });

  describe('getMultipleBettingSimulationFromSchedulePredictions', () => {
    test('should correctly calculate multiple bets', () => {
      const testStake: number = 5;
      // A multi-way bet on two bets means 3 individual bets (2 individuals, 1 double)
      const totalStake: number = 15; 

      const testNewEnglandMoneylineOdds: number = 1.5;
      const newEnglandAtNewYork: SchedulePrediction = {
        scheduleId: "123",
        gameId: "345",
        game: {
          gameId: "345",
          seasonYear: 2020,
          weekNumber: 8,
          dayOfWeek: Day.Thursday,
          visitingTeamName: TeamName.NewEnglandPatriots,
          homeTeamName: TeamName.NewYorkJets,
          stadium: "MetLife Stadium",
          surface: Surface.AstroPlay,
          overUnderNo: 27.5,
          visitorPointSpreadNo: -3,
          pointsScoredVisitorAmt: 28,
          pointsScoredHomeAmt: 16
        },
        bettingOdds: {
          id: "456",
          scheduleId: "123",
          visitingMoneylineOdds: testNewEnglandMoneylineOdds,
          homeMoneylineOdds: 0
        },
        seasonYear: 2020,
        weekNumber: 8,
        dayOfWeek: Day.Thursday,
        date: "11/08/2020 21:15",
        visitingTeamName: TeamName.NewEnglandPatriots,
        visitingTeamEloRating: 1410,
        visitingTeamEloRatingRank: 1,
        visitingTeamEloWinExp: 0.52,
        homeTeamName: TeamName.NewYorkJets,
        homeTeamEloRating: 1390,
        homeTeamEloRatingRank: 2,
        homeTeamEloWinExp: 0.48
      };

      const testTampaBayMoneylineOdds: number = 1.04;
      const tampaBayAtNewOrleans: SchedulePrediction = {
        scheduleId: "234",
        gameId: "456",
        game: {
          gameId: "456",
          seasonYear: 2020,
          weekNumber: 8,
          dayOfWeek: Day.Thursday,
          visitingTeamName: TeamName.TampaBayBuccaneers,
          homeTeamName: TeamName.NewOrleansSaints,
          stadium: "MetLife Stadium",
          surface: Surface.AstroPlay,
          overUnderNo: 27.5,
          visitorPointSpreadNo: -3,
          pointsScoredVisitorAmt: 28,
          pointsScoredHomeAmt: 16
        },
        bettingOdds: {
          id: "789",
          scheduleId: "234",
          visitingMoneylineOdds: testTampaBayMoneylineOdds,
          homeMoneylineOdds: 0
        },
        seasonYear: 2020,
        weekNumber: 8,
        dayOfWeek: Day.Thursday,
        date: "11/08/2020 21:15",
        visitingTeamName: TeamName.TampaBayBuccaneers,
        visitingTeamEloRating: 1410,
        visitingTeamEloRatingRank: 1,
        visitingTeamEloWinExp: 0.52,
        homeTeamName: TeamName.NewOrleansSaints,
        homeTeamEloRating: 1390,
        homeTeamEloRatingRank: 2,
        homeTeamEloWinExp: 0.48
      };

      const newEnglandPayout: number = testNewEnglandMoneylineOdds * testStake;
      const tampaBayPayout: number = testTampaBayMoneylineOdds * testStake;
      const accaPayout: number = (testNewEnglandMoneylineOdds * testTampaBayMoneylineOdds) * testStake;
      const totalPayout: number = newEnglandPayout + tampaBayPayout + accaPayout;
      const expectedBets: Bet[] = [
        {
          type: BetType.Accumulator,
          odds: testNewEnglandMoneylineOdds,
          stake: testStake,
          payout: newEnglandPayout,
          predictions: [newEnglandAtNewYork]
        },
        {
          type: BetType.Accumulator,
          odds: testTampaBayMoneylineOdds,
          stake: testStake,
          payout: tampaBayPayout,
          predictions: [tampaBayAtNewOrleans]
        },
        {
          type: BetType.Accumulator,
          odds: (testNewEnglandMoneylineOdds * testTampaBayMoneylineOdds),
          stake: testStake,
          payout: accaPayout,
          predictions: [newEnglandAtNewYork, tampaBayAtNewOrleans]
        }
      ];
      const expectedSimulation: BettingSimulation = {
        stake: totalStake,
        payout: totalPayout,
        profit: totalPayout - (testStake * 3),
        bets: expectedBets
      };

      const simulation: BettingSimulation = BettingOddsUtils.getMultipleBettingSimulationFromSchedulePredictions(
        testStake,
        [newEnglandAtNewYork, tampaBayAtNewOrleans]
      );

      expect(simulation).toStrictEqual(expectedSimulation);
    });
  })
});