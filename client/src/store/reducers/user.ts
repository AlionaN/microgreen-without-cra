import { imgToBase64 } from 'server/utilities/imgToBase64';
import * as ACTIONS_TYPES from '@/store/actionTypes/user';
import { AnyAction, Reducer } from 'redux';
import * as helpers from '../helpers';


const initialState = {
  user: {},
  registerStatus: helpers.getDefaultState()
}

export const userReducer: Reducer = (state = initialState, action: AnyAction) => {

  switch(action.type) {
    case ACTIONS_TYPES.REGISTER:
      console.log(action.payload);
      return {
        ...state,
        registerStatus: helpers.getRequestState()
      }
    
    case ACTIONS_TYPES.REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        registerStatus: helpers.getSuccessState(action.payload)
      }

    case ACTIONS_TYPES.REGISTER_FAILURE:
      return {
        ...state,
        registerStatus: helpers.getErrorState('Something went wrong')
      }

    case ACTIONS_TYPES.CLEAR_REGISTER_STATUS:
      return {
        ...state,
        user: {},
        registerStatus: helpers.getDefaultState()
      }
    default:
      return state;
  }
}
