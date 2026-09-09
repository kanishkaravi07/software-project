import { Item, BorrowRequest, UserProfile, DashboardStats } from '../types';

const MOCK_PROFILES: UserProfile[] = [
  {
    id: 'usr-student-1',
    name: 'Alex Chen',
    email: 'student@campus.edu',
    role: 'STUDENT',
    department: 'Computer Science & Engineering',
    created_at: new Date('2026-01-15').toISOString()
  },
  {
    id: 'usr-student-2',
    name: 'Sarah Jenkins',
    email: 'sarah@campus.edu',
    role: 'STUDENT',
    department: 'Electrical Engineering',
    created_at: new Date('2026-02-01').toISOString()
  },
  {
    id: 'usr-student-3',
    name: 'Michael Scott',
    email: 'michael@campus.edu',
    role: 'STUDENT',
    department: 'Mechanical Engineering',
    created_at: new Date('2026-02-10').toISOString()
  },
  {
    id: 'usr-admin-1',
    name: 'Campus Administrator',
    email: 'admin@campus.edu',
    role: 'ADMIN',
    department: 'Campus Resource Center',
    created_at: new Date('2026-01-01').toISOString()
  }
];

const MOCK_ITEMS: Item[] = [
  {
    id: 'item-1',
    item_name: 'Scientific Calculator (Casio FX-991EX)',
    category: 'Electronics',
    description: 'High-precision engineering calculator suitable for advanced mathematics, physics, and engineering coursework.',
    image_url: 'https://images.unsplash.com/photo-1611125832047-1d7ad1e8e498?w=600&auto=format&fit=crop&q=80',
    quantity: 5,
    available_quantity: 4,
    location: 'Lab 201 - Shelf B',
    condition: 'GOOD',
    status: 'AVAILABLE',
    created_at: new Date('2026-01-10').toISOString()
  },
  {
    id: 'item-2',
    item_name: 'Programming in C (ANSI C 8th Ed)',
    category: 'Books',
    description: 'Essential textbook for computer science foundation courses covering C syntax, pointers, memory allocation, and data structures.',
    image_url: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600&auto=format&fit=crop&q=80',
    quantity: 10,
    available_quantity: 8,
    location: 'Central Library - Rack 14',
    condition: 'GOOD',
    status: 'AVAILABLE',
    created_at: new Date('2026-01-12').toISOString()
  },
  {
    id: 'item-3',
    item_name: 'Spalding Official Basketball',
    category: 'Sports Equipment',
    description: 'Standard size 7 composite leather basketball suitable for indoor gymnasium and outdoor campus court play.',
    image_url: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=600&auto=format&fit=crop&q=80',
    quantity: 3,
    available_quantity: 2,
    location: 'Sports Complex Room 3',
    condition: 'GOOD',
    status: 'AVAILABLE',
    created_at: new Date('2026-01-20').toISOString()
  },
  {
    id: 'item-4',
    item_name: 'Arduino Uno R3 Ultimate Starter Kit',
    category: 'Laboratory Equipment',
    description: 'Includes Arduino Uno board, breadboard, jumper wires, sensors, LEDs, motors, and step-by-step project manual.',
    image_url: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=600&auto=format&fit=crop&q=80',
    quantity: 4,
    available_quantity: 3,
    location: 'Robotics Workshop - Cabinet 1',
    condition: 'NEW',
    status: 'AVAILABLE',
    created_at: new Date('2026-02-05').toISOString()
  },
  {
    id: 'item-5',
    item_name: 'High-Speed 4K HDMI Cable (3 Meters)',
    category: 'Electronics',
    description: 'Braided HDMI 2.0 cable compatible with projectors, monitors, and laptops for presentations and seminars.',
    image_url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
    quantity: 8,
    available_quantity: 6,
    location: 'AV Room Storage',
    condition: 'GOOD',
    status: 'AVAILABLE',
    created_at: new Date('2026-02-12').toISOString()
  },
  {
    id: 'item-6',
    item_name: 'Digital Multimeter & Test Leads',
    category: 'Laboratory Equipment',
    description: 'Auto-ranging digital multimeter for measuring AC/DC voltage, current, resistance, and continuity checks.',
    image_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80',
    quantity: 2,
    available_quantity: 0,
    location: 'Electronics Lab - Counter A',
    condition: 'FAIR',
    status: 'BORROWED',
    created_at: new Date('2026-02-15').toISOString()
  }
];

