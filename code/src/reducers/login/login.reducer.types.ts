export type Steps = 1 | 2 | 3;
export type TokenTypes = "bearer";
export class LoginReducerState {
  public loading?: boolean;
  public phoneNumber?: string;
  public representativeId?: string;
  public errorMessage?: string;
  public errorCode?: string;
  public smsCode?: string;
  public validationToken?: string;
  public accessToken?: string;
  public tokenType?: TokenTypes;
  public expiresIn?: number;
  public created?: Date;
  public step?: Steps;

  public static assign(...params: Partial<LoginReducerState>[]): LoginReducerState {
    return Object.assign({}, ...params);
  }
}

export type BodyType = {
  username: string;
  password: string;
  grant_type: "password";
  type: "no2f" | "2f";
  client_id: string;
  validationToken?: string;
  validationText?: string;
};

export const initialState: LoginReducerState = {
  loading: false,
  step: 1,
  validationToken: null,
  errorMessage: null,
  errorCode: null,
  accessToken: null,
  phoneNumber: null,
  representativeId: null,
  tokenType: null,
  expiresIn: null,
  created: null,
};
