import { BoardModel } from '*/models/board.model'
import { cloneDeep } from 'lodash'

const createNew = async (data) => {
  try {
    const result = await BoardModel.createNew(data)

    return result
  } catch (error) {
    throw new Error(error)
  }
} 

const getFullBoard = async (boardId) => {
  try {
    const board = await BoardModel.getFullBoard(boardId)
    if (!board || !board.columns) {
      throw new Error('board not found')
    }

    const transformBoard = cloneDeep(board)
    // filter delete column
    transformBoard.columns = transformBoard.columns.filter(c => !c._destroy)

    transformBoard.columns.forEach(column => {
      column.cards = transformBoard.cards.filter(c => c.columnId.toString() === column._id.toString())
    })

    // sort
    // console.log(transformBoard)
    delete transformBoard.cards
    // console.log(board)
    //
    return transformBoard
  } catch (error) {
    throw new Error(error)
  }
} 

export const BoardService = { createNew, getFullBoard }