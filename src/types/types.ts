export interface IsUser {
  userId: string;
  email: string;
  userName: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  imageUrl: string | null;
  created: Date;
  createdBy: string;
  lastModified: Date | null;
  lastModifiedBy: Date | null;
  roleId: string;
  roleName: string;
  pinEnabled: boolean;
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
    fadedText: string;
    green: string;
    counter: string;
  };
};
