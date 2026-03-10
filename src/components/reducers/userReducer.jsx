const initialData = {
    registeredUsers: [],
    loggedInUser: {}
}

const userReducer = (state = initialData, action) => {
    switch (action.type) {
        case "REGISTER":
            // store all users to registeredUsers
            return { ...state, registeredUsers: [...state.registeredUsers, action.payload] }

        case "LOGIN":
            //store logged in user in loggedInUser
            return { ...state, loggedInUser: action.payload }


        case "LOGOUT":
            // remove data from loggedInUser, loggedInUser: {}
            return { ...state, loggedInUser: {} }

        default:
            return state
    }
}
export default userReducer