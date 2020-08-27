import * as httpUtils from '../utils/http';
import * as config from '../configs/appconfig';


export const SET_PROJECT = 'SET_PROJECT';
export const GET_MY_PROJECT = 'GET_MY_PROJECT';


export const getMyProjects = () => {
  return function action(dispatch) {
    dispatch({
      type : GET_MY_PROJECT
    })
    return httpUtils.get(config.endPoints.userProjects)
            .then(res => {
                
                dispatch({
                  type : SET_PROJECT,
                  payload : res
                })
            })

  }
}