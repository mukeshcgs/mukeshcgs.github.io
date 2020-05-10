import axios from "axios";
//const URL = "http://mukeshthankar.com/wp49/wp-json/wp/v2/pages";
//const URL = "http://localhost/www/mukeshthankar.com/wordpress/wp-json/wp/v2/pages";
const URL = "https://api.quarantine.country/api/v1/summary/latest"

//GET Pages if added
export const getPages = () => (dispatch) => {
    console.log("getPages Called");
    dispatch({
        type: "FETCH_LATEST"
    });
    return axios.get(URL)
        .then((response) => {
            dispatch({
                type: "FETCH_LATEST_FULFILLED",
                payload: response.data
            })
        })
        .catch((err) => {
            dispatch({
                type: "FETCH_LATEST_REJECTED",
                payload: err
            })
        })
}


//GET Single project
export function getRegionData(region) {
        // axios.get(`${URL}/${id}`)
        //     .then((response) => {
        //         dispatch({
        //             type: "FETCH_SINGLE_POST_FULFILLED",
        //             payload: response.data
        //         })
        //         console.log("PROJECT::");
        //         console.log(response.data);
        //     })
        //     .catch((err) => {
        //         dispatch({
        //             type: "FETCH_SINGLE_POST_REJECTED",
        //             payload: err
        //         })
        //     })
    
}