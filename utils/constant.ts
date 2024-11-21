const DEVELOPMENT_DOMAIN = "http://localhost:3000";
const PRODUCTION_DOMAIN = "https://yc-directory-sand.vercel.app";




export const DOMAIN = process.env.NODE_ENV === "production" ?
  PRODUCTION_DOMAIN : DEVELOPMENT_DOMAIN;