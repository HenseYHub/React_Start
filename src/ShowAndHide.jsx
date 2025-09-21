import {useState} from "react"

function ShowAndHide() {
    const [show, setShow] = useState(true)

    return (
        <div> 
            <button onClick={() => setShow(!show)}>
                {show ? "Скрыть": "Показать"}
            </button>
            {show && <p>Тут есть текст</p>}
        </div>
    )
}
export default ShowAndHide