export interface User {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  role: "admin" | "manager" | "viewer";
}
