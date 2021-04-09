import axios from "axios";

//GET Contact info if added
export function getConatcInfo() {
    return (dispatch) => {
        axios.get("http://localhost:8080/api/contactinfo")
            .then((response) => {
                dispatch({
                    type: "FETCH_CONTACT_INFO_FULFILLED",
                    payload: response.data.contact_data
                })
            })
            .catch((err) => {
                dispatch({
                    type: "FETCH_CONATCT_INFO_REJECTED",
                    payload: err
                })
            })
    }
}


//POST Form Values
export function submitFormValues(values) {
    //console.log(values);
    return (dispatch) => {
        axios.post("http://localhost:8080/api/add_contactinfo", values)
            .then((response) => {
                /*dispatch({
                    type: "FETCH_CONTACT_INFO_FULFILLED",
                    fetching: false,
                    fetched: true
                })*/
            })
            .catch((err) => {
                /*dispatch({
                    type: "FETCH_CONATCT_INFO_REJECTED",
                    fetching: false,
                    fetched: false,
                    payload: err
                })*/
            })
    }
}
