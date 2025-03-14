// Types pour les indicateurs
interface Indicator {
  reason?: string;
  value?: number;
  indicator?: number;
}

interface WaterTemperature {
  day?: string;
  water_temperature_min?: number;
  water_temperature_max?: number;
  indicator?: number;
  reason?: string;
}

export interface GeneralIndicator {
  day: string | null;
  general_indicator: number | null;
  general_value: number | null;
  general: Indicator | null;
  mortality: Indicator | null;
  agitation: Indicator | null;
  agitation_during_opening_period: Indicator | null;
  valve_closing_duration: Indicator | null;
  valve_opening_amplitude: Indicator | null;
  night_and_day_rhythm: Indicator | null;
  tidal_rhythm: Indicator | null;
  growth: Indicator | null;
  max_amplitude: Indicator | null;
  spawning: Indicator | null;
  water_temperature: WaterTemperature | null;
}

export interface GeneralIndicatorLight {
  day: string | null;
  general_indicator: number | null;
  general_value: number | null;
}

// Types pour les résultats des fonctions
export interface AgitationIndicator {
  day: string;
  value: number;
  total_mt_red_threshold: number;
  total_mt_orange_threshold: number;
  total_mt_yellow_threshold: number;
  total_mt_green_threshold: number;
  total_mt_blue_threshold: number;
  indicator: number;
  agitation_red_threshold: number;
  agitation_orange_threshold: number;
  agitation_yellow_threshold: number;
  agitation_green_threshold: number;
  agitation_number_of_exceedences_threshold: number;
}

export interface GrowthIndicator {
  day: string;
  value: number;
  indicator: number;
  growth_red_threshold: number;
  growth_orange_threshold: number;
  growth_yellow_threshold: number;
  growth_green_threshold: number;
}

export interface MaxAmplitudeIndicator {
  day: string;
  value: number;
  indicator: number;
  max_amplitude_red_threshold: number;
  max_amplitude_orange_threshold: number;
  max_amplitude_yellow_threshold: number;
  max_amplitude_green_threshold: number;
}

export interface MortalityIndicator {
  day: string;
  total_oysters_dead: number;
  indicator: number;
}

export interface RhythmIndicator {
  day: string;
  average_night_and_day: number;
  indicator: number;
  night_and_day_rhythm_red_threshold: number;
  night_and_day_rhythm_orange_threshold: number;
  night_and_day_rhythm_yellow_threshold: number;
  night_and_day_rhythm_green_threshold: number;
}

export interface SpawningIndicator {
  day: string;
  value: number;
  indicator: number;
  spawning_pink_threshold: number;
}

export interface ValveClosingDurationIndicator {
  day: string;
  value: number;
  indicator: number;
  valve_closing_duration_red_threshold: number;
  valve_closing_duration_orange_threshold: number;
  valve_closing_duration_yellow_threshold: number;
  valve_closing_duration_green_threshold: number;
}

export interface ValveOpeningAmplitudeIndicator {
  day: string;
  value: number;
  indicator: number;
  valve_opening_amplitude_red_threshold: number;
  valve_opening_amplitude_orange_threshold: number;
  valve_opening_amplitude_yellow_threshold: number;
  valve_opening_amplitude_green_threshold: number;
}

export interface Geometry {
  type: string;
  coordinates: number[][];
}

export interface Properties {
  public: boolean;
  created_at: Date;
}

export interface Feature {
  geometry: Geometry;
  id: string;
  properties: Properties;
  type: string;
}

export type PostGISGeography = {
  type: string;
  coordinates: number[];
  crs: {
    type: string;
    properties: {
      name: string;
    };
  };
};

export interface CityGeography {
  id: string;
  name: string;
  location: PostGISGeography;
  longitude: number;
  latitude: number;
  geometry: Geometry;
  feature: Feature;
}

export interface ValvoGeography {
  id: string;
  location: PostGISGeography;
  longitude: number;
  latitude: number;
  geometry: Geometry;
  feature: Feature;
}

export interface ValvoWithIndicator extends ValvoGeography {
  generalIndicator: GeneralIndicator | null;
}
