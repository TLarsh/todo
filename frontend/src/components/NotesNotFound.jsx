import { NotebookIcon } from "lucid-react";
import
const NotesNotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
            <div className="bg-primary/10 rounded-full p-8">
                <NotebookIcon className="size-10 text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">No notes yet</h2>
            <p className="text-gray-600">There are no notes in the database. Create your first note to get started.</p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md">
                Create note
            </button>
        </div>
    );
};

export default NotesNotFound;
