import * as types from '../../constants/constants'

export default function reducer(state = {
    fetching: false,
    fetched: false,
    error: null
}, action) {

    switch (action.type) {
        case types.FETCH_CONTACT_INFO:
            {
                return {...state, fetching: false, fetched: false, error: action.payload }
            }
        case types.FETCH_CONTACT_INFO_FULFILLED:
            {
                return {...state, fetching: false, fetched: true, contact_info_data21: action.payload }
            }
        case types.FETCH_CONATCT_INFO_REJECTED:
            {
                return {...state, fetching: false, fetched: false, error: action.payload  }
            }
    }
    return state
}