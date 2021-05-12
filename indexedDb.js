export async function addOrUpdateNote(note) {
	let db = await idb.openDB("NotesDb", 1, {
		upgrade(db, oldVersion, newVersion, transaction) {
			let objStore = db.createObjectStore("notes", { keyPath: "id" });
		},
    });
    
    let tx = db.transaction("notes","readwrite");
    let store = tx.objectStore("notes");

    await store.put(note);

    await tx.done;
    db.close()
}

export async function getNote(noteId) {
    let db = await idb.openDB("NotesDb", 1, {
		upgrade(db, oldVersion, newVersion, transaction) {
			let objStore = db.createObjectStore("notes", { keyPath: "id" });
		},
    });
    
    let tx = db.transaction("notes")
    let store = tx.objectStore("notes")

    let note = await store.get(noteId)

    await tx.done;
    db.close()

    return note
}