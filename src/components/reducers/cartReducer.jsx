const initialData = {
    cart_items: [],
    shipping_info: {}
}

const cartReducer = (state = initialData, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            return { ...state, cart_items: [...state.cart_items, action.payload] }

        case "REMOVE_FROM_CART":
            let idToRemove = action.payload
            return { ...state, cart_items: state.cart_items.filter(item => item.id != idToRemove) }

        case "EMPTY_CART":
            return {...state, cart_items: []}

        case "SAVE_SHIPPING_INFO":
            return { ...state, shipping_info: action.payload }

        default:
            return state
    }
}

export default cartReducer