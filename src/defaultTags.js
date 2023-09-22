
const tags = [
    // String
    { id: "title", label: "Title", type: "String", order: 0, filter: "" },
    { id: "artist", label: "Artist(s)", type: "String", order: 1, filter: "" },
    // Number
    { id: "duration", label: "Duration", type: "Number", order: 2, filter: 0 },
    // Dropdown
    { id: "genre", label: "Genre", type: "Dropdown", order: 3, 
        filter: [
            { name: "J-POP", on: false, order: 0 },
            { name: "Electro", on: false, order: 1 }] 
    }
];

export default { tags }