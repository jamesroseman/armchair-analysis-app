import { TeamName } from "../types/ModelConstantTypes";

export class TeamNameUtils {
  /**
   * Get printable string from the TeamName.
   */
  public static getPrintableNameFromTeamName(teamName: TeamName): string {
    switch(teamName) {
      case TeamName.ArizonaCardinals: {
        return 'Cardinals';
      }
      case TeamName.AtlantaFalcons: {
        return 'Falcons';
      }
      case TeamName.BaltimoreRavens: {
        return 'Ravens';
      }
      case TeamName.BuffaloBills: {
        return 'Bills';
      }
      case TeamName.CarolinaPanthers: {
        return 'Panthers';
      }
      case TeamName.ChicagoBears: {
        return 'Bears';
      }
      case TeamName.CincinnatiBengals: {
        return 'Bengals';
      }
      case TeamName.ClevelandBrowns: {
        return 'Browns';
      }
      case TeamName.DallasCowboys: {
        return 'Cowboys';
      }
      case TeamName.DenverBroncos: {
        return 'Broncos';
      }
      case TeamName.DetroitLions: {
        return 'Lions';
      }
      case TeamName.GreenBayPackers: {
        return 'Packers';
      }
      case TeamName.HoustonTexans: {
        return 'Texans';
      }
      case TeamName.IndianapolisColts: {
        return 'Colts';
      }
      case TeamName.JacksonvilleJaguars: {
        return 'Jaguars';
      }
      case TeamName.KansasCityChiefs: {
        return 'Chiefs';
      }
      case TeamName.LasVegasRaiders: {
        return 'Raiders';
      }
      case TeamName.LosAngelesChargers: {
        return 'Chargers';
      }
      case TeamName.LosAngelesRams: {
        return 'Rams';
      }
      case TeamName.MiamiDolphins: {
        return 'Dolphins';
      }
      case TeamName.MinnesotaVikings: {
        return 'Vikings';
      }
      case TeamName.NewEnglandPatriots: {
        return 'Patriots';
      }
      case TeamName.NewOrleansSaints: {
        return 'Saints';
      }
      case TeamName.NewYorkGiants: {
        return 'Giants';
      }
      case TeamName.NewYorkJets: {
        return 'Jets';
      }
      case TeamName.PhiladelphiaEagles: {
        return 'Eagles';
      }
      case TeamName.PittsburghSteelers: {
        return 'Steelers';
      }
      case TeamName.SanFrancisco49ers: {
        return '49ers';
      }
      case TeamName.SeattleSeahawks: {
        return 'Seahawks';
      }
      case TeamName.TampaBayBuccaneers: {
        return 'Buccaneers';
      }
      case TeamName.TennesseeTitans: {
        return 'Titans';
      }
      case TeamName.WashingtonRedskins: {
        return 'Washington';
      }
      default: {
        return 'Unknown Team';
      }
    }
  }

  /**
   * Get the image src string from the TeamName.
   */
  public static getImageSrcFromTeamName(teamName: TeamName): string {
    switch(teamName) {
      case TeamName.ArizonaCardinals: {
        return './nfl_teams/arizona_cardinals.png';
      }
      case TeamName.AtlantaFalcons: {
        return './nfl_teams/atlanta_falcons.png';
      }
      case TeamName.BaltimoreRavens: {
        return './nfl_teams/baltimore_ravens.png';
      }
      case TeamName.BuffaloBills: {
        return './nfl_teams/buffalo_bills.png';
      }
      case TeamName.CarolinaPanthers: {
        return './nfl_teams/carolina_panthers.png';
      }
      case TeamName.ChicagoBears: {
        return './nfl_teams/chicago_bears.png';
      }
      case TeamName.CincinnatiBengals: {
        return './nfl_teams/cincinnati_bengals.png';
      }
      case TeamName.ClevelandBrowns: {
        return './nfl_teams/cleveland_browns.png';
      }
      case TeamName.DallasCowboys: {
        return './nfl_teams/dallas_cowboys.png';
      }
      case TeamName.DenverBroncos: {
        return './nfl_teams/denver_broncos.png';
      }
      case TeamName.DetroitLions: {
        return './nfl_teams/detroit_lions.png';
      }
      case TeamName.GreenBayPackers: {
        return './nfl_teams/green_bay_packers.png';
      }
      case TeamName.HoustonTexans: {
        return './nfl_teams/houston_texans.png';
      }
      case TeamName.IndianapolisColts: {
        return './nfl_teams/indianapolis_colts.png';
      }
      case TeamName.JacksonvilleJaguars: {
        return './nfl_teams/jacksonville_jaguars.png';
      }
      case TeamName.KansasCityChiefs: {
        return './nfl_teams/kansas_city_chiefs.png';
      }
      case TeamName.LasVegasRaiders: {
        return './nfl_teams/las_vegas_raiders.png';
      }
      case TeamName.LosAngelesChargers: {
        return './nfl_teams/los_angeles_chargers.png';
      }
      case TeamName.LosAngelesRams: {
        return './nfl_teams/los_angeles_rams.png';
      }
      case TeamName.MiamiDolphins: {
        return './nfl_teams/miami_dolphins.png';
      }
      case TeamName.MinnesotaVikings: {
        return './nfl_teams/minnesota_vikings.png';
      }
      case TeamName.NewEnglandPatriots: {
        return './nfl_teams/new_england_patriots.png';
      }
      case TeamName.NewOrleansSaints: {
        return './nfl_teams/new_orleans_saints.png';
      }
      case TeamName.NewYorkGiants: {
        return './nfl_teams/new_york_giants.png';
      }
      case TeamName.NewYorkJets: {
        return './nfl_teams/new_york_jets.png';
      }
      case TeamName.PhiladelphiaEagles: {
        return './nfl_teams/philadelphia_eagles.png';
      }
      case TeamName.PittsburghSteelers: {
        return './nfl_teams/pittsburgh_steelers.png';
      }
      case TeamName.SanFrancisco49ers: {
        return './nfl_teams/san_francisco_49ers.png';
      }
      case TeamName.SeattleSeahawks: {
        return './nfl_teams/seattle_seahawks.png';
      }
      case TeamName.TampaBayBuccaneers: {
        return './nfl_teams/tampa_bay_buccaneers.png';
      }
      case TeamName.TennesseeTitans: {
        return './nfl_teams/tennessee_titans.png';
      }
      case TeamName.WashingtonRedskins: {
        return './nfl_teams/washington_football_team.png';
      }
      default: {
        return './nfl_teams/nfl_league.png';
      }
    }
  }
}