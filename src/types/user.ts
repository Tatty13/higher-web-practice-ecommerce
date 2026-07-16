export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  language?: 'ru' | 'en';
  notifyByEmail?: boolean;
  createdAt: string;
  password: string;
};

export type UserProfile = Omit<User, 'password'>;

export type RegisterPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type UpdateProfilePayloadData = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
};

export type UpdateProfilePayload = {
  userId: string;
  data: UpdateProfilePayloadData;
};

export type ChangeUserLanguagePayload = {
  userId: string;
  language: User['language'];
};

export type ChangeUserNotificationPayload = {
  userId: string;
  notifyByEmail: boolean;
};
