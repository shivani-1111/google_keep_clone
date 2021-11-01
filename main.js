const addNote = document.querySelector('.add');

const updateLStorage = () => {
    const textAreaData = document.querySelectorAll('textarea');
    const notes = [];

    textAreaData.forEach((note) => {
        return notes.push(note.value);
    })

    localStorage.setItem('notes', JSON.stringify(notes));
};
const addNewNote = (text = "") => {

    const note = document.createElement('div');
    note.classList.add('note');

    // console.log(note);
    const htmlData = `
    <div class="container-keep">
        <div class="operation">
            <button class="edit">
                <span class="editIcon fas ">&#xf044;</span>
            </button> 
            <button class="delete">
                <span class="deleteIcon fas ">&#xf1f8;</span>
            </button>
        </div>
        <br>
        <div class="main ${text ? " ":"hidden "}"></div>
        <textarea class=" ${text ? " hidden ":" "}" id="innerText" cols="36" rows="20"></textarea>
    </div>`;

    note.insertAdjacentHTML('afterbegin', htmlData);
    document.body.appendChild(note);

    //Get reference for all operation elements 

    const editButton = note.querySelector('.edit');
    const deleteButton = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    //deleting the note by use of delete button

    deleteButton.addEventListener('click', () => {
        note.remove();
        updateLStorage();
    })

    //Toggle the note field by use of edit button
    mainDiv.innerHTML = text;
    textArea.value = text;

    editButton.addEventListener('click', () => {
        mainDiv.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    })

    // what ever we wrote in textfeild must be visible on main div too 

    textArea.addEventListener('change', (event) => {
        const value = event.target.value;
        mainDiv.innerHTML = value;
        updateLStorage();
    })


}
const newNote = JSON.parse(localStorage.getItem('notes'));
if (newNote) { newNote.forEach((note) => addNewNote(note)) };

addNote.addEventListener('click', () => { addNewNote() });