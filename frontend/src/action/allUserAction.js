import * as httpUtils from '../utils/http';
import * as config from '../configs/appconfig';

export const GET_ALL_USERS = 'GET_ALL_USERS';
export const SET_ALL_USERS = 'SET_ALL_USERS';

export const getAllUsers = () => {
  return function action(dispatch) {
    dispatch({
      type : GET_ALL_USERS
    })
    return httpUtils.get(config.endPoints.allUsers)
            .then(res => {
              dispatch({
                    type : SET_ALL_USERS,
                    payload : res
                })
            })
  }
} 
 