import { EditIcon, TrashIcon } from "lucide-react";
import { Link } from "react-router";

type NoteCardProps = {
  key: string;
  note: Note;
};
const NoteCard = ({ key, note }: NoteCardProps) => {
  return (
    <Link
      to={"/note/" + note._id}
      key={key}
      className=" card bg-base-100 hover:shadow-lg border-t-4 border-solid border-primary"
    >
      <div className="card-body">
        <h2 className="card-title">{note.title}</h2>
        <p>{note.content}</p>
      </div>
      <div className="flex justify-between items-center px-4 py-4 ">
        <span className="opacity-50">{new Date(note.createdAt).toDateString()}</span>
      <div className="card-actions justify-end">
        <Link to={`/note/${note._id}`} className="btn"><EditIcon/> <span className="sr-only">Edit</span></Link>
        <Link  to ={`/note/${note._id}`} className="btn text-red-500"><TrashIcon/><span className="sr-only">Delete</span></Link>
      </div>
      </div>
    </Link>
  );
};

export default NoteCard;
