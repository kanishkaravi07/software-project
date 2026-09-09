export type UserRole = 'STUDENT' | 'ADMIN';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  created_at: string;
}

export type ItemCategory = 
  | 'Books'
  | 'Electronics'
  | 'Sports Equipment'
  | 'Laboratory Equipment'
  | 'Stationery'
  | 'Other';

export type ItemCondition = 'NEW' | 'GOOD' | 'FAIR';

export type ItemStatus = 'AVAILABLE' | 'BORROWED' | 'UNAVAILABLE';

export interface Item {
  id: string;
  item_name: string;
  category: ItemCategory;
  description: string;
  image_url: string;
  quantity: number;
  available_quantity: number;
  location: string;
  condition: ItemCondition;
  status: ItemStatus;
  created_at: string;
}

export type RequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'RETURN_PENDING' | 'COMPLETED';

export interface BorrowRequest {
  id: string;
  student_id: string;
  item_id: string;
  request_date: string;
  status: RequestStatus;
  borrow_date?: string | null;
  expected_return_date?: string | null;
  return_date?: string | null;
  admin_remark?: string | null;
  created_at: string;
  student?: UserProfile;
  item?: Item;
}

export interface DashboardStats {
  totalItems: number;
  availableItems: number;
  borrowedItems: number;
  pendingRequests: number;
  totalStudents: number;
}
