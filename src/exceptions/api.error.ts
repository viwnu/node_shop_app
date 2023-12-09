import { ValidationError } from 'express-validator'

export class ApiError extends Error {
    status;
    errors: Error[] | ValidationError[];

    constructor(status: number, message: string | undefined, errors: Error[] | ValidationError[] = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new ApiError(401, 'Пользователь не авторизован')
    }

    static BadRequest(message: string | undefined, errors: Error[] | ValidationError[] = []) {
        return new ApiError(400, message, errors);
    }
}