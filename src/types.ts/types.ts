import { Users } from '../entity/Users'

export type Product = {
    product_id: number | string,
    quantity: number | string
}

export type UserUpdateData = Users & {
    newEmail?: string,
    newPassword?: string
}

export type ObjectInterface = {
    [key: string]: string | number | null | undefined
}

export type arrayInterface = (string | number | null | undefined)[]

export type customTablesNames = {
    primaryTableName: string,
    secondaryTableName: string,
    primaryIDName: string,
    secondaryIDName: string,
}