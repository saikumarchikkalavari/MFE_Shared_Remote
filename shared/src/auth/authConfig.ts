import { Configuration, PopupRequest } from "@azure/msal-browser";

// Azure AD MSAL Configuration
export const msalConfig: Configuration = {
  auth: {
    clientId: "your-client-id-here",
    authority: "https://login.microsoftonline.com/your-tenant-id-here",
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: "localStorage",
  },
};

// Scopes for login
export const loginRequest: PopupRequest = {
  scopes: ["User.Read", "openid", "profile", "email"],
};

// Scopes for API access token
export const tokenRequest = {
  scopes: ["User.Read", "openid", "profile", "email"],
};
