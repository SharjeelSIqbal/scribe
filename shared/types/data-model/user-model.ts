type UserModel = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  updatedAt?: Date | null;
};

export type { UserModel };
