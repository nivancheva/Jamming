import { useState } from "react";

export default function Search({onClick}) {
    const [search, setSearch] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        onClick(search);

        setSearch("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            <button
                className="btn btn-primary">
                Search
            </button>
        </form>
    );
}