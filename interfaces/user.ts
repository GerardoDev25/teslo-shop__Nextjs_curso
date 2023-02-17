export interface IUser {
  _id: string;
  email: string;
  name: string;
  password?: string;
  role: string;

  createAt: string;
  updateAt: string;
}
