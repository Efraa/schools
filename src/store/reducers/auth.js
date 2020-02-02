// import { generateToken } from '../../utils/jwt'
import { types } from '../types'
const {
  LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SET_CURRENT_USER,
  LOGOUT,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  FORGOT_PASSWORD_LOADING,
  FORGOT_PASSWORD_SUCCESS,
  RESET_PASSWORD_GET_USER_SUCCESS,
  FORGOT_PASSWORD_FAIL,
} = types

const initialState = {
  token: localStorage.getItem('token'),
  isAuth: null,
  loading: true,
  state: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      localStorage.setItem('token', action.token)
      return {
        ...state,
      }
    case SET_CURRENT_USER:
      return {
        ...state,
        state: action.msg,
        user: action.user,
        isAuth: true,
        loading: false,
      }
    case LOADED:
      return {
        ...state,
        loading: false,
      }
    case FORGOT_PASSWORD_LOADING:
      return {
        ...state,
        forgotPassIsLoading: true,
      }
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        emailSended: true,
      }
    case FORGOT_PASSWORD_FAIL:
      return {
        ...state,
        emailSended: undefined,
      }
    case RESET_PASSWORD_GET_USER_SUCCESS:
      return {
        ...state,
        resetPassword: {
          user: action.user,
        },
      }
    case SIGNUP_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        isAuth: false,
        user: null,
        loading: false,
      }
    default:
      return {
        ...state,
        state: action.msg,
        forgotPassIsLoading: undefined,
      }
  }
}
