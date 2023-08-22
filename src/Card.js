export default function Card({item, icon, onClick}) {
    return (
        <li className='result-item'>
            <div>{item.name}</div>
            <div>{item.artists.map(a => a.name).join(", ")}</div>
            <button onClick={() => onClick(item)}>{icon}</button>
        </li>
    )    
}
     