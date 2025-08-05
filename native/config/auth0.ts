import { Err, Ok, Result } from "neverthrow";
import Auth0 from "react-native-auth0";

export const auth0 = new Auth0({
    domain: process.env.EXPO_PUBLIC_AUTH0_DOMAIN!,
    clientId: process.env.EXPO_PUBLIC_AUTH0_CLIENT_ID!,
})

export const getAccessTokenAuth0 = async (): Promise<Result<string, Error>> => {
    try {
        const credentials = await auth0.credentialsManager.getCredentials();
    return new Ok(credentials.accessToken);
    } catch (error) {
        return new Err(new Error("Failed to get access token"));
    }
}