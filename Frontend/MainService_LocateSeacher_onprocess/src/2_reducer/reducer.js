
import { createStore, applyMiddleware } from "redux";
import {createLogger} from 'redux-logger';

let Url = new URLSearchParams(document.location.search)

const Keyword = () => {
    switch(typeof Url.get('keyword')){
        case('object'): return'';

        case('string'): return Url.get('keyword');
    }
}

export const initial_State = {
    urlObject : Url,
    urlToString : Keyword()
}

export function AppReducer(state = initial_State, action){

    switch(action.type){

        case 'UpdateUrl':{
            state.urlObject.set(action.option, action.param)
            return {...state,
                urlObject : state.urlObject
            };
        }

        case'UpdateKeywords':{
            return {...state,
                urlToString : action.param
            };
        }

        case 'EliminateKeyword':{
            const Exsisted_keywords = state.urlObject.get(action.option).replaceAll(',', ` `).split(' ')
            const Index = Exsisted_keywords.indexOf(action.param)
            Exsisted_keywords.splice( Index, 1 )

            state.urlObject.set(action.option, Exsisted_keywords)
            return {...state,
                urlObject : state.urlObject
            }
        }

        case 'ReturnUrlString':{
            return {...state};
        }

        
        default: return {...state};
    }

}

export const logger = createLogger();
// export const store = createStore(AppReducer, applyMiddleware(logger))
export const store = createStore(AppReducer)


export const ActionCreater = (Applied_type, Applied_option ,Applied_param) => {
    return {
        type: Applied_type,
        option: Applied_option,
        param : Applied_param
    }
}

export default {AppReducer, store} 