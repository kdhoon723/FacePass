// =============================================================
// FacePass · Supabase Database Types
// 수동 정의 — `supabase gen types typescript` 로 자동 생성 가능
// =============================================================

// ------------------------------------------------------------------
// Enums
// ------------------------------------------------------------------

export type AttendanceType = 'check_in' | 'check_out';
export type AttendanceStatus = 'on_time' | 'late' | 'absent' | 'leave';
export type AdminRole = 'owner' | 'admin' | 'viewer';
export type EmbeddingSource = 'enroll' | 'auto-update';
export type SendMethod = 'sms' | 'email' | 'slack';

// ------------------------------------------------------------------
// Table Row types (DB → App)
// ------------------------------------------------------------------

export interface Employee {
  id: string;                   // uuid
  employee_no: string;          // e.g. "EMP-0142"
  name: string;
  department: string | null;
  email: string | null;
  phone: string | null;
  photo_url: string | null;     // Supabase Storage URL
  created_at: string;           // ISO 8601
  enrolled_at: string | null;   // ISO 8601
  deleted_at: string | null;    // ISO 8601 (soft delete)
}

export interface EmployeeEmbedding {
  id: string;                   // uuid
  employee_id: string;          // uuid → employees.id
  embedding: number[];          // float[512] — pgvector vector(512)
  quality: number | null;       // 0~1 confidence
  captured_at: string;          // ISO 8601
  source: EmbeddingSource;
}

export interface Kiosk {
  id: string;                   // uuid
  name: string;
  location: string | null;
  ip_addr: string | null;       // inet → string
  created_at: string;           // ISO 8601
  last_seen_at: string | null;  // ISO 8601
  is_active: boolean;
}

export interface AttendanceLog {
  id: string;                   // uuid
  employee_id: string;          // uuid → employees.id
  kiosk_id: string | null;      // uuid → kiosks.id
  type: AttendanceType;
  status: AttendanceStatus;
  similarity: number | null;    // cosine similarity (0~1)
  recognized_at: string;        // ISO 8601
  raw: Record<string, unknown> | null;  // jsonb debug info
}

export interface EnrollInvitation {
  token: string;                // 8-char random primary key
  employee_id: string;          // uuid → employees.id
  invited_by: string | null;    // uuid → auth.users.id
  send_method: SendMethod | null;
  created_at: string;           // ISO 8601
  expires_at: string;           // ISO 8601 (default: +72h)
  used_at: string | null;       // ISO 8601
}

export interface Admin {
  user_id: string;              // uuid → auth.users.id
  role: AdminRole;
  created_at: string;           // ISO 8601
}

// ------------------------------------------------------------------
// Insert types (App → DB, omit server-defaults)
// ------------------------------------------------------------------

export type EmployeeInsert = Omit<Employee, 'id' | 'created_at' | 'deleted_at'> & {
  id?: string;
  created_at?: string;
  deleted_at?: string;
};

export type EmployeeEmbeddingInsert = Omit<EmployeeEmbedding, 'id' | 'captured_at'> & {
  id?: string;
  captured_at?: string;
};

export type KioskInsert = Omit<Kiosk, 'id' | 'created_at'> & {
  id?: string;
  created_at?: string;
};

export type AttendanceLogInsert = Omit<AttendanceLog, 'id' | 'recognized_at'> & {
  id?: string;
  recognized_at?: string;
};

export type EnrollInvitationInsert = Omit<EnrollInvitation, 'created_at' | 'expires_at' | 'used_at'> & {
  created_at?: string;
  expires_at?: string;
  used_at?: string;
};

export type AdminInsert = Omit<Admin, 'created_at'> & {
  created_at?: string;
};

// ------------------------------------------------------------------
// Update types (App → DB, all optional except PK is excluded)
// ------------------------------------------------------------------

export type EmployeeUpdate = Partial<Omit<Employee, 'id'>>;
export type EmployeeEmbeddingUpdate = Partial<Omit<EmployeeEmbedding, 'id'>>;
export type KioskUpdate = Partial<Omit<Kiosk, 'id'>>;
export type AttendanceLogUpdate = Partial<Omit<AttendanceLog, 'id'>>;
export type EnrollInvitationUpdate = Partial<Omit<EnrollInvitation, 'token'>>;
export type AdminUpdate = Partial<Omit<Admin, 'user_id'>>;

// ------------------------------------------------------------------
// Supabase Database schema type
// (createClient<Database>(...) 로 타입 안전 클라이언트 생성 가능)
// ------------------------------------------------------------------

export interface Database {
  public: {
    Tables: {
      employees: {
        Row: Employee;
        Insert: EmployeeInsert;
        Update: EmployeeUpdate;
      };
      employee_embeddings: {
        Row: EmployeeEmbedding;
        Insert: EmployeeEmbeddingInsert;
        Update: EmployeeEmbeddingUpdate;
      };
      kiosks: {
        Row: Kiosk;
        Insert: KioskInsert;
        Update: KioskUpdate;
      };
      attendance_logs: {
        Row: AttendanceLog;
        Insert: AttendanceLogInsert;
        Update: AttendanceLogUpdate;
      };
      enroll_invitations: {
        Row: EnrollInvitation;
        Insert: EnrollInvitationInsert;
        Update: EnrollInvitationUpdate;
      };
      admins: {
        Row: Admin;
        Insert: AdminInsert;
        Update: AdminUpdate;
      };
    };
    Views: Record<string, never>;
    Functions: {
      match_face: {
        Args: {
          query_embedding: number[];
          similarity_threshold: number;
          match_count?: number;
        };
        Returns: Array<{
          employee_id: string;
          name: string;
          employee_no: string;
          department: string;
          similarity: number;
        }>;
      };
      is_admin: {
        Args: Record<string, never>;
        Returns: boolean;
      };
    };
    Enums: {
      attendance_type: AttendanceType;
      attendance_status: AttendanceStatus;
    };
  };
}
