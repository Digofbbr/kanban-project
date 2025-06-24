import {createSlice} from '@reduxjs/toolkit'


interface BoardsState {
    items: Record<string, Board>,
    loading: boolean,
    error: string | null
}

const initialState = {
    items: {},
    loading: false,
    error: null
}

const boardsSlice = createSlice({
    name: "boards",
    initialState: initialState,
    reducers: {
        createBoard: (state,  action) => {
            const id = action.payload.id
            const title = action.payload.title
            const newBoard = {
                id,
                title,
                cards: []
            }

            state.items[action.payload.id] = newBoard
        },
        addCard: (state, action) => {
            const newCard = action.payload.card
            const board = state.items[action.payload.boardId]
            board.cards.push(newCard)
        },
        deleteBoard: (state, action) => {
            delete state.items[action.payload]
        },
        updateCard: (state, action) => {
            const board = state.items[action.payload.boardId]
            if(board){
                const index = board.cards.findIndex(card => card.id === action.payload.card.id)
                board.cards[index] = action.payload.card
            } 
        },
        deleteCard: (state, action) => {
            const board = state.items[action.payload.boardId]
            if(board){
                board.cards = board.cards.filter((card) => card.id !== action.payload.cardId)
            }
        }   
    }
})

export const {createBoard, addCard, deleteBoard, updateCard, deleteCard} = boardsSlice.actions
export default boardsSlice.reducer 