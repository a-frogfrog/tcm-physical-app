import Cookies from 'js-cookie'

const token_key = "HYCXYGYHCNM_Token";

export const set_token = (value) => {
    Cookies.set(token_key, value);
}

export const get_token = () => {
    return Cookies.get(token_key);
}

export const remove_token = () => {
    Cookies.remove(token_key);
}