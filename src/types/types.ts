export interface IsUser {
  id: number;
  username: string;
  email: string;
  fullname: string;
  home_id: number;
  tag_id: number;
  phone: string;
  token: string;
  email_verified: boolean;
  updated_at: Date;
  created_at: Date;
}

export interface IsBillCategory {
  billCategoryId: number;
  billCategoryName: string;
}

export interface IsBillProvider {
  billCode: string;
  billCategoryId: number;
  minAmount: number;
  maxAmount: number;
}

export interface IsError {
  data: null | {};
  message: string;
}

// export interface IPostResponse {
//   id: string;
//   title: string;
//   content: string;
//   image: string;
//   category: string;
//   user: IUser;
//   created_at: string;
//   updated_at: string;
// }
