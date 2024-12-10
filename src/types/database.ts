export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      todos: {
        Row: {
          created_at: string;
          done: boolean | null;
          id: number;
          label: string | null;
        };
        Insert: {
          created_at?: string;
          done?: boolean | null;
          id?: number;
          label?: string | null;
        };
        Update: {
          created_at?: string;
          done?: boolean | null;
          id?: number;
          label?: string | null;
        };
        Relationships: [];
      };
      valvo: {
        Row: {
          id: string;
          created_at: string;
          public: boolean;
          name: string;
          agitation_number_of_exceedences_threshold: number;
          agitation_green_threshold: number;
          agitation_yellow_threshold: number;
          agitation_orange_threshold: number;
          agitation_red_threshold: number;
          mortality_green_threshold: number;
          mortality_yellow_threshold: number;
          mortality_orange_threshold: number;
          mortality_red_threshold: number;
          valve_closing_duration_green_threshold: number;
          valve_closing_duration_yellow_threshold: number;
          valve_closing_duration_orange_threshold: number;
          valve_closing_duration_red_threshold: number;
          valve_opening_amplitude_green_threshold: number;
          valve_opening_amplitude_yellow_threshold: number;
          valve_opening_amplitude_orange_threshold: number;
          valve_opening_amplitude_red_threshold: number;
          night_and_day_rhythm_green_threshold: number;
          night_and_day_rhythm_yellow_threshold: number;
          night_and_day_rhythm_orange_threshold: number;
          night_and_day_rhythm_red_threshold: number;
          tidal_rhythm_green_threshold: number;
          tidal_rhythm_yellow_threshold: number;
          tidal_rhythm_orange_threshold: number;
          tidal_rhythm_red_threshold: number;
          growth_threshold: number;
          growth_green_threshold: number;
          growth_yellow_threshold: number;
          growth_orange_threshold: number;
          growth_red_threshold: number;
          max_amplitude_threshold: number;
          max_amplitude_green_threshold: number;
          max_amplitude_yellow_threshold: number;
          max_amplitude_orange_threshold: number;
          max_amplitude_red_threshold: number;
          spawning_pink_threshold: number;
          general_green_threshold: number;
          general_yellow_threshold: number;
          general_orange_threshold: number;
          general_red_threshold: number;
          mortality_weight: number;
          agitation_weight: number;
          agitation_during_opening_period_weight: number;
          valve_closing_duration_weight: number;
          valve_opening_amplitude_weight: number;
          night_and_day_rhythm_weight: number;
          tidal_rhythm_weight: number;
          valve_during_opening_period_weight: number;
          growth_weight: number;
          max_amplitude_weight: number;
          city: string;
          location: unknown;
        };
        Insert: {
          id?: string;
          created_at?: string;
          public?: boolean;
          name?: string;
          agitation_number_of_exceedences_threshold?: number;
          agitation_green_threshold?: number;
          agitation_yellow_threshold?: number;
          agitation_orange_threshold?: number;
          agitation_red_threshold?: number;
          mortality_green_threshold?: number;
          mortality_yellow_threshold?: number;
          mortality_orange_threshold?: number;
          mortality_red_threshold?: number;
          valve_closing_duration_green_threshold?: number;
          valve_closing_duration_yellow_threshold?: number;
          valve_closing_duration_orange_threshold?: number;
          valve_closing_duration_red_threshold?: number;
          valve_opening_amplitude_green_threshold?: number;
          valve_opening_amplitude_yellow_threshold?: number;
          valve_opening_amplitude_orange_threshold?: number;
          valve_opening_amplitude_red_threshold?: number;
          night_and_day_rhythm_green_threshold?: number;
          night_and_day_rhythm_yellow_threshold?: number;
          night_and_day_rhythm_orange_threshold?: number;
          night_and_day_rhythm_red_threshold?: number;
          tidal_rhythm_green_threshold?: number;
          tidal_rhythm_yellow_threshold?: number;
          tidal_rhythm_orange_threshold?: number;
          tidal_rhythm_red_threshold?: number;
          growth_threshold?: number;
          growth_green_threshold?: number;
          growth_yellow_threshold?: number;
          growth_orange_threshold?: number;
          growth_red_threshold?: number;
          max_amplitude_threshold?: number;
          max_amplitude_green_threshold?: number;
          max_amplitude_yellow_threshold?: number;
          max_amplitude_orange_threshold?: number;
          max_amplitude_red_threshold?: number;
          spawning_pink_threshold?: number;
          general_green_threshold?: number;
          general_yellow_threshold?: number;
          general_orange_threshold?: number;
          general_red_threshold?: number;
          mortality_weight?: number;
          agitation_weight?: number;
          agitation_during_opening_period_weight?: number;
          valve_closing_duration_weight?: number;
          valve_opening_amplitude_weight?: number;
          night_and_day_rhythm_weight?: number;
          tidal_rhythm_weight?: number;
          valve_during_opening_period_weight?: number;
          growth_weight?: number;
          max_amplitude_weight?: number;
          city?: string;
          location?: unknown;
        };
        Update: {
          id?: string;
          created_at?: string;
          public?: boolean;
          name?: string;
          agitation_number_of_exceedences_threshold?: number;
          agitation_green_threshold?: number;
          agitation_yellow_threshold?: number;
          agitation_orange_threshold?: number;
          agitation_red_threshold?: number;
          mortality_green_threshold?: number;
          mortality_yellow_threshold?: number;
          mortality_orange_threshold?: number;
          mortality_red_threshold?: number;
          valve_closing_duration_green_threshold?: number;
          valve_closing_duration_yellow_threshold?: number;
          valve_closing_duration_orange_threshold?: number;
          valve_closing_duration_red_threshold?: number;
          valve_opening_amplitude_green_threshold?: number;
          valve_opening_amplitude_yellow_threshold?: number;
          valve_opening_amplitude_orange_threshold?: number;
          valve_opening_amplitude_red_threshold?: number;
          night_and_day_rhythm_green_threshold?: number;
          night_and_day_rhythm_yellow_threshold?: number;
          night_and_day_rhythm_orange_threshold?: number;
          night_and_day_rhythm_red_threshold?: number;
          tidal_rhythm_green_threshold?: number;
          tidal_rhythm_yellow_threshold?: number;
          tidal_rhythm_orange_threshold?: number;
          tidal_rhythm_red_threshold?: number;
          growth_threshold?: number;
          growth_green_threshold?: number;
          growth_yellow_threshold?: number;
          growth_orange_threshold?: number;
          growth_red_threshold?: number;
          max_amplitude_threshold?: number;
          max_amplitude_green_threshold?: number;
          max_amplitude_yellow_threshold?: number;
          max_amplitude_orange_threshold?: number;
          max_amplitude_red_threshold?: number;
          spawning_pink_threshold?: number;
          general_green_threshold?: number;
          general_yellow_threshold?: number;
          general_orange_threshold?: number;
          general_red_threshold?: number;
          mortality_weight?: number;
          agitation_weight?: number;
          agitation_during_opening_period_weight?: number;
          valve_closing_duration_weight?: number;
          valve_opening_amplitude_weight?: number;
          night_and_day_rhythm_weight?: number;
          tidal_rhythm_weight?: number;
          valve_during_opening_period_weight?: number;
          growth_weight?: number;
          max_amplitude_weight?: number;
          city?: string;
          location?: unknown;
        };
        Relationships: [
          {
            foreignKeyName: 'valvo_city_fkey';
            columns: ['city'];
            referencedRelation: 'city';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      can_read_valvo: (args: { id: string; valvo_id: string }) => Promise<boolean>;
      get_agitation_during_opening_period_indicator: (args: {
        start_date: string;
        period_of_time: number;
        valvo_id: string;
      }) => Promise<AgitationIndicator[]>;
      get_agitation_indicator: (args: {
        start_date: string;
        period_of_time: number;
        valvo_id: string;
      }) => Promise<AgitationIndicator[]>;
      get_all_user_accessible_valvo: () => Promise<{ id: string }[]>;
      get_city_geography: () => Promise<CityGeography[]>;
      get_current_general_indicator: (args: { valvo_id: string }) => Promise<GeneralIndicator>; // jsonb
      get_general_indicator: (args: {
        start_date: string;
        period_of_time: number;
        valvo_id: string;
      }) => Promise<GeneralIndicator[]>;
      get_general_indicator2: (args: {
        start_date: string;
        period_of_time: number;
        valvo_id: string;
      }) => Promise<GeneralIndicator[]>;
      get_general_indicator_light: (args: {
        start_date: string;
        period_of_time: number;
        valvo_id: string;
      }) => Promise<GeneralIndicatorLight[]>;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
  ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
  ? PublicSchema['Enums'][PublicEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
  ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
  : never;

// Types pour les indicateurs
export interface GeneralIndicator {
  day: string; // date
  indicator: number;
  agitation_indicator: number;
  growth_indicator: number;
  max_amplitude_indicator: number;
  mortality_indicator: number;
  night_and_day_rhythm_indicator: number;
  spawning_indicator: number;
  tidal_rhythm_indicator: number;
  valve_closing_duration_indicator: number;
  valve_opening_amplitude_indicator: number;
}

export interface GeneralIndicatorLight {
  day: string; // date
  indicator: number;
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

export interface CityGeography {
  id: string;
  name: string;
  location: unknown; // type geography de PostGIS
  longitude: number;
  latitude: number;
  geometry: Geometry;
  feature: Feature;
}

export interface ValvoGeography {
  id: string;
  location: unknown; // type geography de PostGIS
  longitude: number;
  latitude: number;
  geometry: Geometry; // jsonb
  feature: Feature; // jsonb
}