const MOCK_REQUESTS: BorrowRequest[] = [
  {
    id: 'req-1',
    student_id: 'usr-student-1',
    item_id: 'item-6',
    request_date: new Date('2026-03-01').toISOString(),
    status: 'APPROVED',
    borrow_date: new Date('2026-03-02').toISOString(),
    expected_return_date: new Date('2026-03-12').toISOString(),
    admin_remark: 'Approved for EE 302 Lab Assignment',
    created_at: new Date('2026-03-01').toISOString(),
    student: MOCK_PROFILES[0],
    item: MOCK_ITEMS[5]
  },
  {
    id: 'req-2',
    student_id: 'usr-student-1',
    item_id: 'item-1',
    request_date: new Date('2026-03-05').toISOString(),
    status: 'PENDING',
    expected_return_date: new Date('2026-03-15').toISOString(),
    created_at: new Date('2026-03-05').toISOString(),
    student: MOCK_PROFILES[0],
    item: MOCK_ITEMS[0]
  },
  {
    id: 'req-3',
    student_id: 'usr-student-2',
    item_id: 'item-3',
    request_date: new Date('2026-02-20').toISOString(),
    status: 'COMPLETED',
    borrow_date: new Date('2026-02-21').toISOString(),
    return_date: new Date('2026-02-28').toISOString(),
    admin_remark: 'Returned in good condition',
    created_at: new Date('2026-02-20').toISOString(),
    student: MOCK_PROFILES[1],
    item: MOCK_ITEMS[2]
  }
];

// Helper to interact with local storage in browser environment
const STORAGE_KEYS = {
  ITEMS: 'campusshare_items_v1',
  REQUESTS: 'campusshare_requests_v1',
  PROFILES: 'campusshare_profiles_v1',
  CURRENT_USER: 'campusshare_current_user_v1'
};

function isClient() {
  return typeof window !== 'undefined';
}

function getStored<T>(key: string, defaultValue: T): T {
  if (!isClient()) return defaultValue;
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (err) {
    console.error('Failed to parse stored mock data:', err);
    return defaultValue;
  }
}

function setStored<T>(key: string, value: T): void {
  if (!isClient()) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error('Failed to set stored mock data:', err);
  }
}

export class MockStore {
  // Profiles / Users
  static getProfiles(): UserProfile[] {
    return getStored<UserProfile[]>(STORAGE_KEYS.PROFILES, MOCK_PROFILES);
  }

  static getStudents(): UserProfile[] {
    return this.getProfiles().filter((p) => p.role === 'STUDENT');
  }

  static getCurrentUser(): UserProfile | null {
    const user = getStored<UserProfile | null>(STORAGE_KEYS.CURRENT_USER, MOCK_PROFILES[0]);
    return user;
  }

  static setCurrentUser(user: UserProfile | null) {
    setStored<UserProfile | null>(STORAGE_KEYS.CURRENT_USER, user);
  }

  static registerStudent(name: string, email: string, department: string): UserProfile {
    const profiles = this.getProfiles();
    const existing = profiles.find((p) => p.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      throw new Error('An account with this email address already exists.');
    }

    const newStudent: UserProfile = {
      id: `usr-${Date.now()}`,
      name,
      email,
      role: 'STUDENT',
      department,
      created_at: new Date().toISOString()
    };

    profiles.push(newStudent);
    setStored(STORAGE_KEYS.PROFILES, profiles);
    this.setCurrentUser(newStudent);
    return newStudent;
  }

  static login(email: string, role: 'STUDENT' | 'ADMIN'): UserProfile {
    const profiles = this.getProfiles();
    const user = profiles.find(
      (p) => p.email.toLowerCase() === email.toLowerCase() && p.role === role
    );
    if (!user) {
      // Fallback auto-creation or demo login
      if (email.toLowerCase().includes('admin') || role === 'ADMIN') {
        const adminObj = profiles.find((p) => p.role === 'ADMIN') || MOCK_PROFILES[3];
        this.setCurrentUser(adminObj);
        return adminObj;
      } else {
        // Return default student or create demo student
        const studentObj = profiles.find((p) => p.role === 'STUDENT') || MOCK_PROFILES[0];
        this.setCurrentUser(studentObj);
        return studentObj;
      }
    }
    this.setCurrentUser(user);
    return user;
  }

