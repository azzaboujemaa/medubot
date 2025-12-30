export interface EmployeeProfile {
  id?: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'EMPLOYEE' | 'OPERATOR' | 'MAINTENANCE';
  robotId?: string;
  zone?: string;
  active?: boolean;
  createdAt?: any;
}
