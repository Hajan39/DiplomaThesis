export * from "./networking";

export const CONSTANTS = {
  AUTHORIZATION_SERVER: "http://194.213.222.115/CockpitV3Auth/", // CZ One
  CLIENT_ID: "c2d579bb04ab464d810990fac49fe1c7", // CZ One
  TOC_ENDPOINT: "http://194.213.222.115/CockpitV3/product", // CZ One
  // AUTHORIZATION_SERVER: "http://10.0.2.2/AgentCockpitIdentityService/", // Local One
  // CLIENT_ID: "04d9d58d81754bf9b39b3e63a8345be7", // LOCAL one
  OAUTH_HEADER: {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json",
    "Cache-Control": "private, no-store, max-age=0",
  },
};
