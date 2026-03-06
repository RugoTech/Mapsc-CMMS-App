export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      areas: {
        Row: {
          code: string
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          name: string
          tenant_id: string
          updated_at: string
          zone_id: string
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          tenant_id: string
          updated_at?: string
          zone_id: string
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          tenant_id?: string
          updated_at?: string
          zone_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "areas_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenant_stats"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "areas_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "areas_zone_id_fkey"
            columns: ["zone_id"]
            isOneToOne: false
            referencedRelation: "zones"
            referencedColumns: ["id"]
          },
        ]
      }
      assets: {
        Row: {
          area_id: string | null
          asset_type: string
          code: string
          cost: number | null
          created_at: string
          created_by: string | null
          custodian_id: string | null
          id: string
          is_active: boolean
          manufacturer: string | null
          model: string | null
          name: string
          plant_id: string
          purchase_date: string | null
          serial_number: string | null
          status: string
          tenant_id: string
          under_warranty: boolean | null
          updated_at: string
          warranty_expiry_date: string | null
          zone_id: string
        }
        Insert: {
          area_id?: string | null
          asset_type: string
          code: string
          cost?: number | null
          created_at?: string
          created_by?: string | null
          custodian_id?: string | null
          id?: string
          is_active?: boolean
          manufacturer?: string | null
          model?: string | null
          name: string
          plant_id: string
          purchase_date?: string | null
          serial_number?: string | null
          status?: string
          tenant_id: string
          under_warranty?: boolean | null
          updated_at?: string
          warranty_expiry_date?: string | null
          zone_id: string
        }
        Update: {
          area_id?: string | null
          asset_type?: string
          code?: string
          cost?: number | null
          created_at?: string
          created_by?: string | null
          custodian_id?: string | null
          id?: string
          is_active?: boolean
          manufacturer?: string | null
          model?: string | null
          name?: string
          plant_id?: string
          purchase_date?: string | null
          serial_number?: string | null
          status?: string
          tenant_id?: string
          under_warranty?: boolean | null
          updated_at?: string
          warranty_expiry_date?: string | null
          zone_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assets_area_id_fkey"
            columns: ["area_id"]
            isOneToOne: false
            referencedRelation: "areas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assets_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assets_plant_id_fkey"
            columns: ["plant_id"]
            isOneToOne: false
            referencedRelation: "plants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assets_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenant_stats"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "assets_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assets_zone_id_fkey"
            columns: ["zone_id"]
            isOneToOne: false
            referencedRelation: "zones"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action_type: string
          created_at: string
          error_message: string | null
          id: string
          ip_address: unknown
          new_values: Json | null
          old_values: Json | null
          resource_id: string | null
          resource_type: string
          success: boolean
          tenant_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action_type: string
          created_at?: string
          error_message?: string | null
          id?: string
          ip_address?: unknown
          new_values?: Json | null
          old_values?: Json | null
          resource_id?: string | null
          resource_type: string
          success?: boolean
          tenant_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action_type?: string
          created_at?: string
          error_message?: string | null
          id?: string
          ip_address?: unknown
          new_values?: Json | null
          old_values?: Json | null
          resource_id?: string | null
          resource_type?: string
          success?: boolean
          tenant_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenant_stats"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "audit_logs_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      cycle_count_items: {
        Row: {
          counted_qty: number | null
          created_at: string
          cycle_count_id: string
          id: string
          part_id: string
          system_qty: number
          tenant_id: string
        }
        Insert: {
          counted_qty?: number | null
          created_at?: string
          cycle_count_id: string
          id?: string
          part_id: string
          system_qty?: number
          tenant_id: string
        }
        Update: {
          counted_qty?: number | null
          created_at?: string
          cycle_count_id?: string
          id?: string
          part_id?: string
          system_qty?: number
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cycle_count_items_cycle_count_id_fkey"
            columns: ["cycle_count_id"]
            isOneToOne: false
            referencedRelation: "cycle_counts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cycle_count_items_part_id_fkey"
            columns: ["part_id"]
            isOneToOne: false
            referencedRelation: "parts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cycle_count_items_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenant_stats"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "cycle_count_items_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      cycle_counts: {
        Row: {
          code: string
          created_at: string
          created_by: string | null
          id: string
          is_posted: boolean
          location: string
          scheduled_date: string
          status: string
          store_id: string | null
          tenant_id: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          created_by?: string | null
          id?: string
          is_posted?: boolean
          location: string
          scheduled_date: string
          status?: string
          store_id?: string | null
          tenant_id: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          created_by?: string | null
          id?: string
          is_posted?: boolean
          location?: string
          scheduled_date?: string
          status?: string
          store_id?: string | null
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cycle_counts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cycle_counts_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cycle_counts_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenant_stats"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "cycle_counts_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          asset_id: string | null
          created_at: string
          description: string | null
          document_type: string
          file_name: string
          file_size: number
          id: string
          name: string
          storage_path: string
          tenant_id: string
          updated_at: string
          uploaded_by: string | null
        }
        Insert: {
          asset_id?: string | null
          created_at?: string
          description?: string | null
          document_type: string
          file_name: string
          file_size?: number
          id?: string
          name: string
          storage_path: string
          tenant_id: string
          updated_at?: string
          uploaded_by?: string | null
        }
        Update: {
          asset_id?: string | null
          created_at?: string
          description?: string | null
          document_type?: string
          file_name?: string
          file_size?: number
          id?: string
          name?: string
          storage_path?: string
          tenant_id?: string
          updated_at?: string
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "assets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenant_stats"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "documents_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      global_admins: {
        Row: {
          created_at: string
          email: string
          full_name: string | null
          id: string
          is_active: boolean
          last_login_at: string | null
          password_hash: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name?: string | null
          id?: string
          is_active?: boolean
          last_login_at?: string | null
          password_hash: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          is_active?: boolean
          last_login_at?: string | null
          password_hash?: string
        }
        Relationships: []
      }
      inventory_transactions: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          notes: string | null
          part_id: string
          quantity: number
          tenant_id: string
          transaction_date: string
          transaction_type: string
          unit_cost: number
          work_order_id: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          notes?: string | null
          part_id: string
          quantity?: number
          tenant_id: string
          transaction_date?: string
          transaction_type?: string
          unit_cost?: number
          work_order_id?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          notes?: string | null
          part_id?: string
          quantity?: number
          tenant_id?: string
          transaction_date?: string
          transaction_type?: string
          unit_cost?: number
          work_order_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "inventory_transactions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_transactions_part_id_fkey"
            columns: ["part_id"]
            isOneToOne: false
            referencedRelation: "parts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_transactions_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenant_stats"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "inventory_transactions_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_transactions_work_order_id_fkey"
            columns: ["work_order_id"]
            isOneToOne: false
            referencedRelation: "work_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          attachment_name: string | null
          attachment_url: string | null
          created_at: string
          created_by: string | null
          exception_notes: string | null
          exception_type: string | null
          id: string
          invoice_date: string
          invoice_number: string
          items: Json
          po_id: string
          status: string
          tenant_id: string
          updated_at: string
        }
        Insert: {
          attachment_name?: string | null
          attachment_url?: string | null
          created_at?: string
          created_by?: string | null
          exception_notes?: string | null
          exception_type?: string | null
          id?: string
          invoice_date?: string
          invoice_number?: string
          items?: Json
          po_id: string
          status?: string
          tenant_id: string
          updated_at?: string
        }
        Update: {
          attachment_name?: string | null
          attachment_url?: string | null
          created_at?: string
          created_by?: string | null
          exception_notes?: string | null
          exception_type?: string | null
          id?: string
          invoice_date?: string
          invoice_number?: string
          items?: Json
          po_id?: string
          status?: string
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoices_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_po_id_fkey"
            columns: ["po_id"]
            isOneToOne: false
            referencedRelation: "purchase_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenant_stats"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "invoices_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      labor_assignments: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          is_active: boolean
          labor_role: Database["public"]["Enums"]["labor_role"]
          tenant_id: string
          updated_at: string
          user_id: string
          zone_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          is_active?: boolean
          labor_role: Database["public"]["Enums"]["labor_role"]
          tenant_id: string
          updated_at?: string
          user_id: string
          zone_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          is_active?: boolean
          labor_role?: Database["public"]["Enums"]["labor_role"]
          tenant_id?: string
          updated_at?: string
          user_id?: string
          zone_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "labor_assignments_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "labor_assignments_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenant_stats"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "labor_assignments_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "labor_assignments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "labor_assignments_zone_id_fkey"
            columns: ["zone_id"]
            isOneToOne: false
            referencedRelation: "zones"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          body: string
          created_at: string
          id: string
          is_read: boolean
          message_type: string
          priority: string
          read_at: string | null
          recipient_id: string
          related_entity_id: string | null
          related_entity_type: string | null
          sender_id: string | null
          subject: string
          tenant_id: string
        }
        Insert: {
          body: string
          created_at?: string
          id?: string
          is_read?: boolean
          message_type?: string
          priority?: string
          read_at?: string | null
          recipient_id: string
          related_entity_id?: string | null
          related_entity_type?: string | null
          sender_id?: string | null
          subject: string
          tenant_id: string
        }
        Update: {
          body?: string
          created_at?: string
          id?: string
          is_read?: boolean
          message_type?: string
          priority?: string
          read_at?: string | null
          recipient_id?: string
          related_entity_id?: string | null
          related_entity_type?: string | null
          sender_id?: string | null
          subject?: string
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenant_stats"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "messages_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      meter_readings: {
        Row: {
          created_at: string
          id: string
          meter_id: string
          reading: number
          recorded_at: string
          recorded_by: string | null
          tenant_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          meter_id: string
          reading: number
          recorded_at?: string
          recorded_by?: string | null
          tenant_id: string
        }
        Update: {
          created_at?: string
          id?: string
          meter_id?: string
          reading?: number
          recorded_at?: string
          recorded_by?: string | null
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "meter_readings_meter_id_fkey"
            columns: ["meter_id"]
            isOneToOne: false
            referencedRelation: "meters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meter_readings_recorded_by_fkey"
            columns: ["recorded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meter_readings_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenant_stats"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "meter_readings_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      meters: {
        Row: {
          asset_id: string | null
          code: string
          created_at: string
          created_by: string | null
          id: string
          is_active: boolean
          last_reading: number | null
          max_reading_limit: number | null
          meter_type: string
          name: string
          tenant_id: string
          unit_of_measure: string
          updated_at: string
        }
        Insert: {
          asset_id?: string | null
          code: string
          created_at?: string
          created_by?: string | null
          id?: string
          is_active?: boolean
          last_reading?: number | null
          max_reading_limit?: number | null
          meter_type?: string
          name: string
          tenant_id: string
          unit_of_measure: string
          updated_at?: string
        }
        Update: {
          asset_id?: string | null
          code?: string
          created_at?: string
          created_by?: string | null
          id?: string
          is_active?: boolean
          last_reading?: number | null
          max_reading_limit?: number | null
          meter_type?: string
          name?: string
          tenant_id?: string
          unit_of_measure?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "meters_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "assets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meters_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meters_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenant_stats"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "meters_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      parts: {
        Row: {
          asset_id: string | null
          bin_code: string | null
          code: string
          created_at: string
          created_by: string | null
          id: string
          is_active: boolean
          lead_time: number | null
          location: string | null
          max_quantity: number | null
          min_quantity: number
          name: string
          part_number: string
          part_type: string
          quantity: number
          store_id: string | null
          tenant_id: string
          unit_cost: number
          unit_of_measure: string
          updated_at: string
          vendor_id: string | null
        }
        Insert: {
          asset_id?: string | null
          bin_code?: string | null
          code: string
          created_at?: string
          created_by?: string | null
          id?: string
          is_active?: boolean
          lead_time?: number | null
          location?: string | null
          max_quantity?: number | null
          min_quantity?: number
          name: string
          part_number: string
          part_type?: string
          quantity?: number
          store_id?: string | null
          tenant_id: string
          unit_cost?: number
          unit_of_measure?: string
          updated_at?: string
          vendor_id?: string | null
        }
        Update: {
          asset_id?: string | null
          bin_code?: string | null
          code?: string
          created_at?: string
          created_by?: string | null
          id?: string
          is_active?: boolean
          lead_time?: number | null
          location?: string | null
          max_quantity?: number | null
          min_quantity?: number
          name?: string
          part_number?: string
          part_type?: string
          quantity?: number
          store_id?: string | null
          tenant_id?: string
          unit_cost?: number
          unit_of_measure?: string
          updated_at?: string
          vendor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "parts_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "assets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "parts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "parts_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "parts_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenant_stats"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "parts_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "parts_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      plants: {
        Row: {
          address: string | null
          code: string
          created_at: string
          id: string
          is_active: boolean
          name: string
          tenant_id: string
          updated_at: string
        }
        Insert: {
          address?: string | null
          code: string
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
          tenant_id: string
          updated_at?: string
        }
        Update: {
          address?: string | null
          code?: string
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "plants_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenant_stats"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "plants_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      pm_schedules: {
        Row: {
          asset_id: string | null
          code: string
          created_at: string
          created_by: string | null
          duration: number
          frequency: string | null
          id: string
          is_active: boolean
          last_trigger_reading: number | null
          meter_id: string | null
          meter_trigger_value: number | null
          name: string
          next_due_date: string | null
          procedure_ids: string[] | null
          tenant_id: string
          trigger_type: string
          updated_at: string
          zone_id: string | null
        }
        Insert: {
          asset_id?: string | null
          code: string
          created_at?: string
          created_by?: string | null
          duration?: number
          frequency?: string | null
          id?: string
          is_active?: boolean
          last_trigger_reading?: number | null
          meter_id?: string | null
          meter_trigger_value?: number | null
          name: string
          next_due_date?: string | null
          procedure_ids?: string[] | null
          tenant_id: string
          trigger_type?: string
          updated_at?: string
          zone_id?: string | null
        }
        Update: {
          asset_id?: string | null
          code?: string
          created_at?: string
          created_by?: string | null
          duration?: number
          frequency?: string | null
          id?: string
          is_active?: boolean
          last_trigger_reading?: number | null
          meter_id?: string | null
          meter_trigger_value?: number | null
          name?: string
          next_due_date?: string | null
          procedure_ids?: string[] | null
          tenant_id?: string
          trigger_type?: string
          updated_at?: string
          zone_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pm_schedules_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "assets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_schedules_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_schedules_meter_id_fkey"
            columns: ["meter_id"]
            isOneToOne: false
            referencedRelation: "meters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_schedules_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenant_stats"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "pm_schedules_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pm_schedules_zone_id_fkey"
            columns: ["zone_id"]
            isOneToOne: false
            referencedRelation: "zones"
            referencedColumns: ["id"]
          },
        ]
      }
      procedures: {
        Row: {
          asset_id: string | null
          code: string
          content: string | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean
          name: string
          procedure_type: string
          steps: Json | null
          tenant_id: string
          total_duration: number
          updated_at: string
        }
        Insert: {
          asset_id?: string | null
          code: string
          content?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          procedure_type?: string
          steps?: Json | null
          tenant_id: string
          total_duration?: number
          updated_at?: string
        }
        Update: {
          asset_id?: string | null
          code?: string
          content?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          procedure_type?: string
          steps?: Json | null
          tenant_id?: string
          total_duration?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "procedures_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "assets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "procedures_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "procedures_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenant_stats"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "procedures_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          department: string | null
          email: string | null
          full_name: string | null
          id: string
          is_active: boolean
          job_title: string | null
          last_login_at: string | null
          must_change_password: boolean
          phone: string | null
          tenant_id: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          department?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          is_active?: boolean
          job_title?: string | null
          last_login_at?: string | null
          must_change_password?: boolean
          phone?: string | null
          tenant_id?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          department?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          is_active?: boolean
          job_title?: string | null
          last_login_at?: string | null
          must_change_password?: boolean
          phone?: string | null
          tenant_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenant_stats"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "profiles_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          asset_id: string | null
          budget: number
          code: string
          created_at: string
          created_by: string | null
          description: string | null
          end_date: string | null
          id: string
          is_active: boolean
          name: string
          start_date: string | null
          status: string
          tenant_id: string
          updated_at: string
        }
        Insert: {
          asset_id?: string | null
          budget?: number
          code: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean
          name: string
          start_date?: string | null
          status?: string
          tenant_id: string
          updated_at?: string
        }
        Update: {
          asset_id?: string | null
          budget?: number
          code?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean
          name?: string
          start_date?: string | null
          status?: string
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "assets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenant_stats"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "projects_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      purchase_orders: {
        Row: {
          approver_id: string | null
          code: string
          created_at: string
          created_by: string | null
          currency: string
          expected_delivery_date: string | null
          high_value_approver_id: string | null
          id: string
          items: Json
          notes: string | null
          order_date: string
          payment_terms: string
          po_type: string
          pr_id: string | null
          rejection_remarks: string | null
          ship_to_address: string | null
          status: string
          store_id: string | null
          tax_rate: number
          tenant_id: string
          updated_at: string
          vendor_id: string | null
        }
        Insert: {
          approver_id?: string | null
          code: string
          created_at?: string
          created_by?: string | null
          currency?: string
          expected_delivery_date?: string | null
          high_value_approver_id?: string | null
          id?: string
          items?: Json
          notes?: string | null
          order_date?: string
          payment_terms?: string
          po_type?: string
          pr_id?: string | null
          rejection_remarks?: string | null
          ship_to_address?: string | null
          status?: string
          store_id?: string | null
          tax_rate?: number
          tenant_id: string
          updated_at?: string
          vendor_id?: string | null
        }
        Update: {
          approver_id?: string | null
          code?: string
          created_at?: string
          created_by?: string | null
          currency?: string
          expected_delivery_date?: string | null
          high_value_approver_id?: string | null
          id?: string
          items?: Json
          notes?: string | null
          order_date?: string
          payment_terms?: string
          po_type?: string
          pr_id?: string | null
          rejection_remarks?: string | null
          ship_to_address?: string | null
          status?: string
          store_id?: string | null
          tax_rate?: number
          tenant_id?: string
          updated_at?: string
          vendor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "purchase_orders_approver_id_fkey"
            columns: ["approver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_orders_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_orders_high_value_approver_id_fkey"
            columns: ["high_value_approver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_orders_pr_id_fkey"
            columns: ["pr_id"]
            isOneToOne: false
            referencedRelation: "purchase_requisitions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_orders_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_orders_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenant_stats"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "purchase_orders_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_orders_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      purchase_requisitions: {
        Row: {
          approver_id: string | null
          asset_id: string | null
          budget_code: string | null
          code: string
          created_at: string
          created_by: string | null
          delivery_date: string | null
          delivery_zone_id: string | null
          description: string | null
          estimated_cost: number | null
          id: string
          internal_notes: string | null
          item_type: string | null
          items: Json | null
          justification: string | null
          pr_type: string
          priority: string
          remarks: string | null
          request_date: string
          requester_id: string | null
          specifications: string | null
          status: string
          store_id: string | null
          tenant_id: string
          updated_at: string
          vendor_id: string | null
          work_order_id: string | null
        }
        Insert: {
          approver_id?: string | null
          asset_id?: string | null
          budget_code?: string | null
          code: string
          created_at?: string
          created_by?: string | null
          delivery_date?: string | null
          delivery_zone_id?: string | null
          description?: string | null
          estimated_cost?: number | null
          id?: string
          internal_notes?: string | null
          item_type?: string | null
          items?: Json | null
          justification?: string | null
          pr_type?: string
          priority?: string
          remarks?: string | null
          request_date?: string
          requester_id?: string | null
          specifications?: string | null
          status?: string
          store_id?: string | null
          tenant_id: string
          updated_at?: string
          vendor_id?: string | null
          work_order_id?: string | null
        }
        Update: {
          approver_id?: string | null
          asset_id?: string | null
          budget_code?: string | null
          code?: string
          created_at?: string
          created_by?: string | null
          delivery_date?: string | null
          delivery_zone_id?: string | null
          description?: string | null
          estimated_cost?: number | null
          id?: string
          internal_notes?: string | null
          item_type?: string | null
          items?: Json | null
          justification?: string | null
          pr_type?: string
          priority?: string
          remarks?: string | null
          request_date?: string
          requester_id?: string | null
          specifications?: string | null
          status?: string
          store_id?: string | null
          tenant_id?: string
          updated_at?: string
          vendor_id?: string | null
          work_order_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "purchase_requisitions_approver_id_fkey"
            columns: ["approver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_requisitions_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "assets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_requisitions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_requisitions_delivery_zone_id_fkey"
            columns: ["delivery_zone_id"]
            isOneToOne: false
            referencedRelation: "zones"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_requisitions_requester_id_fkey"
            columns: ["requester_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_requisitions_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_requisitions_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenant_stats"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "purchase_requisitions_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_requisitions_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_requisitions_work_order_id_fkey"
            columns: ["work_order_id"]
            isOneToOne: false
            referencedRelation: "work_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_reports: {
        Row: {
          created_at: string
          description: string
          id: string
          saved_at: string
          tenant_id: string
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string
          id?: string
          saved_at?: string
          tenant_id: string
          title: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          saved_at?: string
          tenant_id?: string
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_reports_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenant_stats"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "saved_reports_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      stores: {
        Row: {
          code: string
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean
          location: string
          name: string
          tenant_id: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          location: string
          name: string
          tenant_id: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          location?: string
          name?: string
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "stores_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stores_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenant_stats"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "stores_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      tenant_invitations: {
        Row: {
          accepted_at: string | null
          created_at: string
          email: string
          expires_at: string
          id: string
          invite_code: string
          invited_by: string | null
          plant_id: string | null
          role: Database["public"]["Enums"]["app_role"]
          tenant_id: string
          zone_ids: string[] | null
        }
        Insert: {
          accepted_at?: string | null
          created_at?: string
          email: string
          expires_at?: string
          id?: string
          invite_code?: string
          invited_by?: string | null
          plant_id?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          tenant_id: string
          zone_ids?: string[] | null
        }
        Update: {
          accepted_at?: string | null
          created_at?: string
          email?: string
          expires_at?: string
          id?: string
          invite_code?: string
          invited_by?: string | null
          plant_id?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          tenant_id?: string
          zone_ids?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "tenant_invitations_invited_by_fkey"
            columns: ["invited_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tenant_invitations_plant_id_fkey"
            columns: ["plant_id"]
            isOneToOne: false
            referencedRelation: "plants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tenant_invitations_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenant_stats"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "tenant_invitations_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      tenants: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          name: string
          plan_type: Database["public"]["Enums"]["plan_type"]
          settings: Json | null
          slug: string
          subscription_end_at: string | null
          subscription_plan: string
          subscription_start_at: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
          plan_type?: Database["public"]["Enums"]["plan_type"]
          settings?: Json | null
          slug: string
          subscription_end_at?: string | null
          subscription_plan?: string
          subscription_start_at?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          plan_type?: Database["public"]["Enums"]["plan_type"]
          settings?: Json | null
          slug?: string
          subscription_end_at?: string | null
          subscription_plan?: string
          subscription_start_at?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          tenant_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          tenant_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          tenant_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenant_stats"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "user_roles_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_tenant_memberships: {
        Row: {
          id: string
          is_primary: boolean
          joined_at: string
          tenant_id: string
          user_id: string
        }
        Insert: {
          id?: string
          is_primary?: boolean
          joined_at?: string
          tenant_id: string
          user_id: string
        }
        Update: {
          id?: string
          is_primary?: boolean
          joined_at?: string
          tenant_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_tenant_memberships_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenant_stats"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "user_tenant_memberships_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_tenant_memberships_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_zone_access: {
        Row: {
          can_approve: boolean
          can_edit: boolean
          can_view: boolean
          granted_at: string
          granted_by: string | null
          id: string
          tenant_id: string
          user_id: string
          zone_id: string
        }
        Insert: {
          can_approve?: boolean
          can_edit?: boolean
          can_view?: boolean
          granted_at?: string
          granted_by?: string | null
          id?: string
          tenant_id: string
          user_id: string
          zone_id: string
        }
        Update: {
          can_approve?: boolean
          can_edit?: boolean
          can_view?: boolean
          granted_at?: string
          granted_by?: string | null
          id?: string
          tenant_id?: string
          user_id?: string
          zone_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_zone_access_granted_by_fkey"
            columns: ["granted_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_zone_access_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenant_stats"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "user_zone_access_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_zone_access_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_zone_access_zone_id_fkey"
            columns: ["zone_id"]
            isOneToOne: false
            referencedRelation: "zones"
            referencedColumns: ["id"]
          },
        ]
      }
      vendors: {
        Row: {
          address: string | null
          code: string
          contact_person: string
          created_at: string
          created_by: string | null
          email: string
          id: string
          is_active: boolean
          name: string
          phone: string
          tenant_id: string
          updated_at: string
        }
        Insert: {
          address?: string | null
          code: string
          contact_person: string
          created_at?: string
          created_by?: string | null
          email: string
          id?: string
          is_active?: boolean
          name: string
          phone: string
          tenant_id: string
          updated_at?: string
        }
        Update: {
          address?: string | null
          code?: string
          contact_person?: string
          created_at?: string
          created_by?: string | null
          email?: string
          id?: string
          is_active?: boolean
          name?: string
          phone?: string
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "vendors_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendors_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenant_stats"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "vendors_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      work_orders: {
        Row: {
          area_id: string | null
          asset_id: string | null
          assigned_user_ids: string[] | null
          cancellation_reason: string | null
          code: string
          completed_date: string | null
          controller_role: string | null
          created_at: string
          created_by: string | null
          description: string
          due_date: string | null
          estimated_duration: number
          feedback_notes: string | null
          id: string
          is_active: boolean
          labor_entries: Json | null
          labor_hours: number
          parent_work_order_id: string | null
          parts_used: Json | null
          plant_id: string | null
          pm_schedule_id: string | null
          priority: string
          procedure_ids: string[] | null
          project_id: string | null
          status: string
          tenant_id: string
          updated_at: string
          work_order_type: string
          work_request_id: string | null
          zone_id: string | null
        }
        Insert: {
          area_id?: string | null
          asset_id?: string | null
          assigned_user_ids?: string[] | null
          cancellation_reason?: string | null
          code: string
          completed_date?: string | null
          controller_role?: string | null
          created_at?: string
          created_by?: string | null
          description: string
          due_date?: string | null
          estimated_duration?: number
          feedback_notes?: string | null
          id?: string
          is_active?: boolean
          labor_entries?: Json | null
          labor_hours?: number
          parent_work_order_id?: string | null
          parts_used?: Json | null
          plant_id?: string | null
          pm_schedule_id?: string | null
          priority?: string
          procedure_ids?: string[] | null
          project_id?: string | null
          status?: string
          tenant_id: string
          updated_at?: string
          work_order_type?: string
          work_request_id?: string | null
          zone_id?: string | null
        }
        Update: {
          area_id?: string | null
          asset_id?: string | null
          assigned_user_ids?: string[] | null
          cancellation_reason?: string | null
          code?: string
          completed_date?: string | null
          controller_role?: string | null
          created_at?: string
          created_by?: string | null
          description?: string
          due_date?: string | null
          estimated_duration?: number
          feedback_notes?: string | null
          id?: string
          is_active?: boolean
          labor_entries?: Json | null
          labor_hours?: number
          parent_work_order_id?: string | null
          parts_used?: Json | null
          plant_id?: string | null
          pm_schedule_id?: string | null
          priority?: string
          procedure_ids?: string[] | null
          project_id?: string | null
          status?: string
          tenant_id?: string
          updated_at?: string
          work_order_type?: string
          work_request_id?: string | null
          zone_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "work_orders_area_id_fkey"
            columns: ["area_id"]
            isOneToOne: false
            referencedRelation: "areas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_orders_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "assets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_orders_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_orders_parent_work_order_id_fkey"
            columns: ["parent_work_order_id"]
            isOneToOne: false
            referencedRelation: "work_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_orders_plant_id_fkey"
            columns: ["plant_id"]
            isOneToOne: false
            referencedRelation: "plants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_orders_pm_schedule_id_fkey"
            columns: ["pm_schedule_id"]
            isOneToOne: false
            referencedRelation: "pm_schedules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_orders_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenant_stats"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "work_orders_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_orders_work_request_id_fkey"
            columns: ["work_request_id"]
            isOneToOne: false
            referencedRelation: "work_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_orders_zone_id_fkey"
            columns: ["zone_id"]
            isOneToOne: false
            referencedRelation: "zones"
            referencedColumns: ["id"]
          },
        ]
      }
      work_requests: {
        Row: {
          asset_id: string | null
          code: string
          converted_at: string | null
          converted_by: string | null
          created_at: string
          created_by: string | null
          description: string
          id: string
          is_active: boolean | null
          location_description: string | null
          priority: string
          rejection_reason: string | null
          request_date: string
          requester_contact: string | null
          requester_id: string | null
          status: string
          tenant_id: string
          updated_at: string
          work_order_id: string | null
          zone_id: string | null
        }
        Insert: {
          asset_id?: string | null
          code: string
          converted_at?: string | null
          converted_by?: string | null
          created_at?: string
          created_by?: string | null
          description: string
          id?: string
          is_active?: boolean | null
          location_description?: string | null
          priority?: string
          rejection_reason?: string | null
          request_date?: string
          requester_contact?: string | null
          requester_id?: string | null
          status?: string
          tenant_id: string
          updated_at?: string
          work_order_id?: string | null
          zone_id?: string | null
        }
        Update: {
          asset_id?: string | null
          code?: string
          converted_at?: string | null
          converted_by?: string | null
          created_at?: string
          created_by?: string | null
          description?: string
          id?: string
          is_active?: boolean | null
          location_description?: string | null
          priority?: string
          rejection_reason?: string | null
          request_date?: string
          requester_contact?: string | null
          requester_id?: string | null
          status?: string
          tenant_id?: string
          updated_at?: string
          work_order_id?: string | null
          zone_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "work_requests_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "assets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_requests_converted_by_fkey"
            columns: ["converted_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_requests_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_requests_requester_id_fkey"
            columns: ["requester_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_requests_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenant_stats"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "work_requests_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_requests_work_order_id_fkey"
            columns: ["work_order_id"]
            isOneToOne: false
            referencedRelation: "work_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_requests_zone_id_fkey"
            columns: ["zone_id"]
            isOneToOne: false
            referencedRelation: "zones"
            referencedColumns: ["id"]
          },
        ]
      }
      zones: {
        Row: {
          code: string
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          name: string
          plant_id: string
          tenant_id: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          plant_id: string
          tenant_id: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          plant_id?: string
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "zones_plant_id_fkey"
            columns: ["plant_id"]
            isOneToOne: false
            referencedRelation: "plants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "zones_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenant_stats"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "zones_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      tenant_stats: {
        Row: {
          created_at: string | null
          is_active: boolean | null
          plan_type: Database["public"]["Enums"]["plan_type"] | null
          plant_count: number | null
          slug: string | null
          subscription_end_at: string | null
          subscription_plan: string | null
          subscription_start_at: string | null
          tenant_id: string | null
          tenant_name: string | null
          user_count: number | null
          zone_count: number | null
        }
        Insert: {
          created_at?: string | null
          is_active?: boolean | null
          plan_type?: Database["public"]["Enums"]["plan_type"] | null
          plant_count?: never
          slug?: string | null
          subscription_end_at?: string | null
          subscription_plan?: string | null
          subscription_start_at?: string | null
          tenant_id?: string | null
          tenant_name?: string | null
          user_count?: never
          zone_count?: never
        }
        Update: {
          created_at?: string | null
          is_active?: boolean | null
          plan_type?: Database["public"]["Enums"]["plan_type"] | null
          plant_count?: never
          slug?: string | null
          subscription_end_at?: string | null
          subscription_plan?: string | null
          subscription_start_at?: string | null
          tenant_id?: string | null
          tenant_name?: string | null
          user_count?: never
          zone_count?: never
        }
        Relationships: []
      }
    }
    Functions: {
      accept_invitation: {
        Args: { _invite_code: string; _user_id: string }
        Returns: Json
      }
      admin_create_user_with_password: {
        Args: {
          _email: string
          _full_name: string
          _password: string
          _plant_id?: string
          _roles: Database["public"]["Enums"]["app_role"][]
          _tenant_id: string
          _zone_ids?: string[]
        }
        Returns: string
      }
      bypasses_zone_restriction: {
        Args: { _user_id: string }
        Returns: boolean
      }
      can_edit_zone: {
        Args: { _user_id: string; _zone_id: string }
        Returns: boolean
      }
      create_global_admin_simple: {
        Args: { _email: string; _full_name?: string; _password_hash: string }
        Returns: string
      }
      create_global_admin_with_password: {
        Args: { _email: string; _full_name?: string; _password: string }
        Returns: string
      }
      get_user_tenant_id: { Args: never; Returns: string }
      get_user_zone_ids: { Args: { _user_id: string }; Returns: string[] }
      has_any_role: {
        Args: {
          _roles: Database["public"]["Enums"]["app_role"][]
          _user_id: string
        }
        Returns: boolean
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      has_zone_access: {
        Args: { _user_id: string; _zone_id: string }
        Returns: boolean
      }
      is_tenant_admin: { Args: { _user_id: string }; Returns: boolean }
      update_global_admin_login: {
        Args: { _admin_id: string }
        Returns: undefined
      }
      update_global_admin_password: {
        Args: { _admin_id: string; _new_password: string }
        Returns: undefined
      }
      verify_global_admin_login: {
        Args: { _email: string; _password: string }
        Returns: {
          admin_email: string
          admin_id: string
          admin_is_active: boolean
          admin_name: string
        }[]
      }
    }
    Enums: {
      app_role:
        | "tenant_admin"
        | "manager"
        | "planner"
        | "maintenance_clerk"
        | "maintenance_controller"
        | "technician"
        | "procurement_user"
        | "requester"
        | "store_controller"
        | "store_clerk"
      labor_role:
        | "MECH-CNTRL"
        | "ELEC-CNTRL"
        | "GEN-CNTRL"
        | "MECH"
        | "ELEC"
        | "OPER"
        | "CONT"
      plan_type:
        | "basic"
        | "pro"
        | "enterprise"
        | "basic_t1"
        | "pro_t1"
        | "basic_t2"
        | "pro_t2"
      subscription_plan_type: "monthly" | "yearly" | "two_year"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: [
        "tenant_admin",
        "manager",
        "planner",
        "maintenance_clerk",
        "maintenance_controller",
        "technician",
        "procurement_user",
        "requester",
        "store_controller",
        "store_clerk",
      ],
      labor_role: [
        "MECH-CNTRL",
        "ELEC-CNTRL",
        "GEN-CNTRL",
        "MECH",
        "ELEC",
        "OPER",
        "CONT",
      ],
      plan_type: [
        "basic",
        "pro",
        "enterprise",
        "basic_t1",
        "pro_t1",
        "basic_t2",
        "pro_t2",
      ],
      subscription_plan_type: ["monthly", "yearly", "two_year"],
    },
  },
} as const
