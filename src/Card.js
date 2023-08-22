export default function Card({item, icon, onClick}) {
    return (
        <li className='result-item'>
            <div>{item.title}</div>
            <div>{item.artist}</div>
            <button onClick={() => onClick(item)}>{icon}</button>
        </li>
    )    
}
     