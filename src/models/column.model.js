import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { getDB } from '*/config/mongodb'

// Define column collection
const columnCollectionName = 'columns'
const columnCollectionSchema = Joi.object({
  boardId: Joi.string().required(),
  title: Joi.string().required().min(3).max(20).trim(),
  cardOrder: Joi.array().items(Joi.string()).default([]),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updateAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
})

const validateSchema = async (data) => {
  return await columnCollectionSchema.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
  try {
    const validatedValue = await validateSchema(data)
    const insertValue = {
      ...validatedValue,
      boardId: ObjectId(validatedValue.boardId)
    }
    await getDB().collection(columnCollectionName).insertOne(insertValue)
    return insertValue
  } catch (error) {
    throw new Error(error)
  }
}

/** 
 * @param {string} cardId
 * @param {string} columnId
 */
 const pushCardOrder = async (columnId, cardId) => {
  try {
    const result = await getDB().collection(columnCollectionName).findOneAndUpdate(
      { _id: ObjectId(columnId)},
      { $push: { cardOrder: cardId } },
      { returnOriginal: false }
    )

    return result.value
  } catch (error) {
    throw new Error(error)
  }
}


const update = async (id, data) => {
  try {
    const updateData = {
      ...data,
      boardId: ObjectId(data.boardId)
    }
    
    const result = await getDB().collection(columnCollectionName).findOneAndUpdate(
      { _id: ObjectId(id)},
      { $set: updateData },
      { returnOriginal: false }
    )
    result.value._destroy = updateData._destroy

    return result.value
  } catch (error) {
    throw new Error(error)
  }
}

export const ColumnModel = { 
  createNew, 
  update, 
  pushCardOrder,
  columnCollectionName,
 }
