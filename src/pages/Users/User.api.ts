import type { User } from "../../types/user";

export interface UserFilters {
  role?: User["role"];
  isActive?: boolean;
}

export async function fetchUsers(filters: UserFilters): Promise<User[]> {
  // mock DB
  const mockUsers: User[] = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "admin",
      isActive: true,
    },
    {
      id: "2",
      name: "Priya Sharma",
      email: "priya@example.com",
      role: "manager",
      isActive: true,
    },
    {
      id: "3",
      name: "Ravi Mehta",
      email: "ravi@example.com",
      role: "viewer",
      isActive: false,
    },
  ];

  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = mockUsers.filter((u) => {
        if (filters.role && u.role !== filters.role) return false;
        if (filters.isActive !== undefined && u.isActive !== filters.isActive)
          return false;
        return true;
      });
      resolve(filtered);
    }, 600);
  });
}

export async function toggleUserStatus(
  id: string,
  isActive: boolean,
): Promise<{ success: true }> {
  // mock network latency
  console.log("id: ", id);
  console.log("isActive: ", isActive);

  return new Promise((resolve) =>
    setTimeout(() => resolve({ success: true }), 300),
  );
}
