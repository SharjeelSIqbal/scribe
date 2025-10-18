import { UserModel } from '@shared/types/data-model/user-model';

const demoUser: UserModel = {
  id: 'user_12345',
  firstName: 'Sample',
  lastName: 'User',
  email: 'sample.user@example.com',
  createdAt: new Date(),
  updatedAt: null,
};

export default demoUser;
