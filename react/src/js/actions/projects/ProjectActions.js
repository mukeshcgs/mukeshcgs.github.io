import axios from "axios";


// const URL = "https://mukeshthankar.com/wp49/wp-json/wp/v2/pages";
const URL = "http://localhost/www/mukeshthankar.com/wordpress/wp-json/wp/v2/pages";

//GET Project
export function getProjects() {
    return (dispatch) => {
        axios.get(URL)
            .then((response) => {
                dispatch({
                    type: "FETCH_POSTS_FULFILLED",
                    payload: response.data
                })
                //console.log("Response Data::");
                //console.log(response.data);
            })
            .catch((err) => {
                dispatch({
                    type: "FETCH_POSTS_REJECTED",
                    payload: err
                })
            })
    }
}

//GET Single project
export function getProject(id) {
    console.log("getProject(id)");
    return (dispatch) => {
        axios.get(`${URL}/${id}`)
            .then((response) => {
                dispatch({
                    type: "FETCH_SINGLE_POST_FULFILLED",
                    payload: response.data
                })
                console.log("PROJECT::");
                console.log(response.data);
            })
            .catch((err) => {
                dispatch({
                    type: "FETCH_SINGLE_POST_REJECTED",
                    payload: err
                })
            })
    }
}