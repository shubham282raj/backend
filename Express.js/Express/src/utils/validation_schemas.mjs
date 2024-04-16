export const create_user_val_schema = {
    username: {
        isLength: {
            options: { min: 5, max: 32 },
            errorMessage: 'userrname must be at least 5 characters with a max of 32 characters'
        },
        // notEmpty: true,
        notEmpty: {
            errorMessage: 'username cannot be empty'
        },
        isString: {
            errorMessage: 'username must be a string'
        }
    },
    name: {
        notEmpty: {
            errorMessage: 'name cannot be empty'
        },
        isString: {
            errorMessage: 'name must be a string'
        }
    }
}