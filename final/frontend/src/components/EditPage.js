import Staff from './Staff';
import './css/EditPage.css'

const EditPage = ({song, page, setPage}) => {
    return (
        <div>
            <button id={page === 0 ? 'none':'left'} onClick={()=>{setPage(page - 1)}}></button>
            <Staff song = {song} page={page}></Staff>
            <button id={(page+1)*10 >= song.length ? 'none':'right'} onClick={()=>{setPage(page + 1)}}></button>
        </div>
    )
}

export default EditPage