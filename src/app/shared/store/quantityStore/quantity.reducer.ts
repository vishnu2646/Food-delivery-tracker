import { createReducer, on } from "@ngrx/store";
import { initialQuantityState } from "./quantity.state";
import { decreaseQuantity, increaseQuantity } from "./quantity.actions";

export const _quantityReducer = createReducer(initialQuantityState, 
    on(increaseQuantity, (state) => {
        return {
            ...state,
            quantity: state.quantity + 1
        }
    }),
    on(decreaseQuantity, (state) => {
        return {
            ...state,
            quantity: state.quantity - 1
        }
    })
) 

export function quantityReducer(state: any, action: any) {
    return _quantityReducer(state, action);
}