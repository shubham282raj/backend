export const create_user_val_schema = {
    username: {
        isLength: {
            options: { min: 5, max: 32 },
            errorMessage: 'userrname must be at least 5 characters with a max of 32 characters'
        },
        isString: {
            errorMessage: 'username must be a string'
        }
    },
    displayName: {
        isLength: {
            options: { min: 0, max: 32 },
            errorMessage: 'name must be at max of 32 characters'
        },
        isString: {
            errorMessage: 'name must be a string'
        }
    },
    password: {
        isLength: {
            options: { min: 8, max: 32 },
            errorMessage: 'password must be at least 8 characters with a max of 32 characters'
        }
    }
}