type TagModel = {
  id: string;
  title: string;
  name: string;
  borderColor?: string;
  textColor?: string;
  backgroundColor?: string;
  createdAt: Date;
  updatedAt?: Date | null;
};

export type { TagModel };
