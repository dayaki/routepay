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

export interface IsDataPlan {
  amount: string;
  dataCode: string;
  dataName: string;
  status: boolean;
}

export interface IsError {
  data: null | {};
  message: string;
}

export interface ModalProps {
  selectedNetwork: IsBillProvider | undefined;
  show: boolean;
  data: IsBillProvider[];
  onClose: () => void;
  title: string;
  onSelect: (text: IsBillProvider) => void;
}

export interface DataProps {
  title: string;
  show: boolean;
  selectedNetwork: IsDataPlan | undefined;
  networkName: string;
  data: IsDataPlan[];
  onClose: () => void;
  onSelect: (text: IsDataPlan) => void;
}

export type Theme = {
  dark: boolean;
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
    pagination: string;
    input: string;
    inputColor: string;
    pink300: string;
    woodsmoke: string;
    dash: string;
    selector: string;
    navTitle: string;
  };
};

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
