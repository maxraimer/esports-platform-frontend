import axios from "axios";

const apiGatewayAddress = process.env.REACT_APP_DEVMODE ? process.env.REACT_APP_API_ADRESS_DEV : process.env.REACT_APP_API_ADRESS_PROD;

export const api_login = async (login, password) => {
    try {
        const response = await axios.post(`${apiGatewayAddress}/auth/login`, {username: login, password});

        if (response.status === 200) {
            return {
                status: response.status,
                data: response.data
            }
        } else {
            throw new Error('Invalid response from API Gateway');
        }

    } catch (error) {
        if (error.response) {
            return {
                status: error.response.status,
                message: error.response.data?.message || 'Server error',
                error: error.message
            }
        } else if (error.request) {
            return {
                status: 503, 
                message: 'API Gateway is unavailable', 
                error: error.message};
        } else {
            return {
                status: 500,
                message: 'Unexpected error occured',
                error: error.message
            }
        }
    }
}

export const api_signup = async (login, email, password, firstName, lastName, nickName) => {
    try {
        const response = await axios.post(`${apiGatewayAddress}/auth/register`, {
            login,
            password,
            email,
            firstName,
            lastName,
            nickName
        });

        if (response.status === 201) {
            return {
                status: response.status,
                data: response.data
            }
        } else {
            throw new Error('Invalid response from API Gateway');
        }

    } catch (error) {
        if (error.response) {
            return {
                status: error.response.status,
                message: error.response.data?.message || 'Server error',
                error: error.message
            }
        } else if (error.request) {
            return {
                status: 503, 
                message: 'API Gateway is unavailable', 
                error: error.message};
        } else {
            return {
                status: 500,
                message: 'Unexpected error occured',
                error: error.message
            }
        }
    }
}

export const api_getProfile = async (id) => {
    try {
        const response = await axios.get(`${apiGatewayAddress}/profile/${id}`);

        if (response.status === 200) {
            return {
                status: response.status,
                data: response.data
            }
        } else {
            throw new Error('Invalid response from API Gateway');
        }
    } catch (error) {
        if (error.response) {
            return {
                status: error.response.status,
                message: error.response.data?.message || 'Server error',
                error: error.message
            }
        } else if (error.request) {
            return {
                status: 503, 
                message: 'API Gateway is unavailable', 
                error: error.message};
        } else {
            return {
                status: 500,
                message: 'Unexpected error occured',
                error: error.message
            }
        }
    }
}