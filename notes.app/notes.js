const fs = require('fs');
const chalk = require('chalk');



const addNote = function(title, body) {
    const notes = loadNotes();
    const duplicateNote = notes.find((note)=> note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(chalk.green('New note added!'));
    } else {
        console.log(chalk.red('Note title taken!'));
    }
};

const removeNote = function(title) {
    const notes = loadNotes();
    const notesToKeep = notes.filter(function(note) {
        return note.title !== title;
    });

    if (notes.length > notesToKeep.length) {
        saveNotes(notesToKeep);
        console.log(chalk.green('Note removed!'));
    } else {
        console.log(chalk.red('No note found!'));
    }
};

const listNotes = function() { // Define listNotes function
    const notes = loadNotes();
    console.log(chalk.inverse('Your Notes'));
    notes.forEach((note) => {
        console.log(note.title);
    });
}; 

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note)=> note.title === title)
    if(note) {
        console.log(chalk.inverse(note.title))
        console.log(note.body)


    }else {
        console.log(chalk.red.inverse('Note not found'))

    }

}

const saveNotes = function(notes) {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = function() {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
};

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};