export interface User {
  externalUserId: `0x${string}` | undefined;
}

export interface AccessToken {
  token: string;
  userId: string;
}

export interface AuthState {
  user: User;
  errors?: string;
  loading: boolean;
}

export interface AuthResult {
  user: User;
  token: string;
  message: string;
}

export interface ErrorInfo {
  description: string;
  code: number;
  correlationId: string;
}

export interface IdDocs {
  idDocType: string;
  country: string;
}
export interface Info {
  country: string;
  idDocs: IdDocs;
}

export interface ReviewResult {
  reviewAnswer: "RED" | "GREEN";
}
export interface Review {
  reviewId: string;
  attemptId: string;
  attemptCnt: number;
  reprocessing: boolean;
  levelName: string;
  createDate: string;
  reviewStatus:
    | "init"
    | "pending"
    | "prechecked"
    | "queued"
    | "completed"
    | "onHold";
  priority: string;
  reviewResult: ReviewResult;
}

export interface ApplicantData {
  id: string;
  createdAt: string;
  key: string;
  clientId: string;
  inspectionId: string;
  externalUserId: string;
  applicantPlatform: string;
  ipCountry: string;
  review: Review;
  lang: string;
  type: string;
}

export interface Applicant {
  applicantdata: ApplicantData;
}

export interface ErrorSumsub {
  errorInfo: ErrorInfo;
}

export type ApplicantDataApi = ApplicantData & ErrorInfo;
