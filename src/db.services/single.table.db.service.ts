
import db from '../db'
import { ApiError } from '../exceptions/api.error'

import { ObjectInterface, arrayInterface } from '../types.ts/types'

class singleTableDBService {
    create = async (table: string, incomingValues: ObjectInterface[]) => {
        const columnNames = Object.keys(incomingValues[0])
        let valuesQueryString = ''
        let fieldIndex = 0
        const fieldValues = incomingValues.reduce((fieldValues: arrayInterface, incomingRowValue) => {
            const currentRowValue = Object.values(incomingRowValue)
            valuesQueryString = valuesQueryString + '(' + currentRowValue.map(() => '$' + (++fieldIndex)) + '),' + '\n'
            return [...fieldValues, ...currentRowValue]
        }, [])
                
        try {
            const newEntity = await db.query(`
                INSERT INTO ${table} (${columnNames})
                VALUES
                ${valuesQueryString.slice(0, -2)}
                RETURNING *
            `, fieldValues)
            return newEntity.rows
        } catch (error) {
            return [error]
        }
    }
    get = async (table: string) => {
        try {
            const entities = await db.query(`SELECT * FROM ${table}`)
            return entities.rows
        } catch (error) {
            return [error]
        }
    }
    getByField = async (table: string, fieldName: string, fieldValue: string | number) => {
        try {
            const entity = await db.query(`SELECT * FROM ${table} WHERE ${fieldName} = $1`, [fieldValue])
            return entity.rows
        } catch (error) {
            return [error]
        }
    }
    update = async (table: string, id_name: string, incomingRowValue: ObjectInterface) => {
        const columnNames = [...Object.keys(incomingRowValue)].slice(1)
        const currentRowValue = Object.values(incomingRowValue)
        
        try {
            const entity = await db.query(`
                UPDATE ${table} SET ${
                    columnNames.map((item, index) => item + '=$' + (index + 2))
                }
                WHERE ${id_name} = $1
                RETURNING *
            `, currentRowValue)
            return entity.rows[0]    
        } catch (error) {
            return error
        }
    }
    delete = async (table: string, id_name: string, id: string | number) => {
        try {
            const entity = await db.query(`DELETE FROM ${table} WHERE ${id_name} = $1`, [id])
            return entity.rows
        } catch (error) {
            throw new ApiError(400, (error as Error).message, [error as Error])
        }
    }
}


export default new singleTableDBService()