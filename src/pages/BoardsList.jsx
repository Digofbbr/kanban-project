import { Layout, Plus } from "lucide-react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { createBoard } from "../store/boardsSlice"

const BoardsList = () => {

    const [newBoardTitle, setNewBoardTitle] = useState("")
    const [showForm, setShowForm] = useState(false)

    const navigate = useNavigate()

    const dispatch = useDispatch()
    const boards = useSelector((state) => state.boards.items)

    const handleCreateBoard = (e) => {
        e.preventDefault()
        if(newBoardTitle.trim()){
            const id = crypto.randomUUID()

            dispatch(createBoard({id, title: newBoardTitle}))

            setNewBoardTitle("")
            setShowForm(false)
            navigate(`/boards/${id}`)
        }else{
            alert("You need a title for your Board")
            
        }
    }

  return ( 
    <section className="flex flex-col gap-8">
        <div className="flex flex-col gap-8 500px:flex-row 500px:justify-between">
            <h1 className="text-primary text-center text-5xl font-bold">My Board</h1>
            <button onClick={() => setShowForm(true)} className="border flex items-center justify-center gap-4 px-4 py-2 rounded-sm border-primary">
                <Plus size={20}/>
                <p className="text-md font-bold">New Board</p>
            </button>
        </div>
        
        {showForm ? 
            <form className="flex flex-col gap-4 max-w-screen-500px" onSubmit={handleCreateBoard}>
                <input type="text" name="title" id="title" placeholder="Board title" className="bg-primary text-dark px-4 py-2 rounded-sm placeholder:text-gray-600 outline-none" onChange={(e) => setNewBoardTitle(e.target.value)} value={newBoardTitle}/>
                <div className="flex gap-2 *:grow *:px-4 *:py-2 *:rounded-sm *:border *:border-primary">
                    <button type="button" onClick={() => {setShowForm(false); setNewBoardTitle('')}}>Cancel</button>
                    <button type="submit">Create</button>
                </div>
            </form>
            :
            ''    
        }

        <div className="grid gap-4 grid-cols-1 500px:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

            {Object.values(boards).map((board) => (

                <div key={board.id} onClick={() => navigate(`/boards/${board.id}`)} className="cursor-pointer bg-primary text-dark rounded-sm px-6 py-4 flex flex-col items-center gap-4">
                    <div className="flex flex-col gap-4 items-center">
                        <Layout size={20}/>
                        <h2 className="text-xl font-semibold">{board.title}</h2>
                    </div>

                    <p>{board.cards.length} Cards</p>
                </div>
            ))}

        </div>
    </section>
  )
}

export default BoardsList