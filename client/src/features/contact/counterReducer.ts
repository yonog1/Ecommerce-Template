export const INCREMENT_COUNTER = "INCREMENT_STATE";
export const DECREMENT_COUNTER = "DECREMENT_STATE";

export interface CounterState {
    data: number;
    title: string;
}

const initialState: CounterState = {
    data: 42,
    title: "YARC",
};

export function increment(amount: number = 1) {
    return {
        type: INCREMENT_COUNTER,
        payload: amount,
    };
}

export function decrement(amount: number = 1) {
    return {
        type: DECREMENT_COUNTER,
        payload: amount,
    };
}

export function counterReducer(state = initialState, action: any) {
    switch (action.type) {
        case INCREMENT_COUNTER:
            return {
                ...state,
                data: state.data + action.payload,
            };

        case DECREMENT_COUNTER:
            return {
                ...state,
                data: state.data - action.payload,
            };

        default:
            return state;
    }
}
