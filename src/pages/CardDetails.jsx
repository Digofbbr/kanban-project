import { ArrowLeft, Save, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteCard, updateCard } from '../store/boardsSlice'

const CardDetails = () => {
  const {boardId = "", cardId = ""} = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const card = useSelector((state) => {
    const board = state.boards.items[boardId];
    return board.cards.find(card => card.id === cardId)
  })

  const [cardTitle, setCardTitle] = useState(card.title)
  const [cardDescription, setCardDescription] = useState(card.description)
  const [cardStatus, setCardStatus] = useState(card.status)


  const handleSaveCard = () => {
    const updatedCard = {
      id: card.id,
      title: cardTitle,
      description: cardDescription,
      status: cardStatus,
      createAt: card.createAt
    }

    dispatch(updateCard({boardId, card: updatedCard}))
    
    navigate(`/boards/${boardId}`)
  }
  
  const handleDeleteCard = () => {
    if(window.confirm("Are you sure you want to delete this card?")){
      dispatch(deleteCard({boardId, cardId}))
      navigate(`/boards/${boardId}`)
    }
  }



  return (
    <section className='flex flex-col gap-12'>
      <div className='flex flex-col gap-6 md:flex-row md:justify-between md:items-center'>
        <div className='flex flex-col gap-6 items-start md:flex-row md:items-center'>
          <button onClick={() => navigate(`/boards/${boardId}`)} className='rounded-full bg-primary text-dark p-2'>
            <ArrowLeft size={20}/>
          </button>
        </div>

        <div className="flex flex-col gap-4 *:grow *:px-4 *:py-2 *:rounded-sm *:border *:border-primary *:flex *:gap-4 *:justify-center 500px:flex-row md:self-center">
          <button onClick={handleSaveCard}><Save/> Save Changes </button>
          <button onClick={handleDeleteCard}><Trash2 /> Delete Card</button>
        </div>
      </div>

      <form className='flex flex-col gap-4 max-w-screen-500px'>
        <div className='flex flex-col gap-4'>
          <label htmlFor="title">Title</label>
          <input type="text" name="" id="title" value={cardTitle} onChange={(e) => setCardTitle(e.target.value)} className='bg-primary text-dark px-4 py-2 rounded-sm placeholder:text-gray-600 outline-none' />
        </div>
        <div className='flex flex-col gap-4'>
          <label htmlFor="description">Description</label>
          <textarea name="description" id="description" value={cardDescription} onChange={(e) => setCardDescription(e.target.value)} className='bg-primary text-dark px-4 py-2 rounded-sm placeholder:text-gray-600 outline-none h-48' />
        </div>

        <div className='flex flex-col gap-4'>
          <label htmlFor="status">Status</label>
          <select name="status" id="status" value={cardStatus} onChange={(e) => setCardStatus(e.target.value)} className='bg-dark border border-primary px-4 py-2 rounded-sm cursor-pointer text-sm'>
            <option value="todo">To Do</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <p className='text-xl font-bold text-primary'>Created: {new Date(card.createAt).toLocaleString()}</p>
      </form>
    </section>
  )
}

export default CardDetails