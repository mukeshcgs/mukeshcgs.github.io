import * as types from '../../constants/constants'

export default function reducer(state = {
    pages:[],
    isFetching: false,
    fetched: false,
    error: null
}, action) {

    switch (action.type) {
        case types.FETCH_PAGES:
            {
                return {...state, isFetching: true, fetched: false, error: action.payload }
            }
        case types.FETCH_PAGES_FULFILLED:
            {
                return {...state, isFetching: false, fetched: true, pages: action.payload }
            }
        case types.FETCH_PAGES_REJECTED:
            {
                return {...state, isFetching: false, fetched: false, error: action.payload  }
            }
    }
    return state
}