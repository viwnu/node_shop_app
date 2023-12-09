export type Product = {
    product_id: number | string,
    quantity: number | string
}

export type UserData = {
    email: string,
    password: string,
    firstname?: string,
    surname?: string,
    lastname?: string,
    role?: string,
    user_id?: number,
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