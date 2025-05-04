import dotenv from "dotenv";

dotenv.config({
    path:"./.env"
});

export const config = {
    port:process.env.URL_PORT || 4000,
    db_url:process.env.DB_URL ,
    cors_url:process.env.CORS_URL,
    refresh_token_secret:process.env.REFRESH_TOKEN_SECRET,
    access_token_secret:process.env.ACCESS_TOKEN_SECRET,
    access_token_expiry:process.env.ACCESS_TOKEN_EXPIRY,
    refresh_token_expiry:process.env.REFRESH_TOKEN_EXPIRY,
}

