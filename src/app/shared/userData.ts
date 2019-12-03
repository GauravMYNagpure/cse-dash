export interface IUser {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  token?: string;
}

export const Users: IUser[] = [
  {
    id: 1,
    username: "test",
    password: "test",
    firstName: "Test",
    lastName: "User"
  },
  {
    id: 2,
    username: "admin",
    password: "admin",
    firstName: "Admin",
    lastName: "User"
  },
  {
    id: 3,
    username: "user",
    password: "user",
    firstName: "User",
    lastName: "User"
  }
];
