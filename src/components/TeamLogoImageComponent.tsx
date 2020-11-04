import React from 'react';
import { TeamName } from '../types/ModelConstantTypes';

type TeamLogoImageComponentProps = {
  teamName: TeamName,
  width?: number,
  height?: number
}

export default ({ teamName, width, height }: TeamLogoImageComponentProps) => {
  return (
    <img width={width} height={height} alt={`${teamName} Logo`} src={getImageSrcFromTeamName(teamName)} />
  );
}

function getImageSrcFromTeamName(teamName: TeamName): string {
  return `./nfl_teams/${getImagePrefixFromTeamName(teamName)}.png`;
}

function getImagePrefixFromTeamName(teamName: TeamName): string {
  switch(teamName) {
    case TeamName.ArizonaCardinals: {
      return 'arizona_cardinals';
    }
    case TeamName.AtlantaFalcons: {
      return 'atlanta_falcons';
    }
    case TeamName.BaltimoreRavens: {
      return 'baltimore_ravens';
    }
    case TeamName.BuffaloBills: {
      return 'buffalo_bills';
    }
    case TeamName.CarolinaPanthers: {
      return 'carolina_panthers';
    }
    case TeamName.ChicagoBears: {
      return 'chicago_bears';
    }
    case TeamName.CincinnatiBengals: {
      return 'cincinnati_bengals';
    }
    case TeamName.ClevelandBrowns: {
      return 'cleveland_browns';
    }
    case TeamName.DallasCowboys: {
      return 'dallas_cowboys';
    }
    case TeamName.DenverBroncos: {
      return 'denver_broncos';
    }
    case TeamName.DetroitLions: {
      return 'detroit_lions';
    }
    case TeamName.GreenBayPackers: {
      return 'green_bay_packers';
    }
    case TeamName.HoustonTexans: {
      return 'houston_texans';
    }
    case TeamName.IndianapolisColts: {
      return 'indianapolis_colts';
    }
    case TeamName.JacksonvilleJaguars: {
      return 'jacksonville_jaguars';
    }
    case TeamName.KansasCityChiefs: {
      return 'kansas_city_chiefs';
    }
    case TeamName.LasVegasRaiders: {
      return 'las_vegas_raiders';
    }
    case TeamName.LosAngelesChargers: {
      return 'los_angeles_chargers';
    }
    case TeamName.LosAngelesRams: {
      return 'los_angeles_rams';
    }
    case TeamName.MiamiDolphins: {
      return 'miami_dolphins';
    }
    case TeamName.MinnesotaVikings: {
      return 'minnesota_vikings';
    }
    case TeamName.NewEnglandPatriots: {
      return 'new_england_patriots';
    }
    case TeamName.NewOrleansSaints: {
      return 'new_orleans_saints';
    }
    case TeamName.NewYorkGiants: {
      return 'new_york_giants';
    }
    case TeamName.NewYorkJets: {
      return 'new_york_jets';
    }
    case TeamName.PhiladelphiaEagles: {
      return 'philadelphia_eagles';
    }
    case TeamName.PittsburghSteelers: {
      return 'pittsburgh_steelers';
    }
    case TeamName.SanFrancisco49ers: {
      return 'san_francisco_49ers';
    }
    case TeamName.SeattleSeahawks: {
      return 'seattle_seahawks';
    }
    case TeamName.TampaBayBuccaneers: {
      return 'tampa_bay_buccaneers';
    }
    case TeamName.TennesseeTitans: {
      return 'tennessee_titans';
    }
    case TeamName.WashingtonRedskins: {
      return 'washington_football_team';
    }
    default: {
      return 'nfl_league';
    }
  }
}