import { Action, ManyData, State, User, FollowData } from '../interfaces/auth';
import {
    START_LOADING,
    END_LOADING,
    START_MINI_LOADING,
    END_MINI_LOADING
} from '../constants/action';
import {
    AUTH,
    SIGNUP,
    LOGIN,
    LOGOUT,
    GET_USER_BY_ID,
    FOLLOW_USER,
    UNFOLLOW_USER,
    UPDATE_PROFILE,
    REMOVE_SELECTED_USER
} from '../constants/auth';

const initialState = {
    isLoading: false,
    isMiniLoading: false,
    user: null,
    token: '',
    users: [],
    selectedUser: null
};

const authReducer = (state: State = initialState, action: Action) => {
    switch(action.type) {
        case START_LOADING:
            if(action.for !== AUTH) return state;
            return { ...state, isLoading: true };
        case END_LOADING:
            if(action.for !== AUTH) return state;
            return { ...state, isLoading: false };
        case START_MINI_LOADING:
            if(action.for !== AUTH) return state;
            return { ...state, isMiniLoading: true };
        case END_MINI_LOADING:
            if(action.for !== AUTH) return state;
            return { ...state, isMiniLoading: false };
        case SIGNUP:
        case LOGIN:
            localStorage.setItem('HappenifyToken',  (action?.data as ManyData)?.token || '');
            return {
                ...state,
                user: (action?.data as ManyData)?.user,
                token: (action?.data as ManyData)?.token
            };
        case LOGOUT:
            localStorage.removeItem('HappenifyToken');
            return initialState;
        case GET_USER_BY_ID:
            return { ...state, selectedUser: action?.data };
        case FOLLOW_USER:
            return {
                ...state,
                user: { ...state.user, following: [...(state.user as User).following, (action?.data as FollowData).newFollowing] },
                selectedUser: { ...state.selectedUser, followers: [...(state.selectedUser as User).followers, (action?.data as FollowData).newFollower] }
            };
        case UNFOLLOW_USER:
            const newFollowing = state.user?.following.filter((followedUser) => followedUser.id.toString() !== action?.data);
            const newFollowers = state.selectedUser?.followers.filter((follower) => follower.id !== state.user?._id);
            return {
                ...state,
                user: { ...state.user, following: newFollowing },
                selectedUser: state.user?._id.toString() === state.selectedUser?._id.toString() ? { ...state.user, following: newFollowing } : { ...state.selectedUser, followers: newFollowers }
            };
        case UPDATE_PROFILE:
            return { ...state, user: action?.data };
        case REMOVE_SELECTED_USER:
            return { ...state, selectedUser: null };
        default:
            return state;
    }
};

export default authReducer;