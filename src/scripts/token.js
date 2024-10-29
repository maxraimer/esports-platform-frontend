import { jwtDecode } from "jwt-decode";

export const getDataFromToken = (token) => {
    if (token) {
        return jwtDecode(token);
    }
}

export const getUserDataFromToken = (token) => {
    const decodedToken = getDataFromToken(token);
    return {id: decodedToken.id, username: decodedToken.username};
}

export const getTokenExpiration = (token) => {
    if (token) {
        const decodedToken = getDataFromToken(token);
        if (decodedToken.exp) {
            return decodedToken.exp * 1000;
        } else {
            return 0;
        }
    }    
}

export const isTokenExpired = (token) => {
    if (token) {
        const exp = getTokenExpiration(token);
        if (exp) {
            return exp * 1000 < Date.now();
        } else {
            return true;
        }
    }
}