import React from "react";

export default function DigimonList({ digimon }) {
    return (
        <ul>
            {digimon.map((d) => (
                <li key={d.id}>
                    {d.id} {d.name}
                </li>
            ))}
        </ul>
    );
}
