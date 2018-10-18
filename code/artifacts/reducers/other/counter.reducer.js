const initialState = {
    value: undefined,
};
const CounterReducer = (state = initialState, action) => {
    if (action.type === "ADD") {
        return Object.assign({}, state, { value: state.value ? state.value + action.value : action.value });
    }
    if (action.type === "REMOVE") {
        return Object.assign({}, state, { value: state.value ? state.value - action.value : -action.value });
    }
    return state;
};
export function Add() {
    return AddBy(1);
}
export function AddBy(n) {
    return ({ type: "ADD", value: n });
}
export function Remove() {
    return RemoveBy(1);
}
export function RemoveBy(n) {
    return ({ type: "REMOVE", value: n });
}
export default CounterReducer;
