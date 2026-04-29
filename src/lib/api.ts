import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type {
  AdminContext,
  AppSettings,
  AttendanceListPage,
  CreateEmployeeInput,
  DashboardData,
  Employee,
  EmployeeListPage,
  EmployeeWithInvite,
  InviteValidation,
  KioskSummary,
  KioskWithEventCount,
  ListEmployeesParams,
  MatchResponse,
  TodaySummary,
} from './api-types.ts';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn('[FacePass] Supabase env not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
}

// Auth client only (sign-in/up/sign-out + session). DB access goes through /api.
export const supabase: SupabaseClient = createClient(
  SUPABASE_URL ?? '',
  SUPABASE_ANON_KEY ?? '',
  {
    auth: { persistSession: true, autoRefreshToken: true, storageKey: 'facepass-auth' },
  },
);

const API_BASE = `${SUPABASE_URL}/functions/v1/api`;

export class ApiError extends Error {
  status: number;
  code: string;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

async function request<T>(
  path: string,
  init?: RequestInit & { authed?: boolean },
): Promise<T> {
  const headers = new Headers(init?.headers);
  headers.set('Content-Type', 'application/json');
  // anon key required by Supabase Edge Function gateway
  if (SUPABASE_ANON_KEY) headers.set('apikey', SUPABASE_ANON_KEY);

  if (init?.authed !== false) {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.access_token) {
      headers.set('Authorization', `Bearer ${session.access_token}`);
    }
  }

  const res = await fetch(`${API_BASE}${path}`, { ...init, headers });
  if (!res.ok) {
    const body = await res.json().catch(() => ({})) as { code?: string; error?: string };
    throw new ApiError(res.status, body.code ?? 'UNKNOWN', body.error ?? res.statusText);
  }
  return res.json() as Promise<T>;
}

// ---------------------------------------------------------------------------
// Public endpoints (no auth)
// ---------------------------------------------------------------------------

export const matchFace = (body: {
  embedding: number[];
  kiosk_id?: string;
  type: 'check_in' | 'check_out';
  threshold?: number;
}) =>
  request<MatchResponse>('/match-face', {
    method: 'POST',
    body: JSON.stringify(body),
    authed: false,
  });

export const validateInvite = (token: string) =>
  request<InviteValidation>(`/invite/${token}`, { authed: false });

export const submitEnrollment = (token: string, embeddings: number[][]) =>
  request<{ success: boolean; employee_id: string }>(`/enroll/${token}`, {
    method: 'POST',
    body: JSON.stringify({ embeddings }),
    authed: false,
  });

export const fetchKioskSummary = (kioskId?: string) =>
  request<KioskSummary>(
    kioskId ? `/kiosk/today-summary?kiosk_id=${encodeURIComponent(kioskId)}` : '/kiosk/today-summary',
    { authed: false },
  );

// ---------------------------------------------------------------------------
// Admin endpoints (auth required)
// ---------------------------------------------------------------------------

export const adminApi = {
  me: () => request<{ admin: AdminContext }>('/me'),

  // Employees
  listEmployees: (params: ListEmployeesParams = {}) =>
    request<EmployeeListPage>(`/employees?${new URLSearchParams(params as Record<string, string>).toString()}`),

  createEmployee: (input: CreateEmployeeInput) =>
    request<EmployeeWithInvite>('/employees', { method: 'POST', body: JSON.stringify(input) }),

  getEmployee: (id: string) =>
    request<Employee & { embeddings_meta: unknown[]; recent_logs: unknown[] }>(`/employees/${id}`),

  updateEmployee: (id: string, input: Partial<CreateEmployeeInput>) =>
    request<Employee>(`/employees/${id}`, { method: 'PATCH', body: JSON.stringify(input) }),

  deleteEmployee: (id: string) =>
    request<{ success: boolean }>(`/employees/${id}`, { method: 'DELETE' }),

  resendInvite: (id: string, send_method?: 'sms' | 'email' | 'slack') =>
    request<{ token: string; expires_at: string }>(`/employees/${id}/invitations`, {
      method: 'POST',
      body: JSON.stringify({ send_method }),
    }),

  // Attendance
  listAttendance: (params: {
    from?: string;
    to?: string;
    dept?: string;
    status?: string;
    limit?: string;
    offset?: string;
  } = {}) =>
    request<AttendanceListPage>(`/attendance?${new URLSearchParams(params as Record<string, string>).toString()}`),

  todaySummary: () => request<TodaySummary>('/attendance/today'),

  // Dashboard
  dashboard: () => request<DashboardData>('/dashboard'),
  weeklyReport: () => request<{ data: { date: string; on_time: number; late: number; absent: number }[] }>('/reports/weekly'),
  monthlyReport: () => request<{ monthly: { month: string; on_time_rate: number }[]; top5_attendees: { employee_id: string; days_on_time: number }[] }>('/reports/monthly'),

  // Kiosks
  listKiosks: () => request<KioskWithEventCount[]>('/kiosks'),
  createKiosk: (input: { name: string; location?: string; ip_addr?: string }) =>
    request<KioskWithEventCount>('/kiosks', { method: 'POST', body: JSON.stringify(input) }),
  updateKiosk: (id: string, input: { name?: string; location?: string; ip_addr?: string; is_active?: boolean }) =>
    request<KioskWithEventCount>(`/kiosks/${id}`, { method: 'PATCH', body: JSON.stringify(input) }),

  // Settings
  getSettings: () => request<AppSettings>('/settings'),
  updateSettings: (input: Partial<AppSettings>) =>
    request<AppSettings>('/settings', { method: 'PATCH', body: JSON.stringify(input) }),
};
