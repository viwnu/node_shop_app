import DBController from './single.table.db.service'

import { customTablesNames } from '../types.ts/types'
import { ApiError } from '../exceptions/api.error'

class compositTablesController {
    #createRowsToWrite = <T>(idName: string, incomingRows: T[], idValue: string) => (
        incomingRows.map((incomingRow: T) => ({ [idName]: idValue, ...incomingRow }))
    )
    create = async <T>(
            {primaryTableName, secondaryTableName, primaryIDName, secondaryIDName}: customTablesNames,
            primary_id_value: string | number,
            incomingRows: T[]
        ) => {
        try {
            const primaryTableRows = await DBController.create(primaryTableName, [{[primaryIDName]: primary_id_value}])
            const rowsToWrite = this.#createRowsToWrite<T>(secondaryIDName, incomingRows, primaryTableRows[0][secondaryIDName])
            const secondTableRows = await DBController.create(secondaryTableName, rowsToWrite)
            return secondTableRows
        } catch (error) {
            throw new ApiError(400, '', [error as Error])
        }
    }
    get = async (
        {primaryTableName, secondaryTableName, primaryIDName, secondaryIDName}: customTablesNames,
        id: string | number
    ) => {
        try {
            console.log(primaryTableName, primaryIDName, id)
            const primaryTableRows = (await DBController.getByField(primaryTableName, primaryIDName, id))
            if(primaryTableRows instanceof TypeError) throw new ApiError(400, '')
            const secondTableRows = await Promise.all(primaryTableRows.map(async (primaryRow) => {
                return (await DBController.getByField(secondaryTableName, secondaryIDName, primaryRow[secondaryIDName]))
            }))
            return secondTableRows
        } catch (error) {
            throw new ApiError(400, (error as ApiError).message, [error as ApiError])
        }
    }
    update = async <T>(
        {primaryTableName, secondaryTableName, primaryIDName, secondaryIDName}: customTablesNames,
        primary_id_value: string | number,
        incomingRows: T[]
    ) => {
        try {
            const primaryTableRows = await DBController.getByField(primaryTableName, primaryIDName, primary_id_value)
            if(primaryTableRows instanceof TypeError) throw new ApiError(400, '')
            if(primaryTableRows.length === 0) throw new ApiError(400, 'nothing to update')
            
            await DBController.delete(secondaryTableName, secondaryIDName, primaryTableRows[0][secondaryIDName])

            const rowsToWrite = this.#createRowsToWrite<T>(secondaryIDName, incomingRows, primaryTableRows[0][secondaryIDName])
            const updatedRows = await DBController.create(secondaryTableName, rowsToWrite)

            return updatedRows
        } catch (error) {
            throw new ApiError(400, (error as ApiError).message, [error as ApiError])
        }
    }
    delete = async (
        {primaryTableName, secondaryTableName, primaryIDName, secondaryIDName}: customTablesNames,
        id: string | number
        
    ) => {
        try {
            const primaryTableRows = (await DBController.getByField(primaryTableName, primaryIDName, id))
            console.log('primaryTableRows: ', primaryTableRows)
            if(primaryTableRows.length === 0) throw new ApiError(400, 'nothing to being deleted')
            const deletedRow = await DBController.delete(secondaryTableName, secondaryIDName, primaryTableRows[0][secondaryIDName])
            console.log('deletedRow: ', deletedRow)
            await DBController.delete(primaryTableName, primaryIDName, id)
            
            return deletedRow
        } catch (error) {
            throw new ApiError(400, (error as ApiError).message, [error as ApiError])
        }
    }
}

export default new compositTablesController()