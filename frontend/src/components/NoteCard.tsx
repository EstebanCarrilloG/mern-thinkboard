import { EditIcon, TrashIcon } from "lucide-react";
import { Link } from "react-router";
import api from "../lib/axios";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import type { Dispatch, SetStateAction } from "react";

type NoteCardProps = {
  note: Note;
  setNotes: Dispatch<SetStateAction<Note[]>>;
};
const NoteCard = ({ note, setNotes }: NoteCardProps) => {
  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await api.delete("/notes/" + id);
      setNotes((prev) => prev.filter((note: Note) => note._id !== id));
      toast.success("Note deleted successfully.");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          toast.error("Error deleting note: Note not found");
        }
      }
    }
  };
  return (
    <Link
      to={"/note/" + note._id}
      className=" card bg-base-100 hover:shadow-lg border-t-4 border-solid border-primary"
    >
      <div className="card-body">
        <h2 className="card-title">{note.title}</h2>
        <p>{note.content}</p>
      </div>
      <div className="flex justify-between items-center px-4 py-4 ">
        <span className="opacity-50">
          {new Date(note.createdAt).toDateString()}
        </span>
        <div className="card-actions justify-end">
          <Link to={`/note/${note._id}`} className="btn">
            <EditIcon /> <span className="sr-only">Edit</span>
          </Link>
          <button
            className="btn text-red-500"
            onClick={(e) => handleDelete(note._id, e)}
          >
            <TrashIcon />
            <span className="sr-only">Delete</span>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
