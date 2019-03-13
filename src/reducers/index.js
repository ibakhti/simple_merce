import {combineReducers} from 'redux'

const init = {
    id : '',
    username: '',
    error: '',
    success: ''
}

const AuthReducer = (state = init, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {...state, id: action.payload.id, username: action.payload.username}
        
        case 'AUTH_ERROR' :
            return {...state, error: action.payload, success: ''}

        case 'AUTH_SUCCESS':
            return {...state, error: '', success : action.payload}
            
        case 'AUTH_NO_MESS':
            return {...state, error: '', success: ''}
        
        case 'LOGOUT_USER':
            window.location.pathname= '/'
            return {...init}
    
        default:
            return state
    }
}

export default combineReducers(
    {
        auth: AuthReducer
    }
)