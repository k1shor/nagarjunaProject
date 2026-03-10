const initialData = {
    items: []
}

const itemReducer = (state = initialData, action) => {
    switch (action.type) {
        case "LOAD":
            console.log(action)
            return { items: action.payload }

        default:
            return state
    }
}

export default itemReducer