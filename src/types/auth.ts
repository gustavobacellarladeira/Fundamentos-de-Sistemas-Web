export interface UserInfos {
  email: string;
  // qualquer outra informação que você queira adicionar
  [key: string]: unknown;
}

export interface UserInfosResponse {
  email: string;
  tipo: string;
  id: string;
}

export interface UserInfosError {
  error: string;
  data?: UserInfos;
}
