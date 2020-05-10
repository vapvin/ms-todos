import React, {useReducer, createContext, useContext, useRef} from 'react';

const initalTodoItmes = [];

function listReducer(state, action){
    switch (action.type){
        case 'CREATE':
            return state.concat(action.todo);
        case 'TOGGLE':
            return state.map(
                todo => todo.id === action.id ? {...todo, done: !todo.done} : todo
            );
        case 'REMOVE':
            return state.filter(todo => todo.id !== action.id);
        default:
            throw new Error(`에러 ${action.type}`);
    }
}

const ListStateContext = createContext();
const ListDispatchContext = createContext();
const ListNextIdContext = createContext();

export function ListProvider({children}){
    const [state, dispatch] = useReducer(listReducer, initalTodoItmes);
    const nextId = useRef(5);
    return (
        <ListStateContext.Provider value={state}>
            <ListDispatchContext.Provider value={dispatch}>
                <ListNextIdContext.Provider value={nextId}>
                    {children}
                </ListNextIdContext.Provider>
            </ListDispatchContext.Provider>
        </ListStateContext.Provider>
    )
}

export function useListState(){
    const context = useContext(ListStateContext);
    if(!context){
        throw new Error("Error!");
    }
    return context;
}

export function useListDispatch(){
    const context = useContext(ListDispatchContext);
    if(!context){
        throw new Error("Error!");
    }
    return context;
}

export function useListNextId(){
    const context = useContext(ListNextIdContext);
    if(!context){
        throw new Error("Error!");
    }
    return context;
}