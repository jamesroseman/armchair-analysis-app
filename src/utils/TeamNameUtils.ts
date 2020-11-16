import { TeamName } from "../types/ModelConstantTypes";

// https://teamcolorcodes.com/
type TeamColors = {
  primaryColor: string,
  secondaryColor: string,
  additionalColors?: string[]
}

type TeamData = {
  shortName: string,
  longName: string,
  colors: TeamColors,
  logoImgSrc: string,
}

type TeamNameToTeamDataMap = {
  [teamName: string]: TeamData,
}

export class TeamNameUtils {
  /**
   * Get short name string from the TeamName.
   */
  public static getShortNameFromTeamName(teamName: TeamName): string {
    if (TeamNameUtils.teamNameToTeamDataMap.hasOwnProperty(teamName)) {
      return TeamNameUtils.teamNameToTeamDataMap[teamName].shortName;
    }
    return 'Unknown Team';
  }

  /**
   * Get long name string from the TeamName.
   */
  public static getLongNameFromTeamName(teamName: TeamName): string {
    if (TeamNameUtils.teamNameToTeamDataMap.hasOwnProperty(teamName)) {
      return TeamNameUtils.teamNameToTeamDataMap[teamName].longName;
    }
    return 'Unknown Team';
  }

  /**
   * Get the image src string from the TeamName.
   */
  public static getImageSrcFromTeamName(teamName: TeamName): string {
    if (TeamNameUtils.teamNameToTeamDataMap.hasOwnProperty(teamName)) {
      return TeamNameUtils.teamNameToTeamDataMap[teamName].logoImgSrc;
    }
    return '/nfl_teams/nfl_league.png';
  }

  /**
   * Get the primary color from the TeamName
   */
  public static getPrimaryColorFromTeamName(teamName: TeamName): string {
    if (TeamNameUtils.teamNameToTeamDataMap.hasOwnProperty(teamName)) {
      return TeamNameUtils.teamNameToTeamDataMap[teamName].colors.primaryColor;
    }
    return '#000000';
  }

  /**
   * Get the secondary color from the TeamName
   */
  public static getSecondaryColorFromTeamName(teamName: TeamName): string {
    if (TeamNameUtils.teamNameToTeamDataMap.hasOwnProperty(teamName)) {
      return TeamNameUtils.teamNameToTeamDataMap[teamName].colors.secondaryColor;
    }
    return '#FFFFFF';
  }
 
