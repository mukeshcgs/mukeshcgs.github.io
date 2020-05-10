import axios from "axios";

export function postForm() {
  return (dispatch) => {
      axios.post("http://localhost:8080/api/profile", data)
      .then((response) => {
        dispatch({ type: "CREATE_POST_SUCCESS",  })
        console.log("POSTING....." )
      })
      .catch((err) => {
        dispatch({ type: "CREATE_POST_FAILURE", payload: err })
        //console.log(err)
      })
  }
}


