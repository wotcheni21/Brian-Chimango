export type AttendanceStatus = "attending" | "not_attending";

export type RsvpPayload = {
  fullName: string;
  phone: string;
  email: string;
  attendance: AttendanceStatus;
  guests: number;
  message?: string;
};

export type RsvpResult =
  | { ok: true }
  | { ok: false; error: string };
