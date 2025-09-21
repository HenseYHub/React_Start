import { useState } from "react";

function ClickTime() {
    const [count, setCount] = useState(0)

    return (
        <div>
            <h1>Click: {count}</h1>
            <button onClick={() => setCount(count + 1)}> +1</button>
            <button onClick={() => setCount(count - 1)}> -1</button>
        </div>
    );
}

export default ClickTime;