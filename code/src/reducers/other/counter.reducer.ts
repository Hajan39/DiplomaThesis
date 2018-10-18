import { Action, Reducer } from "redux";

interface MyAction extends Action {
  type: "ADD" | "REMOVE";
  value: number;
}

interface State {
  value?: number;
}

const initialState: State = {
  value: undefined,
};

const CounterReducer: Reducer<State> = (state: State = initialState, action: MyAction) => {
  if (action.type === "ADD") {
    return Object.assign({}, state, { value: state.value ? state.value + action.value : action.value });
  }
  if (action.type === "REMOVE") {
    return Object.assign({}, state, { value: state.value ? state.value - action.value : -action.value });
  }
  return state;
};

export function Add(): MyAction {
  return AddBy(1);
}
export function AddBy(n: number): MyAction {
  return ({ type: "ADD", value: n });
}

export function Remove(): MyAction {
  return RemoveBy(1);
}
export function RemoveBy(n: number): MyAction {
  return ({ type: "REMOVE", value: n });
}

export default CounterReducer;
