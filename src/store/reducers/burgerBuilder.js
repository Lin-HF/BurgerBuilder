import * as actionType from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.ADD_INGREDIENTS:
            const newIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
            const updatedIngredients = updateObject(state.ingredients, newIngredient);
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
            return updateObject(state, updatedState);
        case actionType.REMOVE_INGREDIENTS:
                const newIng = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1};
                const updatedIngs = updateObject(state.ingredients, newIng);
                const updatedSt = {
                    ingredients: updatedIngs,
                    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
                };
                return updateObject(state, updatedSt);
        case actionType.SET_INGREDIENTS:
            return updateObject(state, {
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                totalPrice: 4,
                error: false
            });     
        case actionType.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, {error: true}) 
        
        default:
            return state
    }
}

export default reducer;