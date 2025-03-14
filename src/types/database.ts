export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  auth: {
    Tables: {
      audit_log_entries: {
        Row: {
          created_at: string | null;
          id: string;
          instance_id: string | null;
          ip_address: string;
          payload: Json | null;
        };
        Insert: {
          created_at?: string | null;
          id: string;
          instance_id?: string | null;
          ip_address?: string;
          payload?: Json | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          instance_id?: string | null;
          ip_address?: string;
          payload?: Json | null;
        };
        Relationships: [];
      };
      flow_state: {
        Row: {
          auth_code: string;
          auth_code_issued_at: string | null;
          authentication_method: string;
          code_challenge: string;
          code_challenge_method: Database['auth']['Enums']['code_challenge_method'];
          created_at: string | null;
          id: string;
          provider_access_token: string | null;
          provider_refresh_token: string | null;
          provider_type: string;
          updated_at: string | null;
          user_id: string | null;
        };
        Insert: {
          auth_code: string;
          auth_code_issued_at?: string | null;
          authentication_method: string;
          code_challenge: string;
          code_challenge_method: Database['auth']['Enums']['code_challenge_method'];
          created_at?: string | null;
          id: string;
          provider_access_token?: string | null;
          provider_refresh_token?: string | null;
          provider_type: string;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          auth_code?: string;
          auth_code_issued_at?: string | null;
          authentication_method?: string;
          code_challenge?: string;
          code_challenge_method?: Database['auth']['Enums']['code_challenge_method'];
          created_at?: string | null;
          id?: string;
          provider_access_token?: string | null;
          provider_refresh_token?: string | null;
          provider_type?: string;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Relationships: [];
      };
      identities: {
        Row: {
          created_at: string | null;
          email: string | null;
          id: string;
          identity_data: Json;
          last_sign_in_at: string | null;
          provider: string;
          provider_id: string;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          email?: string | null;
          id?: string;
          identity_data: Json;
          last_sign_in_at?: string | null;
          provider: string;
          provider_id: string;
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          email?: string | null;
          id?: string;
          identity_data?: Json;
          last_sign_in_at?: string | null;
          provider?: string;
          provider_id?: string;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'identities_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      instances: {
        Row: {
          created_at: string | null;
          id: string;
          raw_base_config: string | null;
          updated_at: string | null;
          uuid: string | null;
        };
        Insert: {
          created_at?: string | null;
          id: string;
          raw_base_config?: string | null;
          updated_at?: string | null;
          uuid?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          raw_base_config?: string | null;
          updated_at?: string | null;
          uuid?: string | null;
        };
        Relationships: [];
      };
      mfa_amr_claims: {
        Row: {
          authentication_method: string;
          created_at: string;
          id: string;
          session_id: string;
          updated_at: string;
        };
        Insert: {
          authentication_method: string;
          created_at: string;
          id: string;
          session_id: string;
          updated_at: string;
        };
        Update: {
          authentication_method?: string;
          created_at?: string;
          id?: string;
          session_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'mfa_amr_claims_session_id_fkey';
            columns: ['session_id'];
            isOneToOne: false;
            referencedRelation: 'sessions';
            referencedColumns: ['id'];
          }
        ];
      };
      mfa_challenges: {
        Row: {
          created_at: string;
          factor_id: string;
          id: string;
          ip_address: unknown;
          otp_code: string | null;
          verified_at: string | null;
          web_authn_session_data: Json | null;
        };
        Insert: {
          created_at: string;
          factor_id: string;
          id: string;
          ip_address: unknown;
          otp_code?: string | null;
          verified_at?: string | null;
          web_authn_session_data?: Json | null;
        };
        Update: {
          created_at?: string;
          factor_id?: string;
          id?: string;
          ip_address?: unknown;
          otp_code?: string | null;
          verified_at?: string | null;
          web_authn_session_data?: Json | null;
        };
        Relationships: [
          {
            foreignKeyName: 'mfa_challenges_auth_factor_id_fkey';
            columns: ['factor_id'];
            isOneToOne: false;
            referencedRelation: 'mfa_factors';
            referencedColumns: ['id'];
          }
        ];
      };
      mfa_factors: {
        Row: {
          created_at: string;
          factor_type: Database['auth']['Enums']['factor_type'];
          friendly_name: string | null;
          id: string;
          last_challenged_at: string | null;
          phone: string | null;
          secret: string | null;
          status: Database['auth']['Enums']['factor_status'];
          updated_at: string;
          user_id: string;
          web_authn_aaguid: string | null;
          web_authn_credential: Json | null;
        };
        Insert: {
          created_at: string;
          factor_type: Database['auth']['Enums']['factor_type'];
          friendly_name?: string | null;
          id: string;
          last_challenged_at?: string | null;
          phone?: string | null;
          secret?: string | null;
          status: Database['auth']['Enums']['factor_status'];
          updated_at: string;
          user_id: string;
          web_authn_aaguid?: string | null;
          web_authn_credential?: Json | null;
        };
        Update: {
          created_at?: string;
          factor_type?: Database['auth']['Enums']['factor_type'];
          friendly_name?: string | null;
          id?: string;
          last_challenged_at?: string | null;
          phone?: string | null;
          secret?: string | null;
          status?: Database['auth']['Enums']['factor_status'];
          updated_at?: string;
          user_id?: string;
          web_authn_aaguid?: string | null;
          web_authn_credential?: Json | null;
        };
        Relationships: [
          {
            foreignKeyName: 'mfa_factors_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      one_time_tokens: {
        Row: {
          created_at: string;
          id: string;
          relates_to: string;
          token_hash: string;
          token_type: Database['auth']['Enums']['one_time_token_type'];
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id: string;
          relates_to: string;
          token_hash: string;
          token_type: Database['auth']['Enums']['one_time_token_type'];
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          relates_to?: string;
          token_hash?: string;
          token_type?: Database['auth']['Enums']['one_time_token_type'];
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'one_time_tokens_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      refresh_tokens: {
        Row: {
          created_at: string | null;
          id: number;
          instance_id: string | null;
          parent: string | null;
          revoked: boolean | null;
          session_id: string | null;
          token: string | null;
          updated_at: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          instance_id?: string | null;
          parent?: string | null;
          revoked?: boolean | null;
          session_id?: string | null;
          token?: string | null;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          instance_id?: string | null;
          parent?: string | null;
          revoked?: boolean | null;
          session_id?: string | null;
          token?: string | null;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'refresh_tokens_session_id_fkey';
            columns: ['session_id'];
            isOneToOne: false;
            referencedRelation: 'sessions';
            referencedColumns: ['id'];
          }
        ];
      };
      saml_providers: {
        Row: {
          attribute_mapping: Json | null;
          created_at: string | null;
          entity_id: string;
          id: string;
          metadata_url: string | null;
          metadata_xml: string;
          name_id_format: string | null;
          sso_provider_id: string;
          updated_at: string | null;
        };
        Insert: {
          attribute_mapping?: Json | null;
          created_at?: string | null;
          entity_id: string;
          id: string;
          metadata_url?: string | null;
          metadata_xml: string;
          name_id_format?: string | null;
          sso_provider_id: string;
          updated_at?: string | null;
        };
        Update: {
          attribute_mapping?: Json | null;
          created_at?: string | null;
          entity_id?: string;
          id?: string;
          metadata_url?: string | null;
          metadata_xml?: string;
          name_id_format?: string | null;
          sso_provider_id?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'saml_providers_sso_provider_id_fkey';
            columns: ['sso_provider_id'];
            isOneToOne: false;
            referencedRelation: 'sso_providers';
            referencedColumns: ['id'];
          }
        ];
      };
      saml_relay_states: {
        Row: {
          created_at: string | null;
          flow_state_id: string | null;
          for_email: string | null;
          id: string;
          redirect_to: string | null;
          request_id: string;
          sso_provider_id: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          flow_state_id?: string | null;
          for_email?: string | null;
          id: string;
          redirect_to?: string | null;
          request_id: string;
          sso_provider_id: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          flow_state_id?: string | null;
          for_email?: string | null;
          id?: string;
          redirect_to?: string | null;
          request_id?: string;
          sso_provider_id?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'saml_relay_states_flow_state_id_fkey';
            columns: ['flow_state_id'];
            isOneToOne: false;
            referencedRelation: 'flow_state';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'saml_relay_states_sso_provider_id_fkey';
            columns: ['sso_provider_id'];
            isOneToOne: false;
            referencedRelation: 'sso_providers';
            referencedColumns: ['id'];
          }
        ];
      };
      schema_migrations: {
        Row: {
          version: string;
        };
        Insert: {
          version: string;
        };
        Update: {
          version?: string;
        };
        Relationships: [];
      };
      sessions: {
        Row: {
          aal: Database['auth']['Enums']['aal_level'] | null;
          created_at: string | null;
          factor_id: string | null;
          id: string;
          ip: unknown | null;
          not_after: string | null;
          refreshed_at: string | null;
          tag: string | null;
          updated_at: string | null;
          user_agent: string | null;
          user_id: string;
        };
        Insert: {
          aal?: Database['auth']['Enums']['aal_level'] | null;
          created_at?: string | null;
          factor_id?: string | null;
          id: string;
          ip?: unknown | null;
          not_after?: string | null;
          refreshed_at?: string | null;
          tag?: string | null;
          updated_at?: string | null;
          user_agent?: string | null;
          user_id: string;
        };
        Update: {
          aal?: Database['auth']['Enums']['aal_level'] | null;
          created_at?: string | null;
          factor_id?: string | null;
          id?: string;
          ip?: unknown | null;
          not_after?: string | null;
          refreshed_at?: string | null;
          tag?: string | null;
          updated_at?: string | null;
          user_agent?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'sessions_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      sso_domains: {
        Row: {
          created_at: string | null;
          domain: string;
          id: string;
          sso_provider_id: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          domain: string;
          id: string;
          sso_provider_id: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          domain?: string;
          id?: string;
          sso_provider_id?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'sso_domains_sso_provider_id_fkey';
            columns: ['sso_provider_id'];
            isOneToOne: false;
            referencedRelation: 'sso_providers';
            referencedColumns: ['id'];
          }
        ];
      };
      sso_providers: {
        Row: {
          created_at: string | null;
          id: string;
          resource_id: string | null;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          id: string;
          resource_id?: string | null;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          resource_id?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      users: {
        Row: {
          aud: string | null;
          banned_until: string | null;
          confirmation_sent_at: string | null;
          confirmation_token: string | null;
          confirmed_at: string | null;
          created_at: string | null;
          deleted_at: string | null;
          email: string | null;
          email_change: string | null;
          email_change_confirm_status: number | null;
          email_change_sent_at: string | null;
          email_change_token_current: string | null;
          email_change_token_new: string | null;
          email_confirmed_at: string | null;
          encrypted_password: string | null;
          id: string;
          instance_id: string | null;
          invited_at: string | null;
          is_anonymous: boolean;
          is_sso_user: boolean;
          is_super_admin: boolean | null;
          last_sign_in_at: string | null;
          phone: string | null;
          phone_change: string | null;
          phone_change_sent_at: string | null;
          phone_change_token: string | null;
          phone_confirmed_at: string | null;
          raw_app_meta_data: Json | null;
          raw_user_meta_data: Json | null;
          reauthentication_sent_at: string | null;
          reauthentication_token: string | null;
          recovery_sent_at: string | null;
          recovery_token: string | null;
          role: string | null;
          updated_at: string | null;
        };
        Insert: {
          aud?: string | null;
          banned_until?: string | null;
          confirmation_sent_at?: string | null;
          confirmation_token?: string | null;
          confirmed_at?: string | null;
          created_at?: string | null;
          deleted_at?: string | null;
          email?: string | null;
          email_change?: string | null;
          email_change_confirm_status?: number | null;
          email_change_sent_at?: string | null;
          email_change_token_current?: string | null;
          email_change_token_new?: string | null;
          email_confirmed_at?: string | null;
          encrypted_password?: string | null;
          id: string;
          instance_id?: string | null;
          invited_at?: string | null;
          is_anonymous?: boolean;
          is_sso_user?: boolean;
          is_super_admin?: boolean | null;
          last_sign_in_at?: string | null;
          phone?: string | null;
          phone_change?: string | null;
          phone_change_sent_at?: string | null;
          phone_change_token?: string | null;
          phone_confirmed_at?: string | null;
          raw_app_meta_data?: Json | null;
          raw_user_meta_data?: Json | null;
          reauthentication_sent_at?: string | null;
          reauthentication_token?: string | null;
          recovery_sent_at?: string | null;
          recovery_token?: string | null;
          role?: string | null;
          updated_at?: string | null;
        };
        Update: {
          aud?: string | null;
          banned_until?: string | null;
          confirmation_sent_at?: string | null;
          confirmation_token?: string | null;
          confirmed_at?: string | null;
          created_at?: string | null;
          deleted_at?: string | null;
          email?: string | null;
          email_change?: string | null;
          email_change_confirm_status?: number | null;
          email_change_sent_at?: string | null;
          email_change_token_current?: string | null;
          email_change_token_new?: string | null;
          email_confirmed_at?: string | null;
          encrypted_password?: string | null;
          id?: string;
          instance_id?: string | null;
          invited_at?: string | null;
          is_anonymous?: boolean;
          is_sso_user?: boolean;
          is_super_admin?: boolean | null;
          last_sign_in_at?: string | null;
          phone?: string | null;
          phone_change?: string | null;
          phone_change_sent_at?: string | null;
          phone_change_token?: string | null;
          phone_confirmed_at?: string | null;
          raw_app_meta_data?: Json | null;
          raw_user_meta_data?: Json | null;
          reauthentication_sent_at?: string | null;
          reauthentication_token?: string | null;
          recovery_sent_at?: string | null;
          recovery_token?: string | null;
          role?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      email: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      jwt: {
        Args: Record<PropertyKey, never>;
        Returns: Json;
      };
      role: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      uid: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
    };
    Enums: {
      aal_level: 'aal1' | 'aal2' | 'aal3';
      code_challenge_method: 's256' | 'plain';
      factor_status: 'unverified' | 'verified';
      factor_type: 'totp' | 'webauthn' | 'phone';
      one_time_token_type:
        | 'confirmation_token'
        | 'reauthentication_token'
        | 'recovery_token'
        | 'email_change_token_new'
        | 'email_change_token_current'
        | 'phone_change_token';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      agitation: {
        Row: {
          agitation: number;
          file: string;
          raw: Json;
          time: string;
          valvo: string;
        };
        Insert: {
          agitation: number;
          file: string;
          raw: Json;
          time: string;
          valvo: string;
        };
        Update: {
          agitation?: number;
          file?: string;
          raw?: Json;
          time?: string;
          valvo?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'agitation_file_fkey';
            columns: ['file'];
            isOneToOne: false;
            referencedRelation: 'file';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'agitation_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'valvo';
            referencedColumns: ['id'];
          }
        ];
      };
      city: {
        Row: {
          created_at: string;
          id: string;
          location: unknown;
          name: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          location: unknown;
          name: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          location?: unknown;
          name?: string;
        };
        Relationships: [];
      };
      file: {
        Row: {
          created_at: string;
          data_type: Database['public']['Enums']['DataType'];
          errors: Json | null;
          filepath: string;
          folder_date: string | null;
          id: string;
          last_digested_at: string | null;
          source: string;
        };
        Insert: {
          created_at?: string;
          data_type: Database['public']['Enums']['DataType'];
          errors?: Json | null;
          filepath: string;
          folder_date?: string | null;
          id?: string;
          last_digested_at?: string | null;
          source: string;
        };
        Update: {
          created_at?: string;
          data_type?: Database['public']['Enums']['DataType'];
          errors?: Json | null;
          filepath?: string;
          folder_date?: string | null;
          id?: string;
          last_digested_at?: string | null;
          source?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'file_source_fkey';
            columns: ['source'];
            isOneToOne: false;
            referencedRelation: 'source';
            referencedColumns: ['id'];
          }
        ];
      };
      ftp: {
        Row: {
          created_at: string;
          host: string;
          id: string;
          port: number;
          private_key: string;
          user: string;
        };
        Insert: {
          created_at?: string;
          host: string;
          id?: string;
          port: number;
          private_key: string;
          user: string;
        };
        Update: {
          created_at?: string;
          host?: string;
          id?: string;
          port?: number;
          private_key?: string;
          user?: string;
        };
        Relationships: [];
      };
      growth: {
        Row: {
          file: string;
          growth: number;
          raw: Json;
          time: string;
          valvo: string;
        };
        Insert: {
          file: string;
          growth: number;
          raw: Json;
          time: string;
          valvo: string;
        };
        Update: {
          file?: string;
          growth?: number;
          raw?: Json;
          time?: string;
          valvo?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'growth_file_fkey';
            columns: ['file'];
            isOneToOne: false;
            referencedRelation: 'file';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'growth_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'valvo';
            referencedColumns: ['id'];
          }
        ];
      };
      job: {
        Row: {
          created_at: string;
          error: Json | null;
          id: number;
          job_id: string;
          job_type: string;
          result: Json | null;
          success: boolean;
        };
        Insert: {
          created_at?: string;
          error?: Json | null;
          id?: number;
          job_id: string;
          job_type: string;
          result?: Json | null;
          success: boolean;
        };
        Update: {
          created_at?: string;
          error?: Json | null;
          id?: number;
          job_id?: string;
          job_type?: string;
          result?: Json | null;
          success?: boolean;
        };
        Relationships: [];
      };
      max_amplitude: {
        Row: {
          file: string;
          max_amplitude: number;
          raw: Json;
          time: string;
          valvo: string;
        };
        Insert: {
          file: string;
          max_amplitude: number;
          raw: Json;
          time: string;
          valvo: string;
        };
        Update: {
          file?: string;
          max_amplitude?: number;
          raw?: Json;
          time?: string;
          valvo?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'max_amplitude_file_fkey';
            columns: ['file'];
            isOneToOne: false;
            referencedRelation: 'file';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'max_amplitude_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'valvo';
            referencedColumns: ['id'];
          }
        ];
      };
      mortality: {
        Row: {
          file: string;
          oyster_id: number;
          raw: Json;
          time: string;
          valvo: string;
        };
        Insert: {
          file: string;
          oyster_id: number;
          raw: Json;
          time: string;
          valvo: string;
        };
        Update: {
          file?: string;
          oyster_id?: number;
          raw?: Json;
          time?: string;
          valvo?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'mortality_file_fkey';
            columns: ['file'];
            isOneToOne: false;
            referencedRelation: 'file';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'mortality_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'valvo';
            referencedColumns: ['id'];
          }
        ];
      };
      rhythm: {
        Row: {
          file: string;
          night_and_day: number;
          raw: Json;
          tidal: number;
          time: string;
          valvo: string;
        };
        Insert: {
          file: string;
          night_and_day: number;
          raw: Json;
          tidal: number;
          time: string;
          valvo: string;
        };
        Update: {
          file?: string;
          night_and_day?: number;
          raw?: Json;
          tidal?: number;
          time?: string;
          valvo?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'rhythm_file_fkey';
            columns: ['file'];
            isOneToOne: false;
            referencedRelation: 'file';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'rhythm_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'valvo';
            referencedColumns: ['id'];
          }
        ];
      };
      site: {
        Row: {
          created_at: string;
          id: string;
          slug: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          slug: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          slug?: string;
        };
        Relationships: [];
      };
      site_valvo: {
        Row: {
          created_at: string;
          site: string;
          valvo: string;
        };
        Insert: {
          created_at?: string;
          site: string;
          valvo: string;
        };
        Update: {
          created_at?: string;
          site?: string;
          valvo?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'site_valvo_site_fkey';
            columns: ['site'];
            isOneToOne: false;
            referencedRelation: 'site';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'site_valvo_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'valvo';
            referencedColumns: ['id'];
          }
        ];
      };
      source: {
        Row: {
          agitation_path: string;
          created_at: string;
          ftp: string | null;
          growth_path: string;
          id: string;
          max_amplitude_path: string;
          mortality_path: string;
          rhythm_path: string;
          root_path: string;
          spawning_path: string;
          valve_closing_duration_path: string;
          valve_opening_amplitude_path: string;
          valvo: string;
          water_temperature_path: string;
        };
        Insert: {
          agitation_path?: string;
          created_at?: string;
          ftp?: string | null;
          growth_path?: string;
          id?: string;
          max_amplitude_path?: string;
          mortality_path?: string;
          rhythm_path?: string;
          root_path: string;
          spawning_path?: string;
          valve_closing_duration_path?: string;
          valve_opening_amplitude_path?: string;
          valvo: string;
          water_temperature_path?: string;
        };
        Update: {
          agitation_path?: string;
          created_at?: string;
          ftp?: string | null;
          growth_path?: string;
          id?: string;
          max_amplitude_path?: string;
          mortality_path?: string;
          rhythm_path?: string;
          root_path?: string;
          spawning_path?: string;
          valve_closing_duration_path?: string;
          valve_opening_amplitude_path?: string;
          valvo?: string;
          water_temperature_path?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'source_ftp_fkey';
            columns: ['ftp'];
            isOneToOne: false;
            referencedRelation: 'ftp';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'source_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'valvo';
            referencedColumns: ['id'];
          }
        ];
      };
      spawning: {
        Row: {
          file: string;
          raw: Json;
          spawn: number;
          time: string;
          valvo: string;
        };
        Insert: {
          file: string;
          raw: Json;
          spawn: number;
          time: string;
          valvo: string;
        };
        Update: {
          file?: string;
          raw?: Json;
          spawn?: number;
          time?: string;
          valvo?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'spawning_file_fkey';
            columns: ['file'];
            isOneToOne: false;
            referencedRelation: 'file';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'spawning_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'valvo';
            referencedColumns: ['id'];
          }
        ];
      };
      user: {
        Row: {
          email: string;
          id: string;
          role: Database['public']['Enums']['UserRole'];
        };
        Insert: {
          email: string;
          id: string;
          role?: Database['public']['Enums']['UserRole'];
        };
        Update: {
          email?: string;
          id?: string;
          role?: Database['public']['Enums']['UserRole'];
        };
        Relationships: [];
      };
      user_site: {
        Row: {
          created_at: string;
          site: string;
          user: string;
        };
        Insert: {
          created_at?: string;
          site: string;
          user: string;
        };
        Update: {
          created_at?: string;
          site?: string;
          user?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'user_site_site_fkey';
            columns: ['site'];
            isOneToOne: false;
            referencedRelation: 'site';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'user_site_user_fkey';
            columns: ['user'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          }
        ];
      };
      valve_closing_duration: {
        Row: {
          closure_duration: number;
          file: string;
          raw: Json;
          time: string;
          valvo: string;
          vcd_se: number | null;
        };
        Insert: {
          closure_duration: number;
          file: string;
          raw: Json;
          time: string;
          valvo: string;
          vcd_se?: number | null;
        };
        Update: {
          closure_duration?: number;
          file?: string;
          raw?: Json;
          time?: string;
          valvo?: string;
          vcd_se?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'valve_closing_duration_file_fkey';
            columns: ['file'];
            isOneToOne: false;
            referencedRelation: 'file';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'valve_closing_duration_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'valvo';
            referencedColumns: ['id'];
          }
        ];
      };
      valve_opening_amplitude: {
        Row: {
          amplitude: number;
          file: string;
          raw: Json;
          time: string;
          valvo: string;
          voa_se: number | null;
        };
        Insert: {
          amplitude: number;
          file: string;
          raw: Json;
          time: string;
          valvo: string;
          voa_se?: number | null;
        };
        Update: {
          amplitude?: number;
          file?: string;
          raw?: Json;
          time?: string;
          valvo?: string;
          voa_se?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'valve_opening_amplitude_file_fkey';
            columns: ['file'];
            isOneToOne: false;
            referencedRelation: 'file';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'valve_opening_amplitude_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'valvo';
            referencedColumns: ['id'];
          }
        ];
      };
      valvo: {
        Row: {
          city: string | null;
          code: string | null;
          created_at: string;
          description: string | null;
          id: string;
          location: unknown | null;
          name: string;
          public: boolean;
        };
        Insert: {
          city?: string | null;
          code?: string | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          location?: unknown | null;
          name?: string;
          public?: boolean;
        };
        Update: {
          city?: string | null;
          code?: string | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          location?: unknown | null;
          name?: string;
          public?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: 'valvo_city_fkey';
            columns: ['city'];
            isOneToOne: false;
            referencedRelation: 'city';
            referencedColumns: ['id'];
          }
        ];
      };
      valvo_config: {
        Row: {
          created_at: string;
          id: string;
          type: Database['public']['Enums']['ValvoConfigType'];
          value: number;
          valvo: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          type: Database['public']['Enums']['ValvoConfigType'];
          value: number;
          valvo: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          type?: Database['public']['Enums']['ValvoConfigType'];
          value?: number;
          valvo?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'valvo_config_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'valvo';
            referencedColumns: ['id'];
          }
        ];
      };
      valvo_image: {
        Row: {
          created_at: string;
          description: string;
          id: string;
          image_bucket: string;
          image_path: string;
          sort: number | null;
          valvo: string;
        };
        Insert: {
          created_at?: string;
          description: string;
          id?: string;
          image_bucket: string;
          image_path: string;
          sort?: number | null;
          valvo: string;
        };
        Update: {
          created_at?: string;
          description?: string;
          id?: string;
          image_bucket?: string;
          image_path?: string;
          sort?: number | null;
          valvo?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'valvo_image_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'valvo';
            referencedColumns: ['id'];
          }
        ];
      };
      water_temperature: {
        Row: {
          file: string;
          time: string;
          valvo: string;
          water_temperature: number;
        };
        Insert: {
          file: string;
          time: string;
          valvo: string;
          water_temperature: number;
        };
        Update: {
          file?: string;
          time?: string;
          valvo?: string;
          water_temperature?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'public_water_temperature_file_fkey';
            columns: ['file'];
            isOneToOne: false;
            referencedRelation: 'file';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'public_water_temperature_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'valvo';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Views: {
      valvo_geography: {
        Row: {
          feature: Json | null;
          geometry: Json | null;
          id: string | null;
          latitude: number | null;
          location: unknown | null;
          longitude: number | null;
        };
        Relationships: [];
      };
      water_temperature_view: {
        Row: {
          day: string | null;
          valvo_id: string | null;
          water_temperature_max: number | null;
          water_temperature_min: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'public_water_temperature_valvo_fkey';
            columns: ['valvo_id'];
            isOneToOne: false;
            referencedRelation: 'valvo';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Functions: {
      can_read_valvo: {
        Args: {
          id: string;
          valvo_id: string;
        };
        Returns: boolean;
      };
      count_agitation_during_opening_exceedences: {
        Args: {
          p_valvo_id: string;
          p_date: string;
          p_period_of_time: number;
          p_threshold: number;
        };
        Returns: number;
      };
      count_agitation_exceedences: {
        Args: {
          p_valvo_id: string;
          p_date: string;
          p_period_of_time: number;
          p_threshold: number;
        };
        Returns: number;
      };
      get_agitation_config: {
        Args: {
          p_valvo_id: string;
          p_override_config?: Json;
        };
        Returns: Json;
      };
      get_agitation_during_opening_config: {
        Args: {
          p_valvo_id: string;
          p_override_config?: Json;
        };
        Returns: Json;
      };
      get_agitation_during_opening_in_date_range: {
        Args: {
          p_valvo_id: string;
          p_start_date: string;
          p_end_date: string;
        };
        Returns: {
          valvo: string;
          timestamp_value: string;
          agitation_during_opening: number;
          agitation: number;
          amplitude: number;
          agitation_raw: Json;
          amplitude_raw: Json;
          agitation_file: string;
          amplitude_file: string;
        }[];
      };
      get_agitation_during_opening_period_indicator: {
        Args: {
          p_start_date: string;
          p_period_of_time: number;
          p_valvo_id: string;
          p_config?: Json;
        };
        Returns: {
          day: string;
          value: number;
          indicator: number;
          config: Json;
          details: Json;
        }[];
      };
      get_agitation_during_opening_values: {
        Args: {
          p_valvo_id: string;
          p_date: string;
          p_period_of_time: number;
        };
        Returns: {
          agitation_during_opening_date: string;
          max_agitation_during_opening: number;
          agitation_during_opening_details: Json;
        }[];
      };
      get_agitation_in_date_range: {
        Args: {
          p_valvo_id: string;
          p_start_date: string;
          p_end_date: string;
        };
        Returns: {
          valvo: string;
          timestamp_value: string;
          agitation: number;
          raw: Json;
          file: string;
        }[];
      };
      get_agitation_indicator: {
        Args: {
          p_start_date: string;
          p_period_of_time: number;
          p_valvo_id: string;
          p_config?: Json;
        };
        Returns: {
          day: string;
          value: number;
          indicator: number;
          config: Json;
          details: Json;
        }[];
      };
      get_agitation_values: {
        Args: {
          p_valvo_id: string;
          p_date: string;
          p_period_of_time: number;
        };
        Returns: {
          agitation_date: string;
          max_agitation: number;
          agitation_details: Json;
        }[];
      };
      get_all_user_accessible_valvo: {
        Args: Record<PropertyKey, never>;
        Returns: {
          id: string;
        }[];
      };
      get_city_geography: {
        Args: Record<PropertyKey, never>;
        Returns: {
          id: string;
          name: string;
          location: unknown;
          longitude: number;
          latitude: number;
          geometry: Json;
          feature: Json;
        }[];
      };
      get_config_with_priority: {
        Args: {
          p_valvo_id: string;
          p_config_schema: Json;
          p_override_config?: Json;
        };
        Returns: Json;
      };
      get_current_general_indicator: {
        Args: {
          valvo_id: string;
        };
        Returns: Json;
      };
      get_general_config: {
        Args: {
          p_valvo_id: string;
          p_override_config?: Json;
        };
        Returns: Json;
      };
      get_general_indicator: {
        Args: {
          start_date: string;
          period_of_time: number;
          valvo_id: string;
          p_config?: Json;
        };
        Returns: Database['public']['CompositeTypes']['general_indicator'][];
      };
      get_general_indicator_light: {
        Args: {
          start_date: string;
          period_of_time: number;
          valvo_id: string;
        };
        Returns: Database['public']['CompositeTypes']['general_indicator_light'][];
      };
      get_growth_config: {
        Args: {
          p_valvo_id: string;
          p_override_config?: Json;
        };
        Returns: Json;
      };
      get_growth_indicator: {
        Args: {
          p_start_date: string;
          p_period_of_time: number;
          p_valvo_id: string;
          p_config?: Json;
        };
        Returns: {
          day: string;
          value: number;
          indicator: number;
          config: Json;
          details: Json;
        }[];
      };
      get_growth_values: {
        Args: {
          p_valvo_id: string;
          p_date: string;
          p_period_of_time: number;
          p_max_value_threshold: number;
        };
        Returns: {
          growth_date: string;
          growth_count: number;
          growth_details: Json;
        }[];
      };
      get_max_amplitude_config: {
        Args: {
          p_valvo_id: string;
          p_override_config?: Json;
        };
        Returns: Json;
      };
      get_max_amplitude_indicator: {
        Args: {
          p_start_date: string;
          p_period_of_time: number;
          p_valvo_id: string;
          p_config?: Json;
        };
        Returns: {
          day: string;
          value: number;
          indicator: number;
          config: Json;
          details: Json;
        }[];
      };
      get_max_amplitude_values: {
        Args: {
          p_valvo_id: string;
          p_date: string;
          p_period_of_time: number;
          p_min_value_threshold: number;
        };
        Returns: {
          max_amplitude_date: string;
          max_amplitude_count: number;
          max_amplitude_details: Json;
        }[];
      };
      get_mortality_config: {
        Args: {
          p_valvo_id: string;
          p_override_config?: Json;
        };
        Returns: Json;
      };
      get_mortality_indicator: {
        Args: {
          p_start_date: string;
          p_period_of_time: number;
          p_valvo_id: string;
          p_config?: Json;
        };
        Returns: {
          day: string;
          value: number;
          indicator: number;
          config: Json;
          details: Json;
        }[];
      };
      get_mortality_values: {
        Args: {
          p_valvo_id: string;
          p_date: string;
          p_period_of_time: number;
        };
        Returns: {
          mortality_date: string;
          mortality_count: number;
          mortality_details: Json;
        }[];
      };
      get_night_and_day_rhythm_config: {
        Args: {
          p_valvo_id: string;
          p_override_config?: Json;
        };
        Returns: Json;
      };
      get_night_and_day_rhythm_indicator: {
        Args: {
          p_start_date: string;
          p_period_of_time: number;
          p_valvo_id: string;
          p_config?: Json;
        };
        Returns: {
          day: string;
          value: number;
          indicator: number;
          config: Json;
          details: Json;
        }[];
      };
      get_night_and_day_rhythm_values: {
        Args: {
          p_valvo_id: string;
          p_date: string;
          p_period_of_time: number;
        };
        Returns: {
          rhythm_date: string;
          rhythm_value: number;
          rhythm_details: Json;
        }[];
      };
      get_spawning_config: {
        Args: {
          p_valvo_id: string;
          p_override_config?: Json;
        };
        Returns: Json;
      };
      get_spawning_indicator: {
        Args: {
          p_start_date: string;
          p_period_of_time: number;
          p_valvo_id: string;
          p_config?: Json;
        };
        Returns: {
          day: string;
          value: number;
          indicator: number;
          config: Json;
          details: Json;
        }[];
      };
      get_spawning_values: {
        Args: {
          p_valvo_id: string;
          p_date: string;
          p_period_of_time: number;
        };
        Returns: {
          spawn_date: string;
          spawn_sum: number;
          spawn_details: Json;
        }[];
      };
      get_tidal_rhythm_config: {
        Args: {
          p_valvo_id: string;
          p_override_config?: Json;
        };
        Returns: Json;
      };
      get_tidal_rhythm_indicator: {
        Args: {
          p_start_date: string;
          p_period_of_time: number;
          p_valvo_id: string;
          p_config?: Json;
        };
        Returns: {
          day: string;
          value: number;
          indicator: number;
          config: Json;
          details: Json;
        }[];
      };
      get_tidal_rhythm_values: {
        Args: {
          p_valvo_id: string;
          p_date: string;
          p_period_of_time: number;
        };
        Returns: {
          rhythm_date: string;
          rhythm_value: number;
          rhythm_details: Json;
        }[];
      };
      get_valve_closing_duration_config: {
        Args: {
          p_valvo_id: string;
          p_override_config?: Json;
        };
        Returns: Json;
      };
      get_valve_closing_duration_indicator: {
        Args: {
          p_start_date: string;
          p_period_of_time: number;
          p_valvo_id: string;
          p_config?: Json;
        };
        Returns: {
          day: string;
          value: number;
          indicator: number;
          config: Json;
          details: Json;
        }[];
      };
      get_valve_closing_duration_values: {
        Args: {
          p_valvo_id: string;
          p_date: string;
          p_period_of_time: number;
        };
        Returns: {
          vcd_date: string;
          vcd_avg: number;
          vcd_details: Json;
        }[];
      };
      get_valve_opening_amplitude_config: {
        Args: {
          p_valvo_id: string;
          p_override_config?: Json;
        };
        Returns: Json;
      };
      get_valve_opening_amplitude_indicator: {
        Args: {
          p_start_date: string;
          p_period_of_time: number;
          p_valvo_id: string;
          p_config?: Json;
        };
        Returns: {
          day: string;
          value: number;
          indicator: number;
          config: Json;
          details: Json;
        }[];
      };
      get_valve_opening_amplitude_values: {
        Args: {
          p_valvo_id: string;
          p_date: string;
          p_period_of_time: number;
        };
        Returns: {
          amplitude_date: string;
          amplitude_value: number;
          amplitude_details: Json;
        }[];
      };
      get_valvo_config_value: {
        Args: {
          p_valvo: string;
          p_type: Database['public']['Enums']['ValvoConfigType'];
          p_default_value: number;
        };
        Returns: number;
      };
      get_valvo_feature_collection: {
        Args: Record<PropertyKey, never>;
        Returns: Json;
      };
      get_valvo_geography: {
        Args: Record<PropertyKey, never>;
        Returns: {
          id: string;
          location: unknown;
          longitude: number;
          latitude: number;
          geometry: Json;
          feature: Json;
        }[];
      };
      get_water_temperature_view: {
        Args: {
          p_start_date: string;
          p_period_of_time: number;
          p_valvo_id: string;
        };
        Returns: {
          day: string;
          water_temperature_min: number;
          water_temperature_max: number;
        }[];
      };
      is_admin: {
        Args: {
          id: string;
        };
        Returns: boolean;
      };
      is_public_valvo: {
        Args: {
          valvo_id: string;
        };
        Returns: boolean;
      };
      read_secret: {
        Args: {
          secret_name: string;
        };
        Returns: string;
      };
      transform_value_to_indicator: {
        Args: {
          p_value: number;
          p_red_threshold: number;
          p_orange_threshold: number;
          p_yellow_threshold: number;
          p_green_threshold: number;
          p_blue_threshold: number;
        };
        Returns: number;
      };
      webhook_api: {
        Args: {
          arg_method: string;
          arg_path: string;
          arg_old_record?: Json;
          arg_record?: Json;
          arg_type?: string;
          arg_table?: string;
          arg_schema?: string;
        };
        Returns: number;
      };
      webhook_search_file: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
    };
    Enums: {
      DataType:
        | 'mortality'
        | 'agitation'
        | 'valve_opening_amplitude'
        | 'valve_closing_duration'
        | 'rhythm'
        | 'growth'
        | 'max_amplitude'
        | 'spawning'
        | 'water_temperature';
      UserRole: 'admin' | 'user';
      ValvoConfigType:
        | 'MORTALITY_PERIODE_OF_TIME'
        | 'MORTALITY_THRESHOLD_GREEN'
        | 'MORTALITY_THRESHOLD_YELLOW'
        | 'MORTALITY_THRESHOLD_ORANGE'
        | 'MORTALITY_THRESHOLD_RED'
        | 'FEED_CONSUMPTION_PERIODE_OF_TIME'
        | 'FEED_CONSUMPTION_THRESHOLD_GREEN'
        | 'FEED_CONSUMPTION_THRESHOLD_YELLOW'
        | 'FEED_CONSUMPTION_THRESHOLD_ORANGE'
        | 'FEED_CONSUMPTION_THRESHOLD_RED'
        | 'GROWTH_RATE_PERIODE_OF_TIME'
        | 'GROWTH_RATE_THRESHOLD_GREEN'
        | 'GROWTH_RATE_THRESHOLD_YELLOW'
        | 'GROWTH_RATE_THRESHOLD_ORANGE'
        | 'GROWTH_RATE_THRESHOLD_RED'
        | 'WATER_QUALITY_PERIODE_OF_TIME'
        | 'WATER_QUALITY_THRESHOLD_GREEN'
        | 'WATER_QUALITY_THRESHOLD_YELLOW'
        | 'WATER_QUALITY_THRESHOLD_ORANGE'
        | 'WATER_QUALITY_THRESHOLD_RED'
        | 'TEMPERATURE_PERIODE_OF_TIME'
        | 'TEMPERATURE_THRESHOLD_GREEN'
        | 'TEMPERATURE_THRESHOLD_YELLOW'
        | 'TEMPERATURE_THRESHOLD_ORANGE'
        | 'TEMPERATURE_THRESHOLD_RED'
        | 'OXYGEN_PERIODE_OF_TIME'
        | 'OXYGEN_THRESHOLD_GREEN'
        | 'OXYGEN_THRESHOLD_YELLOW'
        | 'OXYGEN_THRESHOLD_ORANGE'
        | 'OXYGEN_THRESHOLD_RED'
        | 'DISEASE_PERIODE_OF_TIME'
        | 'DISEASE_THRESHOLD_GREEN'
        | 'DISEASE_THRESHOLD_YELLOW'
        | 'DISEASE_THRESHOLD_ORANGE'
        | 'DISEASE_THRESHOLD_RED'
        | 'DEFAULT_DATE_RANGE'
        | 'DATA_REFRESH_INTERVAL'
        | 'ALERT_NOTIFICATION_DELAY';
    };
    CompositeTypes: {
      general_indicator: {
        day: string | null;
        general_indicator: number | null;
        general_value: number | null;
        general: Json | null;
        mortality: Json | null;
        agitation: Json | null;
        agitation_during_opening_period: Json | null;
        valve_closing_duration: Json | null;
        valve_opening_amplitude: Json | null;
        night_and_day_rhythm: Json | null;
        tidal_rhythm: Json | null;
        growth: Json | null;
        max_amplitude: Json | null;
        spawning: Json | null;
      };
      general_indicator_light: {
        day: string | null;
        general_indicator: number | null;
        general_value: number | null;
      };
    };
  };
  realtime: {
    Tables: {
      messages: {
        Row: {
          event: string | null;
          extension: string;
          id: string;
          inserted_at: string;
          payload: Json | null;
          private: boolean | null;
          topic: string;
          updated_at: string;
        };
        Insert: {
          event?: string | null;
          extension: string;
          id?: string;
          inserted_at?: string;
          payload?: Json | null;
          private?: boolean | null;
          topic: string;
          updated_at?: string;
        };
        Update: {
          event?: string | null;
          extension?: string;
          id?: string;
          inserted_at?: string;
          payload?: Json | null;
          private?: boolean | null;
          topic?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      schema_migrations: {
        Row: {
          inserted_at: string | null;
          version: number;
        };
        Insert: {
          inserted_at?: string | null;
          version: number;
        };
        Update: {
          inserted_at?: string | null;
          version?: number;
        };
        Relationships: [];
      };
      subscription: {
        Row: {
          claims: Json;
          claims_role: unknown;
          created_at: string;
          entity: unknown;
          filters: Database['realtime']['CompositeTypes']['user_defined_filter'][];
          id: number;
          subscription_id: string;
        };
        Insert: {
          claims: Json;
          claims_role?: unknown;
          created_at?: string;
          entity: unknown;
          filters?: Database['realtime']['CompositeTypes']['user_defined_filter'][];
          id?: never;
          subscription_id: string;
        };
        Update: {
          claims?: Json;
          claims_role?: unknown;
          created_at?: string;
          entity?: unknown;
          filters?: Database['realtime']['CompositeTypes']['user_defined_filter'][];
          id?: never;
          subscription_id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      apply_rls: {
        Args: {
          wal: Json;
          max_record_bytes?: number;
        };
        Returns: Database['realtime']['CompositeTypes']['wal_rls'][];
      };
      broadcast_changes: {
        Args: {
          topic_name: string;
          event_name: string;
          operation: string;
          table_name: string;
          table_schema: string;
          new: Record<string, unknown>;
          old: Record<string, unknown>;
          level?: string;
        };
        Returns: undefined;
      };
      build_prepared_statement_sql: {
        Args: {
          prepared_statement_name: string;
          entity: unknown;
          columns: Database['realtime']['CompositeTypes']['wal_column'][];
        };
        Returns: string;
      };
      cast: {
        Args: {
          val: string;
          type_: unknown;
        };
        Returns: Json;
      };
      check_equality_op: {
        Args: {
          op: Database['realtime']['Enums']['equality_op'];
          type_: unknown;
          val_1: string;
          val_2: string;
        };
        Returns: boolean;
      };
      is_visible_through_filters: {
        Args: {
          columns: Database['realtime']['CompositeTypes']['wal_column'][];
          filters: Database['realtime']['CompositeTypes']['user_defined_filter'][];
        };
        Returns: boolean;
      };
      list_changes: {
        Args: {
          publication: unknown;
          slot_name: unknown;
          max_changes: number;
          max_record_bytes: number;
        };
        Returns: Database['realtime']['CompositeTypes']['wal_rls'][];
      };
      quote_wal2json: {
        Args: {
          entity: unknown;
        };
        Returns: string;
      };
      send: {
        Args: {
          payload: Json;
          event: string;
          topic: string;
          private?: boolean;
        };
        Returns: undefined;
      };
      to_regrole: {
        Args: {
          role_name: string;
        };
        Returns: unknown;
      };
      topic: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
    };
    Enums: {
      action: 'INSERT' | 'UPDATE' | 'DELETE' | 'TRUNCATE' | 'ERROR';
      equality_op: 'eq' | 'neq' | 'lt' | 'lte' | 'gt' | 'gte' | 'in';
    };
    CompositeTypes: {
      user_defined_filter: {
        column_name: string | null;
        op: Database['realtime']['Enums']['equality_op'] | null;
        value: string | null;
      };
      wal_column: {
        name: string | null;
        type_name: string | null;
        type_oid: unknown | null;
        value: Json | null;
        is_pkey: boolean | null;
        is_selectable: boolean | null;
      };
      wal_rls: {
        wal: Json | null;
        is_rls_enabled: boolean | null;
        subscription_ids: string[] | null;
        errors: string[] | null;
      };
    };
  };
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null;
          avif_autodetection: boolean | null;
          created_at: string | null;
          file_size_limit: number | null;
          id: string;
          name: string;
          owner: string | null;
          owner_id: string | null;
          public: boolean | null;
          updated_at: string | null;
        };
        Insert: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id: string;
          name: string;
          owner?: string | null;
          owner_id?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Update: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id?: string;
          name?: string;
          owner?: string | null;
          owner_id?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      migrations: {
        Row: {
          executed_at: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Insert: {
          executed_at?: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Update: {
          executed_at?: string | null;
          hash?: string;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      objects: {
        Row: {
          bucket_id: string | null;
          created_at: string | null;
          id: string;
          last_accessed_at: string | null;
          level: number | null;
          metadata: Json | null;
          name: string | null;
          owner: string | null;
          owner_id: string | null;
          path_tokens: string[] | null;
          updated_at: string | null;
          user_metadata: Json | null;
          version: string | null;
        };
        Insert: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          level?: number | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          owner_id?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          user_metadata?: Json | null;
          version?: string | null;
        };
        Update: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          level?: number | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          owner_id?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          user_metadata?: Json | null;
          version?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'objects_bucketId_fkey';
            columns: ['bucket_id'];
            isOneToOne: false;
            referencedRelation: 'buckets';
            referencedColumns: ['id'];
          }
        ];
      };
      prefixes: {
        Row: {
          bucket_id: string;
          created_at: string | null;
          level: number;
          name: string;
          updated_at: string | null;
        };
        Insert: {
          bucket_id: string;
          created_at?: string | null;
          level?: number;
          name: string;
          updated_at?: string | null;
        };
        Update: {
          bucket_id?: string;
          created_at?: string | null;
          level?: number;
          name?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'prefixes_bucketId_fkey';
            columns: ['bucket_id'];
            isOneToOne: false;
            referencedRelation: 'buckets';
            referencedColumns: ['id'];
          }
        ];
      };
      s3_multipart_uploads: {
        Row: {
          bucket_id: string;
          created_at: string;
          id: string;
          in_progress_size: number;
          key: string;
          owner_id: string | null;
          upload_signature: string;
          user_metadata: Json | null;
          version: string;
        };
        Insert: {
          bucket_id: string;
          created_at?: string;
          id: string;
          in_progress_size?: number;
          key: string;
          owner_id?: string | null;
          upload_signature: string;
          user_metadata?: Json | null;
          version: string;
        };
        Update: {
          bucket_id?: string;
          created_at?: string;
          id?: string;
          in_progress_size?: number;
          key?: string;
          owner_id?: string | null;
          upload_signature?: string;
          user_metadata?: Json | null;
          version?: string;
        };
        Relationships: [
          {
            foreignKeyName: 's3_multipart_uploads_bucket_id_fkey';
            columns: ['bucket_id'];
            isOneToOne: false;
            referencedRelation: 'buckets';
            referencedColumns: ['id'];
          }
        ];
      };
      s3_multipart_uploads_parts: {
        Row: {
          bucket_id: string;
          created_at: string;
          etag: string;
          id: string;
          key: string;
          owner_id: string | null;
          part_number: number;
          size: number;
          upload_id: string;
          version: string;
        };
        Insert: {
          bucket_id: string;
          created_at?: string;
          etag: string;
          id?: string;
          key: string;
          owner_id?: string | null;
          part_number: number;
          size?: number;
          upload_id: string;
          version: string;
        };
        Update: {
          bucket_id?: string;
          created_at?: string;
          etag?: string;
          id?: string;
          key?: string;
          owner_id?: string | null;
          part_number?: number;
          size?: number;
          upload_id?: string;
          version?: string;
        };
        Relationships: [
          {
            foreignKeyName: 's3_multipart_uploads_parts_bucket_id_fkey';
            columns: ['bucket_id'];
            isOneToOne: false;
            referencedRelation: 'buckets';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 's3_multipart_uploads_parts_upload_id_fkey';
            columns: ['upload_id'];
            isOneToOne: false;
            referencedRelation: 's3_multipart_uploads';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      add_prefixes: {
        Args: {
          _bucket_id: string;
          _name: string;
        };
        Returns: undefined;
      };
      can_insert_object: {
        Args: {
          bucketid: string;
          name: string;
          owner: string;
          metadata: Json;
        };
        Returns: undefined;
      };
      delete_prefix: {
        Args: {
          _bucket_id: string;
          _name: string;
        };
        Returns: boolean;
      };
      extension: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      filename: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      foldername: {
        Args: {
          name: string;
        };
        Returns: string[];
      };
      get_level: {
        Args: {
          name: string;
        };
        Returns: number;
      };
      get_prefix: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      get_prefixes: {
        Args: {
          name: string;
        };
        Returns: string[];
      };
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>;
        Returns: {
          size: number;
          bucket_id: string;
        }[];
      };
      list_multipart_uploads_with_delimiter: {
        Args: {
          bucket_id: string;
          prefix_param: string;
          delimiter_param: string;
          max_keys?: number;
          next_key_token?: string;
          next_upload_token?: string;
        };
        Returns: {
          key: string;
          id: string;
          created_at: string;
        }[];
      };
      list_objects_with_delimiter: {
        Args: {
          bucket_id: string;
          prefix_param: string;
          delimiter_param: string;
          max_keys?: number;
          start_after?: string;
          next_token?: string;
        };
        Returns: {
          name: string;
          id: string;
          metadata: Json;
          updated_at: string;
        }[];
      };
      operation: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      search: {
        Args: {
          prefix: string;
          bucketname: string;
          limits?: number;
          levels?: number;
          offsets?: number;
          search?: string;
          sortcolumn?: string;
          sortorder?: string;
        };
        Returns: {
          name: string;
          id: string;
          updated_at: string;
          created_at: string;
          last_accessed_at: string;
          metadata: Json;
        }[];
      };
      search_legacy_v1: {
        Args: {
          prefix: string;
          bucketname: string;
          limits?: number;
          levels?: number;
          offsets?: number;
          search?: string;
          sortcolumn?: string;
          sortorder?: string;
        };
        Returns: {
          name: string;
          id: string;
          updated_at: string;
          created_at: string;
          last_accessed_at: string;
          metadata: Json;
        }[];
      };
      search_v1_optimised: {
        Args: {
          prefix: string;
          bucketname: string;
          limits?: number;
          levels?: number;
          offsets?: number;
          search?: string;
          sortcolumn?: string;
          sortorder?: string;
        };
        Returns: {
          name: string;
          id: string;
          updated_at: string;
          created_at: string;
          last_accessed_at: string;
          metadata: Json;
        }[];
      };
      search_v2: {
        Args: {
          prefix: string;
          bucket_name: string;
          limits?: number;
          levels?: number;
          start_after?: string;
        };
        Returns: {
          key: string;
          name: string;
          id: string;
          updated_at: string;
          created_at: string;
          metadata: Json;
        }[];
      };
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