  static logout() {
    if (isClient()) {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  }

  // Items
  static getItems(): Item[] {
    return getStored<Item[]>(STORAGE_KEYS.ITEMS, MOCK_ITEMS);
  }

  static getItemById(id: string): Item | null {
    const items = this.getItems();
    return items.find((item) => item.id === id) || null;
  }

  static searchItems(query?: string, category?: string): Item[] {
    let items = this.getItems();

    if (category && category !== 'All') {
      items = items.filter((item) => item.category.toLowerCase() === category.toLowerCase());
    }

    if (query && query.trim() !== '') {
      const q = query.toLowerCase().trim();
      items = items.filter(
        (item) =>
          item.item_name.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.location.toLowerCase().includes(q)
      );
    }

    return items;
  }

  static addItem(itemData: Omit<Item, 'id' | 'created_at' | 'available_quantity' | 'status'> & { quantity: number }): Item {
    const items = this.getItems();
    const qty = Number(itemData.quantity) || 1;
    const newItem: Item = {
      ...itemData,
      id: `item-${Date.now()}`,
      quantity: qty,
      available_quantity: qty,
      status: qty > 0 ? 'AVAILABLE' : 'UNAVAILABLE',
      created_at: new Date().toISOString()
    };

    items.unshift(newItem);
    setStored(STORAGE_KEYS.ITEMS, items);
    return newItem;
  }

  static updateItem(id: string, updates: Partial<Item>): Item {
    const items = this.getItems();
    const index = items.findIndex((i) => i.id === id);
    if (index === -1) throw new Error('Item not found');

    const currentItem = items[index];
    const newQty = updates.quantity !== undefined ? Number(updates.quantity) : currentItem.quantity;
    
    // Adjust available quantity proportionally if total quantity changed
    let newAvailable = currentItem.available_quantity;
    if (updates.quantity !== undefined) {
      const borrowedCount = currentItem.quantity - currentItem.available_quantity;
      newAvailable = Math.max(0, newQty - borrowedCount);
    }
    if (updates.available_quantity !== undefined) {
      newAvailable = Number(updates.available_quantity);
    }

    const newStatus = newAvailable > 0 ? 'AVAILABLE' : (newQty - newAvailable > 0 ? 'BORROWED' : 'UNAVAILABLE');

    const updatedItem: Item = {
      ...currentItem,
      ...updates,
      quantity: newQty,
      available_quantity: newAvailable,
      status: newStatus
    };

    items[index] = updatedItem;
    setStored(STORAGE_KEYS.ITEMS, items);
    return updatedItem;
  }

  static deleteItem(id: string): boolean {
    let items = this.getItems();
    items = items.filter((i) => i.id !== id);
    setStored(STORAGE_KEYS.ITEMS, items);
    return true;
  }

  // Borrow Requests & Returns
  static getRequests(): BorrowRequest[] {
    const requests = getStored<BorrowRequest[]>(STORAGE_KEYS.REQUESTS, MOCK_REQUESTS);
    const items = this.getItems();
    const profiles = this.getProfiles();

    // Populate relations
    return requests.map((req) => ({
      ...req,
      item: items.find((i) => i.id === req.item_id),
      student: profiles.find((p) => p.id === req.student_id)
    }));
  }

  static getStudentRequests(studentId: string): BorrowRequest[] {
    return this.getRequests().filter((r) => r.student_id === studentId);
  }

  static createBorrowRequest(studentId: string, itemId: string, expectedReturnDate?: string): BorrowRequest {
    const item = this.getItemById(itemId);
    if (!item) throw new Error('Selected item does not exist.');
    if (item.available_quantity <= 0 || item.status === 'UNAVAILABLE') {
      throw new Error('Item is currently unavailable for borrowing.');
    }

    const requests = this.getRequests();
    // Check duplicate active request
    const existingActive = requests.find(
      (r) =>
        r.student_id === studentId &&
        r.item_id === itemId &&
        (r.status === 'PENDING' || r.status === 'APPROVED' || r.status === 'RETURN_PENDING')
    );

    if (existingActive) {
      throw new Error('You already have an active request or borrowed instance for this item.');
    }

    const newRequest: BorrowRequest = {
      id: `req-${Date.now()}`,
      student_id: studentId,
      item_id: itemId,
      request_date: new Date().toISOString(),
      status: 'PENDING',
      expected_return_date: expectedReturnDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      created_at: new Date().toISOString()
    };

    requests.unshift(newRequest);
    setStored(STORAGE_KEYS.REQUESTS, requests);
    return newRequest;
  }

  static approveRequest(requestId: string, remark?: string): BorrowRequest {
    const requests = this.getRequests();
    const req = requests.find((r) => r.id === requestId);
    if (!req) throw new Error('Borrow request not found.');
    if (req.status !== 'PENDING') throw new Error(`Cannot approve request in ${req.status} status.`);

    const item = this.getItemById(req.item_id);
    if (!item || item.available_quantity <= 0) {
      throw new Error('Item is no longer available in stock.');
    }

    // Update item stock
    const newAvailable = item.available_quantity - 1;
    this.updateItem(item.id, {
      available_quantity: newAvailable,
      status: newAvailable === 0 ? 'BORROWED' : item.status
    });

    req.status = 'APPROVED';
    req.borrow_date = new Date().toISOString();
    req.admin_remark = remark || 'Approved by Admin';

    setStored(STORAGE_KEYS.REQUESTS, requests);
    return req;
  }

  static rejectRequest(requestId: string, remark?: string): BorrowRequest {
    const requests = this.getRequests();
    const req = requests.find((r) => r.id === requestId);
    if (!req) throw new Error('Borrow request not found.');

    req.status = 'REJECTED';
    req.admin_remark = remark || 'Rejected by Admin';

    setStored(STORAGE_KEYS.REQUESTS, requests);
    return req;
  }

  static requestReturn(requestId: string, studentId: string): BorrowRequest {
    const requests = this.getRequests();
    const req = requests.find((r) => r.id === requestId && r.student_id === studentId);
    if (!req) throw new Error('Borrow request not found or not owned by student.');
    if (req.status !== 'APPROVED') throw new Error('Only currently borrowed items can be returned.');

    req.status = 'RETURN_PENDING';
    setStored(STORAGE_KEYS.REQUESTS, requests);
    return req;
  }

  static confirmReturn(requestId: string, remark?: string): BorrowRequest {
    const requests = this.getRequests();
    const req = requests.find((r) => r.id === requestId);
    if (!req) throw new Error('Borrow request not found.');
    if (req.status !== 'RETURN_PENDING' && req.status !== 'APPROVED') {
      throw new Error('Cannot confirm return for this request status.');
    }

    const item = this.getItemById(req.item_id);
    if (item) {
      const newAvailable = Math.min(item.quantity, item.available_quantity + 1);
      this.updateItem(item.id, {
        available_quantity: newAvailable,
        status: newAvailable > 0 ? 'AVAILABLE' : item.status
      });
    }

    req.status = 'COMPLETED';
    req.return_date = new Date().toISOString();
    req.admin_remark = remark || 'Return confirmed by Admin';

    setStored(STORAGE_KEYS.REQUESTS, requests);
    return req;
  }

  // Dashboard Metrics
  static getStats(): DashboardStats {
    const items = this.getItems();
    const requests = this.getRequests();
    const students = this.getStudents();

    const totalItems = items.reduce((acc, curr) => acc + curr.quantity, 0);
    const availableItems = items.reduce((acc, curr) => acc + curr.available_quantity, 0);
    const borrowedItems = requests.filter((r) => r.status === 'APPROVED' || r.status === 'RETURN_PENDING').length;
    const pendingRequests = requests.filter((r) => r.status === 'PENDING' || r.status === 'RETURN_PENDING').length;

    return {
      totalItems,
      availableItems,
      borrowedItems,
      pendingRequests,
      totalStudents: students.length
    };
  }
}
