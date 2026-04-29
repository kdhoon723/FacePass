// Shared DTO types — mirrors supabase/functions/api/lib/types.ts
// Keep in sync manually until codegen is set up.

export interface AdminContext {
  user_id: string;
  email: string;
  role: 'owner' | 'admin' | 'viewer';
}

export interface EmployeeInfo {
  id: string;
  name: string;
  employee_no: string;
  department: string | null;
}

export interface MatchResponse {
  matched: boolean;
  employee?: EmployeeInfo;
  similarity?: number;
  log_id?: string;
}

export interface InviteValidation {
  valid: boolean;
  employee?: {
    name: string;
    employee_no: string;
    dept: string | null;
  };
  expires_at?: string;
  reason?: string;
}

export interface Employee {
  id: string;
  employee_no: string;
  name: string;
  department: string | null;
  email: string | null;
  phone: string | null;
  photo_url: string | null;
  created_at: string;
  enrolled_at: string | null;
  deleted_at: string | null;
}

export interface EmployeeWithEmbeddingCount extends Employee {
  embedding_count: number;
}

export interface EmployeeListPage {
  data: EmployeeWithEmbeddingCount[];
  total: number;
  limit: number;
  offset: number;
}

export interface EmployeeWithInvite extends Employee {
  invite_token?: string;
  invite_expires_at?: string;
}

export interface CreateEmployeeInput {
  name: string;
  employee_no: string;
  department?: string;
  email?: string;
  phone?: string;
  send_method?: 'sms' | 'email' | 'slack';
  invite?: boolean;
}

export interface ListEmployeesParams {
  status?: 'enrolled' | 'pending' | 'expired';
  q?: string;
  limit?: string;
  offset?: string;
}

export interface AttendanceLog {
  id: string;
  employee_id: string;
  kiosk_id: string | null;
  type: 'check_in' | 'check_out';
  status: 'on_time' | 'late' | 'absent' | 'leave';
  similarity: number | null;
  recognized_at: string;
  raw: Record<string, unknown> | null;
}

export interface AttendanceListPage {
  data: AttendanceLog[];
  total: number;
  limit: number;
  offset: number;
}

export interface TodaySummary {
  check_in_count: number;
  late_count: number;
  absent_count: number;
  by_department: Record<string, { on_time: number; late: number }>;
}

export interface DashboardKpi {
  total_employees: number;
  checked_in_today: number;
  late_today: number;
  absent_today: number;
}

export interface HourlyPoint {
  hour: number;
  check_in: number;
  check_out: number;
}

export interface DashboardData {
  kpi: DashboardKpi;
  hourly: HourlyPoint[];
  by_department: Record<string, number>;
  alerts: string[];
}

export interface Kiosk {
  id: string;
  name: string;
  location: string | null;
  ip_addr: string | null;
  created_at: string;
  last_seen_at: string | null;
  is_active: boolean;
}

export interface KioskWithEventCount extends Kiosk {
  today_events: number;
}

export interface AppSettings {
  recognition_threshold: number;
  liveness_check: boolean;
  duplicate_prevent_minutes: number;
  default_check_in_time: string;
  late_grace_minutes: number;
  auto_check_out_time: string;
  retention_days: number;
  store_raw_images: boolean;
  flexible_departments: string[];
  updated_at: string;
}
