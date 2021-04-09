// CREATE_POST
// CREATE_POST_SUCCESS
// CREATE_POST_FAILURE
// NEW_POST_RESET
export default (state = null, action) => {
    switch (action.type) {
        case "CREATE_POST":{
            return { ...state, posting: false, posted: false, error: action.payload }
        }
        case "CREATE_POST_SUCCESS":{
        	return { ...state, posting: false, posted: true, activity: action.payload }
        }
        case "CREATE_POST_FAILURE":{
        	return { ...state, posting: false, posted: false, error: action.payload }
        }
        case "NEW_POST_RESET":{
        	return { ...state, posting: false, posted: false, error: action.payload }
        }
    }
    return state
}
