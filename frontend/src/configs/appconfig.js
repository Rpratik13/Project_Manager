export const BASE_URL = "http://localhost:5000/api";

export const endPoints = {
  addComment  : '/task/comment/add',
  addTag      : '/task/tag/add',
  getTaggedTask      : '/task/tag/user/',
  addTask     : '/task/create',
  addUser     : '/project/adduser',
  allUsers    : '/users/all',
  allProjects : '/project/all',
  comments    : '/task/comment/',
  createProject : '/project/create',
  deleteComment : '/task/comment/delete',
  deleteProject : '/project/delete',
  deleteTask  : '/task/delete',
  login       : '/auth/login',
  register       : '/auth/register',
  getUserData : '/users/id/',
  getUserByRole : '/users/role/',
  projectById : '/project/id/',
  projectTask : '/task/all/',
  projectUser : '/project/users/',
  removeTag   : '/task/tag/delete',
  removeUser  : '/project/removeuser',
  tags        : '/task/tag/id/',
  taskById    : '/task/id/',
  updateProject : '/project/update',
  updateTask  : '/task/update',
  userByRole  : '/users/role/',
  userDelete  : '/users/delete',
  userProjects : '/users/projects',
  userUpdate  : '/users/update',
};