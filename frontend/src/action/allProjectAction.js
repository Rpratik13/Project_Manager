import * as httpUtils from '../utils/http';
import * as config from '../configs/appconfig';

export const GET_PROJECTS = 'GET_PROJECTS';
export const SET_PROJECTS = 'SET_PROJECTS';

export const getProjects = () => {
  return function action(dispatch) {
    dispatch({
      type : GET_PROJECTS
    })
    return httpUtils.get(config.endPoints.allProjects)
                .then(res => {
                  if (res.length) {
                  dispatch({
                    type : SET_PROJECTS,
                    payload : res
                  })
                }
            })
            .catch(err => console.log(err));
  }
} 
 