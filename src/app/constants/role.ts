export const userRoles = {
  ADMIN: "admin",
  RIDER: "rider",
  DRIVER: "driver",
} as const;

export type UserRole = (typeof userRoles)[keyof typeof userRoles];