  /**
   * A giant mapping of TeamName enums to useful conversions.
   */
  private static teamNameToTeamDataMap: TeamNameToTeamDataMap = {
    [TeamName.ArizonaCardinals]: {
      shortName: 'Cardinals',
      longName: 'Arizona Cardinals',
      logoImgSrc: '/nfl_teams/arizona_cardinals.png',
      colors: {
        primaryColor: '#97233F',
        secondaryColor: '#000000',
        additionalColors: ['#FFB612'],
      }
    },
    [TeamName.AtlantaFalcons]: {
      shortName: 'Falcons',
      longName: 'Atlanta Falcons',
      logoImgSrc: '/nfl_teams/atlanta_falcons.png',
      colors: {
        primaryColor: '#A71930',
        secondaryColor: '#000000',
        additionalColors: ['#A5ACAF']
      }
    },
    [TeamName.BaltimoreRavens]: {
      shortName: 'Ravens',
      longName: 'Baltimore Ravens',
      logoImgSrc: '/nfl_teams/baltimore_ravens.png',
      colors: {
        primaryColor: '#241773',
        secondaryColor: '#000000',
        additionalColors: [
          '#9E7C0C',
          '#C60C30'
        ]
      }
    },
    [TeamName.BuffaloBills]: {
      shortName: 'Bills',
      longName: 'Buffalo Bills',
      logoImgSrc: '/nfl_teams/buffalo_bills.png',
      colors: {
        primaryColor: '#00338D',
        secondaryColor: '#C60C30',
      }
    },
    [TeamName.CarolinaPanthers]: {
      shortName: 'Panthers',
      longName: 'Carolina Panthers',
      logoImgSrc: '/nfl_teams/carolina_panthers.png',
      colors: {
        primaryColor: '#0085CA',
        secondaryColor: '#101820',
        additionalColors: ['#BFC0BF']
      }
    },
    [TeamName.ChicagoBears]: {
      shortName: 'Bears',
      longName: 'Chicago Bears',
      logoImgSrc: '/nfl_teams/chicago_bears.png',
      colors: {
        primaryColor: '#0B162A',
        secondaryColor: '#C83803',
      }
    },
    [TeamName.CincinnatiBengals]: {
      shortName: 'Bengals',
      longName: 'Cincinnati Bengals',
      logoImgSrc: '/nfl_teams/cincinnati_bengals.png',
      colors: {
        primaryColor: '#FB4F14',
        secondaryColor: '#000000',
      }
    },
    [TeamName.ClevelandBrowns]: {
      shortName: 'Browns',
      longName: 'Cleveland Browns',
      logoImgSrc: '/nfl_teams/cleveland_browns.png',
      colors: {
        primaryColor: '#FF3C00',
        secondaryColor: '#311D00',
      }
    },
    [TeamName.DallasCowboys]: {
      shortName: 'Cowboys',
      longName: 'Dallas Cowboys',
      logoImgSrc: '/nfl_teams/dallas_cowboys.png',
      colors: {
        primaryColor: '#003594',
        secondaryColor: '#041E42',
        additionalColors: [
          '#869397',
          '#7F9695'
        ]
      }
    },
    [TeamName.DenverBroncos]: {
      shortName: 'Broncos',
      longName: 'Denver Broncos',
      logoImgSrc: '/nfl_teams/denver_broncos.png',
      colors: {
        primaryColor: '#FB4F14',
        secondaryColor: '#002244',
      }
    },
    [TeamName.DetroitLions]: {
      shortName: 'Lions',
      longName: 'Detroit Lions',
      logoImgSrc: '/nfl_teams/detroit_lions.png',
      colors: {
        primaryColor: '#0076B6',
        secondaryColor: '#B0B7BC',
        additionalColors: [
          '#000000',
          '#FFFFFF'
        ]
      }
    },
    [TeamName.GreenBayPackers]: {
      shortName: 'Packers',
      longName: 'Green Bay Packers',
      logoImgSrc: '/nfl_teams/green_bay_packers.png',
      colors: {
        primaryColor: '#203731',
        secondaryColor: '#FFB612',
      }
    },
    [TeamName.HoustonTexans]: {
      shortName: 'Texans',
      longName: 'Houston Texans',
      logoImgSrc: '/nfl_teams/houston_texans.png',
      colors: {
        primaryColor: '#03202F',
        secondaryColor: '#A71930',
      }
    },
    [TeamName.IndianapolisColts]: {
      shortName: 'Colts',
      longName: 'Indianapolis Colts',
      logoImgSrc: '/nfl_teams/indianapolis_colts.png',
      colors: {
        primaryColor: '#002C5F',
        secondaryColor: '#A2AAAD',
      }
    },
    [TeamName.JacksonvilleJaguars]: {
      shortName: 'Jaguars',
      longName: 'Jacksonville Jaguars',
      logoImgSrc: '/nfl_teams/jacksonville_jaguars.png',
      colors: {
        primaryColor: '#006778',
        secondaryColor: '#D7A22A',
        additionalColors: [
          '#101820',
          '#9F792C'
        ]
      }
    },
    [TeamName.KansasCityChiefs]: {
      shortName: 'Chiefs',
      longName: 'Kansas City Chiefs',
      logoImgSrc: '/nfl_teams/kansas_city_chiefs.png',
      colors: {
        primaryColor: '#E31837',
        secondaryColor: '#FFB81C',
      }
    },
    [TeamName.LasVegasRaiders]: {
      shortName: 'Raiders',
      longName: 'Las Vegas Raiders',
      logoImgSrc: '/nfl_teams/las_vegas_raiders.png',
      colors: {
        primaryColor: '#000000',
        secondaryColor: ' #A5ACAF',
      }
    },
    [TeamName.LosAngelesChargers]: {
      shortName: 'Chargers',
      longName: 'Los Angeles Chargers',
      logoImgSrc: '/nfl_teams/los_angeles_chargers.png',
      colors: {
        primaryColor: '#002A5E',
        secondaryColor: '#FFC20E',
        additionalColors: ['#0080C6']
      }
    },
    [TeamName.LosAngelesRams]: {
      shortName: 'Rams',
      longName: 'Los Angeles Rams',
      logoImgSrc: '/nfl_teams/los_angeles_rams.png',
      colors: {
        primaryColor: '#003594',
        secondaryColor: '#FFA300',
        additionalColors: [
          '#FF8200',
          '#FFD100',
          '#FFFFFF'
        ]
      }
    },
    [TeamName.MiamiDolphins]: {
      shortName: 'Dolphins',
      longName: 'Miami Dolphins',
      logoImgSrc: '/nfl_teams/miami_dolphins.png',
      colors: {
        primaryColor: '#008E97',
        secondaryColor: '#FC4C02',
        additionalColors: [
          '#005778'
        ]
      }
    },
    [TeamName.MinnesotaVikings]: {
      shortName: 'Vikings',
      longName: 'Minnesota Vikings',
      logoImgSrc: '/nfl_teams/minnesota_vikings.png',
      colors: {
        primaryColor: '#4F2683',
        secondaryColor: '#FFC62F',
      }
    },
    [TeamName.NewEnglandPatriots]: {
      shortName: 'Patriots',
      longName: 'New England Patriots',
      logoImgSrc: '/nfl_teams/new_england_patriots.png',
      colors: {
        primaryColor: '#002244',
        secondaryColor: '#C60C30',
        additionalColors: [
          '#B0B7BC'
        ]
      }
    },
    [TeamName.NewOrleansSaints]: {
      shortName: 'Saints',
      longName: 'New Orleans Saints',
      logoImgSrc: '/nfl_teams/new_orleans_saints.png',
      colors: {
        primaryColor: '#D3BC8D',
        secondaryColor: '#101820',
      }
    },
    [TeamName.NewYorkGiants]: {
      shortName: 'Giants',
      longName: 'New York Giants',
      logoImgSrc: '/nfl_teams/new_york_giants.png',
      colors: {
        primaryColor: '#0B2265',
        secondaryColor: '#A71930',
        additionalColors: ['#A5ACAF']
      }
    },
    [TeamName.NewYorkJets]: {
      shortName: 'Jets',
      longName: 'New York Jets',
      logoImgSrc: '/nfl_teams/new_york_jets.png',
      colors: {
        primaryColor: '#125740',
        secondaryColor: '#000000',
      }
    },
    [TeamName.PhiladelphiaEagles]: {
      shortName: 'Eagles',
      longName: 'Philadelphia Eagles',
      logoImgSrc: '/nfl_teams/philadelphia_eagles.png',
      colors: {
        primaryColor: '#004C54',
        secondaryColor: '#A5ACAF',
        additionalColors: [
          '#ACC0C6',
          '#000000',
          '#565A5C'
        ]
      }
    },
    [TeamName.PittsburghSteelers]: {
      shortName: 'Steelers',
      longName: 'Pittsburgh Steelers',
      logoImgSrc: '/nfl_teams/pittsburgh_steelers.png',
      colors: {
        primaryColor: '#FFB612',
        secondaryColor: '#101820',
        additionalColors: [
          '#003087',
          '#C60C30',
          '#A5ACAF'
        ]
      }
    },
    [TeamName.SanFrancisco49ers]: {
      shortName: '49ers',
      longName: 'San Francisco 49ers',
      logoImgSrc: '/nfl_teams/san_francisco_49ers.png',
      colors: {
        primaryColor: '#AA0000',
        secondaryColor: '#B3995D',
      }
    },
    [TeamName.SeattleSeahawks]: {
      shortName: 'Seahawks',
      longName: 'Seattle Seahawks',
      logoImgSrc: '/nfl_teams/seattle_seahawks.png',
      colors: {
        primaryColor: '#002244',
        secondaryColor: '#69BE28',
        additionalColors: ['#A5ACAF']
      }
    },
    [TeamName.TampaBayBuccaneers]: {
      shortName: 'Buccaneers',
      longName: 'Tampa Bay Buccaneers',
      logoImgSrc: '/nfl_teams/tampa_bay_buccaneers.png',
      colors: {
        primaryColor: '#D50A0A',
        secondaryColor: '#FF7900',
        additionalColors: [
          '#0A0A08',
          '#B1BABF',
          '#34302B'
        ]
      }
    },
    [TeamName.TennesseeTitans]: {
      shortName: 'Titans',
      longName: 'Tennessee Titans',
      logoImgSrc: '/nfl_teams/tennessee_titans.png',
      colors: {
        primaryColor: '#0C2340',
        secondaryColor: '#4B92DB',
        additionalColors: [
          '#C8102E',
          '#8A8D8F',
          '#A2AAAD',
          '#54585A'
        ]
      }
    },
    [TeamName.WashingtonRedskins]: {
      shortName: 'Washington',
      longName: 'Washington Football Team',
      logoImgSrc: '/nfl_teams/washington_football_team.png',
      colors: {
        primaryColor: '#773141',
        secondaryColor: '#FFB612',
      }
    }
  }
}