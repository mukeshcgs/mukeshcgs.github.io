import * as types from '../../constants/constants'

export default function reducer(state = {
    projects:[],
    fetching: false,
    fetched: false,
    error: null
}, action) { 

    switch (action.type) {
        case types.FETCH_POSTS:
            {
                return {...state, fetching: false, fetched: false, error: action.payload }
            }
        case types.FETCH_POSTS_FULFILLED:
            {
                return {...state, fetching: false, fetched: true, projects: action.payload }
            }
        case types.FETCH_POSTS_REJECTED:
            {
                return {...state, fetching: false, fetched: false, error: action.payload  }
            }
    }
    return state
}