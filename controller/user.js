import { database } from '../settings/db.js'
import bcrypt from 'bcrypt'

const defaultReturn = (code, response, message, result) => {
    return {
        status: {
            code,
            response,
            message
        },
        result
    }
}

export const createCustomer = async (req, res) => {
    try {
        let { name, email, password, gender, is_married, address } = req.body

        if (!name || !email || !password || !gender || !is_married || !address) {
            throw { code: 500, message: 'PLease Input All The Field! (name, email, password, gender, is_married, address)' }
        }


        const updateListValue = []
        const updateListColumnn = []
        const updateListNumber = []
        let index = 1
        for (const bodyList in req.body) {
            if (bodyList === 'password') {
                //encrypt password
                password = await bcrypt.hash(password, 10)
                updateListValue.push(password)
            } else {
                updateListValue.push(req.body[bodyList])
            }
            updateListColumnn.push(bodyList)
            updateListNumber.push('$' + index)
            index += 1
        }

        const query = `INSERT INTO costumers (${updateListColumnn.join(',')}) VALUES  (${updateListNumber.join(',')}) RETURNING *`
        const createCostumer = await database.query(
            query, updateListValue
        ).catch(err => {
            throw { code: 500, message: err.message }
        })
        return res.status(200).json(defaultReturn(200, 'Success', 'Success Create Customer!', createCostumer.rows[0]))
    } catch (err) {
        return res.status(err.code ? err.code : 500).json(defaultReturn(err.code ? err.code : 500, "Failed", err.message ? err.message : err, {}))
    }
}
export const getCostumer = async (req, res) => {
    try {
        const getAllCostumer = await database.query('SELECT * FROM costumers');
        if (getAllCostumer.rowCount === 0) {
            throw { code: 404, message: 'No Costumer Found!' };
        }
        return res.status(200).json(defaultReturn(200, "Succes", "Success Get All Costumer", getAllCostumer.rows));
    } catch (err) {

        return res.status(err.code ? err.code : 500).json(defaultReturn(err.code ? err.code : 500, "Failed", err.message ? err.message : err, {}))
    }
}

export const getDetailCostumerById = async (req, res) => {
    try {
        const { costumerId } = req.params

        const getCostumerDetail = await database.query('SELECT * FROM costumers c WHERE c.id = $1 ', [costumerId])
        if (getCostumerDetail.rowCount === 0) {

            throw { code: 404, message: "No Such A User, Pleasse Check Your UserID!" }
        }
        return res.status(200).json(defaultReturn(200, "Success", "Success Get Detail For User", getCostumerDetail.rows))
    } catch (err) {
        return res.status(err.code ? err.code : 500).json(defaultReturn(err.code ? err.code : 500, "Failed", err.message ? err.message : err, {}))
    }
}

export const updateDetailCostumerById = async (req, res) => {
    try {
        const { costumerId } = req.params;
        const { name, email, password, gender, is_married, address } = req.body
        const checkUser = await database.query('SELECT * FROM costumers WHERE id=$1', [costumerId])
        if (checkUser.rowCount === 0) {
            throw { code: 404, message: "No Such A User Please Check Your UserId!" }
        }

        //We allways want to update the updatedAt timeStamp
        const dateNow = new Date(Math.floor(Date.now()))
        const updateListValue = [`NOW()`]
        const updateListColumnn = ['updatedAt']
        const updateListNumber = ['$1']
        let index = 1
        for (const bodyList in req.body) {
            index += 1
            updateListValue.push(req.body[bodyList])
            updateListColumnn.push(bodyList)
            updateListNumber.push('$' + index)
        }

        const query = `UPDATE costumers SET (${updateListColumnn.join(',')})=(${updateListNumber.join(',')}) RETURNING *`
        const updateCostumerDetail = await database.query(
            query, updateListValue
        ).catch(err => {
            throw { code: 500, message: err.message }
        })
        return res.status(200).json(defaultReturn(200, 'Success', `Success Update Costumer With Id :${costumerId}`, updateCostumerDetail.rows[0]))
    } catch (err) {
        return res.status(err.code ? err.code : 500).json(defaultReturn(err.code ? err.code : 500, "Failed", err.message ? err.message : err, {}))
    }
}

export const deleteCostumer = async (req, res) => {
    try {
        const { costumerId } = req.params;
        const getCostumer = await database.query('SELECT name FROM costumers c where c.id = $1', [costumerId])
        if (getCostumer.rowCount === 0) {
            throw { code: 404, message: 'No Such A Costumer! Please Check Your Costumer Id !' }
        }
        await database.query('DELETE FROM costumers c where c.id = $1', [costumerId]).then(data => {
            return res.status(200).json(defaultReturn(200, "Success", `Success Delete Costumer With name ${getCostumer.rows[0].name}`, { name: getCostumer.rows[0].name }))
        })
    } catch (err) {
        return res.status(err.code ? err.code : 500).json(defaultReturn(err.code ? err.code : 500, "Failed", err.message ? err.message : err, {}))
    }
}