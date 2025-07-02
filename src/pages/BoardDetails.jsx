import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Plus, Trash2 } from 'lucide-react'
import { addCard, deleteBoard, updateCard } from '../store/boardsSlice'

const BoardDetails = () => {


  const [newCardTitle, setNewCardTitle] = useState("")
  const [isAddingCard, setIsAddingCard] = useState(false)

  const [draggedCard, setDraggedCard] = useState(null)

  const {boardId} = useParams()
  const board = useSelector((state) => boardId ? state.boards.items[boardId] : null)


  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleAddCard = (e) => {
    e.preventDefault()
    if(newCardTitle.trim() && boardId){
      const newCard = {
        id: crypto.randomUUID(),
        title: newCardTitle,
        description: "",
        status: 'todo',
        createAt: new Date().toISOString(),
      }

      dispatch(addCard({boardId , card: newCard}))
      setNewCardTitle("")
      setIsAddingCard(false)
    }else{
      alert("You need a name for the card!")
    }
  }

  const handleDeleteBoard = () => {
    if (window.confirm("Are you sure you want to delete this board?")){
      dispatch(deleteBoard(boardId))
      navigate('/boards')
    }
  }

  const handleDragStart = (card) => {
    setDraggedCard(card)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (status) => {
    if(draggedCard && boardId && status !== draggedCard.status){
      const updatedCard = {
        ...draggedCard,
        status
      }

      dispatch(updateCard({boardId, card: updatedCard}))
      setDraggedCard(null)
    }
  }


  const columns = [
    {
      id: "todo", title: "To Do"
    },
    {
      id: "inprogress", title: "In Progress"
    },
    {
      id: "done", title: "Done"
    },
  ]

  return !board ? 
  (
    <section className='grid justify-center gap-8'>
      <h1 className='text-2xl text-primary font-bold text-center'>Board not found</h1>
      <button className='border border-primary px-4 py-2 rounded-sm' onClick={() => navigate('/boards')}>Back to Boards</button>
    </section>
  )
  
  :
  
  (
    <section className='flex flex-col gap-12'>
      <div className='flex flex-col gap-6 md:flex-row md: justify-between md:items-center'>
        <div className='flex flex-col gap-6 items-start md:flex-row md:items-center'>
          <button onClick={() => navigate('/boards')} className='rounded-full bg-primary text-dark p-2'>
            <ArrowLeft size={20}/>
          </button>
          <h1 className='text-4xl text-primary font-bold mt-2 text-center'>{board.title}</h1>
        </div>

        <div className="flex flex-col gap-4 *:grow *:px-4 *:py-2 *:rounded-sm *:border *:border-primary *:flex *:gap-4 *:justify-center 500px:flex-row md:self-center">
          <button onClick={() => setIsAddingCard(true)}><Plus/> Add Card</button>
          <button onClick={handleDeleteBoard}><Trash2 /> Delete Board</button>
        </div>
      </div>

      {isAddingCard &&
        <form className='flex flex-col gap-4 max-w-screen-500px' onSubmit={handleAddCard}>
          <input value={newCardTitle} onChange={(e) => setNewCardTitle(e.target.value)} type="text" name="title" id="title" placeholder="Card title" className="bg-primary text-dark px-4 py-2 rounded-sm placeholder:text-gray-600 outline-none"/>
          <div className="flex gap-2 *:grow *:px-4 *:py-2 *:rounded-sm *:border *:border-primary">
            <button type="button" onClick={() => setIsAddingCard(false)}>Cancel</button>
            <button type="submit">Add</button>
          </div>
        </form>
      }

      <div className='grid gap-4 grid-cols-1 500px:grid-cols-2 md:grid-cols-3'>
        {columns.map((col) => (
          <div key={col.id} onDragOver={(e) => handleDragOver(e)} onDrop={() => handleDrop(col.id)} className={`flex flex-col gap-4 items-start bg-dark-lighter rounded-sm p-4 ${draggedCard ? 'border-2 border-dashed border-primary/50' : ''}`}>
            <h2 className='text-2xl font-extrabold text-primary'>{col.title}</h2>

            <div className='flex flex-wrap gap-2 *:bg-primary-light *:text-dark *:p-4 *:rounded-sm *:space-y-2'>
              {board.cards.filter(card => card.status === col.id).map(card => (
                <div onClick={() => navigate(`/boards/${boardId}/card/${card.id}`)} key={card.id} draggable onDragStart={() => handleDragStart(card)} className={`cursor-move ${draggedCard?.id === card.id ? 'opacity-50' : ''}`}>
                  <h3 className='font-bold'>{card.title}</h3>
                  <p className='text-sm text-dark-light'>{new Date(card.createAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>


    </section>

  )
}

export default BoardDetails