export * from "./networking";
export const CONSTANTS = {
    TOC_ENDPOINT: "http://10.0.2.2/Cockpit/product",
    AUTHORIZATION_SERVER: "http://10.0.2.2/AgentCockpitIdentityService/", // Local One
    ENTERPRISE_SERVER: "http://10.0.2.2/AgentCockpitEnterpriseService/", // Local One
    CLIENT_ID: "04d9d58d81754bf9b39b3e63a8345be7", // LOCAL one
    OAUTH_HEADER: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
        "Cache-Control": "private, no-store, max-age=0",
    },
};
