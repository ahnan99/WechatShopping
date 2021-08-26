const REQUEST_LOGIN = "request_login";
const UPDATE_USER_LOGIN = "update_user_login";
const CHANGE_APP_ON_LAUNCH = "change_app_on_launch";
const UPDATE_MEMBERID = "update_member_id";
const GET_MEMBER = "get_member";
const UPDATE_MEMBER = "update_member";

export const types = {
  REQUEST_LOGIN,
  UPDATE_USER_LOGIN,
  CHANGE_APP_ON_LAUNCH,
  UPDATE_MEMBERID,
  GET_MEMBER,
  UPDATE_MEMBER,
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

export const actions = {
  requestLogin,
  updateUserLogin,
  changeAppOnLaunch,
  updateMemberID,
  updateMember,
  getMember,
};

const initialState = {
  loggedIn: false,
  authorize: null,
  appOnLaunch: true,
  memberID: null,
  member: null,
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
    default: {
      return {
        ...state,
      };
    }
  }
};

export default reducer;
