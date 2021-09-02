const REQUEST_LOGIN = "request_login";
const UPDATE_USER_LOGIN = "update_user_login";
const CHANGE_APP_ON_LAUNCH = "change_app_on_launch";
const UPDATE_MEMBERID = "update_member_id";
const GET_MEMBER = "get_member";
const UPDATE_MEMBER = "update_member";
const GET_REFEREE_LIST = "get_referee_list";
const UPDATE_REFEREE_LIST = "update_referee_list";
const GET_POINT_LIST = "get_point_list";
const UPDATE_POINT_LIST = "update_point_list";

export const types = {
  REQUEST_LOGIN,
  UPDATE_USER_LOGIN,
  CHANGE_APP_ON_LAUNCH,
  UPDATE_MEMBERID,
  GET_MEMBER,
  UPDATE_MEMBER,
  GET_REFEREE_LIST,
  UPDATE_REFEREE_LIST,
  GET_POINT_LIST,
  UPDATE_POINT_LIST,
};

const requestLogin = (payload) => ({
  type: REQUEST_LOGIN,
  payload,
});

const updateMemberID = (payload) => ({
  type: UPDATE_MEMBERID,
  payload,
});

const getMember = (payload) => ({
  type: GET_MEMBER,
  payload,
});

const updateMember = (data) => ({
  type: UPDATE_MEMBER,
  data,
});

const updateUserLogin = (response) => ({
  type: UPDATE_USER_LOGIN,
  response,
});

const changeAppOnLaunch = () => ({
  type: CHANGE_APP_ON_LAUNCH,
});


const getRefereeList = (payload) => ({
  type: GET_REFEREE_LIST,
  payload,
});

const updateRefereeList = (data) => ({
  type: UPDATE_REFEREE_LIST,
  data,
});

const getPointList = (payload) => ({
  type: GET_POINT_LIST,
  payload,
});

const updatePointList = (data) => ({
  type: UPDATE_POINT_LIST,
  data,
});

export const actions = {
  requestLogin,
  updateUserLogin,
  changeAppOnLaunch,
  updateMemberID,
  updateMember,
  getMember,
  getRefereeList,
  updateRefereeList,
  getPointList,
  updatePointList,
};

const initialState = {
  loggedIn: false,
  authorize: null,
  appOnLaunch: true,
  memberID: null,
  member: null,
  refereeList: null,
  pointList: null,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_USER_LOGIN: {
      return {
        ...state,
        authorize: action.response,
      };
    }
    case CHANGE_APP_ON_LAUNCH: {
      return {
        ...state,
        appOnLaunch: false,
      };
    }
    case UPDATE_MEMBERID: {
      return {
        ...state,
        memberID: action.payload,
      };
    }
    case UPDATE_MEMBER: {
      return {
        ...state,
        member: action.data,
      };
    }
    case UPDATE_REFEREE_LIST: {
      return {
        ...state,
        refereeList: action.data,
      };
    }
    case UPDATE_POINT_LIST: {
      return {
        ...state,
        pointList: action.data,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default reducer;
