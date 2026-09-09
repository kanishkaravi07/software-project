# CampusShare - Campus Item Borrowing System

CampusShare is a full-stack web application built for college campuses where students can search for equipment, borrow them, and return them, while administrators manage inventory, review requests, verify returns, and monitor analytics.

---

## Features & Highlights

- **Two Distinct User Roles**:
  - **STUDENT**: Search items, filter by category, submit borrow requests, track request statuses, return borrowed items, view personal borrowing history.
  - **ADMIN**: Manage campus inventory (Add, Edit, Delete items), approve/reject student borrow requests, verify returned items, view registered students directory, monitor dashboard statistics.
- **Out-of-the-Box Dual Engine**: Runs instantly using a persistent local mock store out-of-the-box, and seamlessly syncs with Supabase PostgreSQL and Supabase Auth when credentials are provided in `.env.local`.
- **Automated Stock Calculations**: Approving a request automatically decrements item stock. Confirming a return automatically increments available stock and marks the request as `COMPLETED`.

---

## Quick Start Guide

### 1. Installation

Open terminal in the project directory and install dependencies:

```bash
cd campusshare
npm install
```

### 2. Running Locally

Start the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## User Logins & Test Accounts

You can test both roles using one-click demo login buttons or credentials:

| Role | Email | Password | Access Path |
| :--- | :--- | :--- | :--- |
| **Student** | `student@campus.edu` | `password123` | `/login` -> `/student/dashboard` |
| **Admin** | `admin@campus.edu` | `admin123` | `/admin/login` -> `/admin/dashboard` |

---

## Supabase PostgreSQL & Auth Setup (Optional / Production)

To connect this application to your real Supabase backend:

### 1. Environment Variables

Create a file named `.env.local` in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 2. Database Schema Creation

1. Open your Supabase Dashboard -> **SQL Editor**.
2. Copy the complete SQL script from `supabase/schema.sql`.
3. Paste and run the script. This creates:
   - `profiles` table (STUDENT / ADMIN roles)
   - `items` table (Category, quantity, available_quantity, location, condition, status)
   - `borrow_requests` table (Student FK, Item FK, status workflow, return dates)
   - Row Level Security (RLS) policies
   - Sample seed items (Scientific Calculator, Programming in C Book, Basketball, Arduino Kit, HDMI Cable)

---

## System Workflows

### 1. Borrowing Workflow

```
Student Selects Item -> Click "Borrow" -> Request Created (Status: PENDING)
                                                ↓
                                      Admin Reviews Request
                                      /                   \
                            Click "Approve"           Click "Reject"
                                 ↓                          ↓
                     Status = APPROVED / BORROWED      Status = REJECTED
                     Available Quantity Decreases     Student notified
```

### 2. Return Workflow

```
Student opens "Currently Borrowed Items" -> Click "Return Item"
                                  ↓
                     Return Request Created (Status: RETURN_PENDING)
                                  ↓
                     Admin verifies item condition
                                  ↓
                     Admin clicks "Confirm Return"
                                  ↓
                     Borrow Record = COMPLETED
                     Item Available Quantity Increases (+1)
                     Item Status restored to AVAILABLE
```

---

## Project Structure

```
campusshare/
├── app/
│   ├── page.tsx                  # Gateway & landing page
│   ├── login/page.tsx            # Student Login
│   ├── register/page.tsx         # Student Registration
│   ├── student/                  # Student Module
│   │   ├── dashboard/page.tsx
│   │   ├── items/page.tsx
│   │   ├── items/[id]/page.tsx
│   │   ├── requests/page.tsx
│   │   ├── borrowed/page.tsx
│   │   └── history/page.tsx
│   ├── admin/                    # Admin Module
│   │   ├── login/page.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── items/page.tsx
│   │   ├── items/add/page.tsx
│   │   ├── items/edit/[id]/page.tsx
│   │   ├── requests/page.tsx
│   │   ├── borrowed/page.tsx
│   │   ├── students/page.tsx
│   │   └── history/page.tsx
│   └── api/                      # REST API routes
├── components/
│   ├── Navbar.tsx
│   ├── Sidebar.tsx
│   ├── ItemCard.tsx
│   ├── SearchBar.tsx
│   ├── RequestTable.tsx
│   ├── StatCard.tsx
│   └── Toast.tsx
├── lib/
│   ├── types.ts                  # Data interfaces
│   ├── utils.ts                  # Date and badge formatters
│   └── supabase/
│       ├── client.ts             # Browser client
│       └── mockStore.ts          # Out-of-the-box local data store
└── supabase/
    └── schema.sql                # SQL tables, RLS policies, seed data
```
