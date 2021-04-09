import axios from "axios";

const URL = "http://mukeshthankar.com/wp49/wp-json/wp/v2/pages";
// const URL = "http://localhost/www/mukeshthankar.com/wordpress/wp-json/wp/v2/pages";


//GET Pages if added
export const getPages = () => (dispatch) => {
    dispatch({
        type: "FETCH_PAGES"
    });
    return axios.get(URL)
        .then((response) => {
            dispatch({
                type: "FETCH_PAGES_FULFILLED",
                payload: response.data
            })
        })
        .catch((err) => {
            dispatch({
                type: "FETCH_PAGES_REJECTED",
                payload: err
            })
        })
}
