import { Action, ManyData, Event } from '../interfaces/event';
import {
    START_LOADING,
    END_LOADING,
    START_MINI_LOADING,
    END_MINI_LOADING,
    RESET_PAGE
} from '../constants/action';
import {
    EVENT,
    CREATE_EVENT,
    GET_EVENTS,
    GET_MORE_EVENTS,
    GET_EVENT_BY_ID,
    REMOVE_SELECTED_EVENT,
    GET_USER_EVENTS,
    GET_MORE_USER_EVENTS,
    SEARCH_EVENTS,
    GET_MORE_SEARCHED_EVENTS,
    DELETE_EVENT
} from '../constants/event';

const initialState = {
    isLoading: false,
    isMiniLoading: false,
    page: 1,
    limit: 5,
    totalPages: 1,
    events: [],
    selectedEvent: null
};

const eventReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case START_LOADING:
            if(action.for !== EVENT) return state;
            return { ...state, isLoading: true };
        case END_LOADING:
            if(action.for !== EVENT) return state;
            return { ...state, isLoading: false };
        case START_MINI_LOADING:
            if(action.for !== EVENT) return state;
            return { ...state, isMiniLoading: true };
        case END_MINI_LOADING:
            if(action.for !== EVENT) return state;
            return { ...state, isMiniLoading: false };
        case CREATE_EVENT:
            return { ...state, events: [action?.data, ...state.events] };
        case GET_EVENTS:
        case GET_USER_EVENTS:
        case SEARCH_EVENTS:
            return {
                ...state,
                events: (action?.data as ManyData)?.events,
                page: (action?.data as ManyData)?.page,
                totalPages: (action?.data as ManyData)?.totalPages
            };
        case GET_MORE_EVENTS:
        case GET_MORE_USER_EVENTS:
        case GET_MORE_SEARCHED_EVENTS:
            return {
                ...state,
                events: [...state.events, ...(action?.data as ManyData)?.events],
                page: (action?.data as ManyData)?.page,
                totalPages: (action?.data as ManyData)?.totalPages
            };
        case GET_EVENT_BY_ID:
            return { ...state, selectedEvent: action?.data };
        case REMOVE_SELECTED_EVENT:
            return { ...state, selectedEvent: null };
        case RESET_PAGE:
            if(action.for !== EVENT) return state;
            return { ...state, events: [], page: 1, totalPages: 1 };
        case DELETE_EVENT:
            return {
                ...state,
                events: (state.events as Event[]).filter((event) => event?._id.toString() !== action?.data)
            };
        default:
            return state;
    }
};

export default eventReducer;