import { UserProfile } from "../types";

/**
 * Mock User Profile Data
 */
export const mockUserProfile: UserProfile = {
  id: "user-123",
  email: "john.doe@company.com",
  name: "John Doe",
  role: "Manager",
  department: "Sales",
  permissions: ["view_products", "view_orders", "view_customers", "edit_products"],
};
