export interface AuthModel {
  token: string;
}

export interface UserAddressModel {
  addressLine: string;
  city: string;
  state: string;
  postCode: string;
}

export interface UserCommunicationModel {
  email: boolean;
  sms: boolean;
  phone: boolean;
}

export interface UserEmailSettingsModel {
  emailNotification?: boolean;
  sendCopyToPersonalEmail?: boolean;
  activityRelatesEmail?: {
    youHaveNewNotifications?: boolean;
    youAreSentADirectMessage?: boolean;
    someoneAddsYouAsAsAConnection?: boolean;
    uponNewOrder?: boolean;
    newMembershipApproval?: boolean;
    memberRegistration?: boolean;
  };
  updatesFromKeenthemes?: {
    newsAboutKeenthemesProductsAndFeatureUpdates?: boolean;
    tipsOnGettingMoreOutOfKeen?: boolean;
    thingsYouMissedSindeYouLastLoggedIntoKeen?: boolean;
    newsAboutStartOnPartnerProductsAndOtherServices?: boolean;
    tipsOnStartBusinessProducts?: boolean;
  };
}

export interface UserSocialNetworksModel {
  linkedIn: string;
  facebook: string;
  twitter: string;
  instagram: string;
}

export type UserModel = CheckTokenResponse;

export type LoginResponse = {
  token: string;
};

export type CheckTokenResponse = {
  id: number;
  email?: string;
  password?: string;
  phoneNumber: string;
  shopId: number;
  token?: string;
  Shop: {
    id: string;
    name: string;
    location: string;
    status: "0" | "1";
    postCost: string;
    packagingCost: string;
  };
  permissions: string[];
};
