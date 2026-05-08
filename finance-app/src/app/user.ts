export interface User {
  id: number;
  username: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
}

export interface Account {
  id: number,
  userId: number,
  accountType: string,
  balance: number,
}