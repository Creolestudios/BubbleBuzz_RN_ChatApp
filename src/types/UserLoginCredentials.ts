export type UserLoginCredentials = {
  email: string;
  password: string;
  onSuccess: () => void;
  onFailure: (err:any) => void;
};

export type UserLogoutCredential = {
  userId: any;
};
