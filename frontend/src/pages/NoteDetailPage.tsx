import { useEffect, useState, useTransition } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import { ArrowLeftIcon, AtSignIcon } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import toast, { LoaderIcon } from "react-hot-toast";
import { AxiosError } from "axios";

type EditNoteType = {
  _id?: string;
  title?: string;
  content?: string;
};

const NoteDetailPage = () => {
  const [note, setNote] = useState<EditNoteType>();
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      api
        .get("/notes/" + id)
        .then((res) => setNote(res.data))
        .finally(() => setLoading(false));
    };

    fetchNote();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (note?.title === "" || note?.content === "") {
      toast.error("Title and content fields should not be empty.");
      return;
    }
    startTransition(async () => {
      try {
        await api.put("/notes/" + note?._id, note);
        toast.success("Note edited Successfuly");
        navigate(-1);
      } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
          if (error.status === 404) {
            toast.error("Error updating note: Note not found");
          }
        }
      }
    });
  };
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center">
        <LoaderIcon className="animate-spin w-20 h-20" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card bg-base-100 max-w-2xl">
      <div className="card-body">
        <h2 className="card-title">
          <ArrowLeftIcon onClick={() => navigate(-1)} />
          Note details
        </h2>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Title</legend>
          <input
            type="text"
            onChange={(e) => setNote({ ...note, title: e.target.value })}
            className="input w-full"
            placeholder="Type here"
            value={note?.title}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Content</legend>
          <textarea
            onChange={(e) => {
              setNote({ ...note, content: e.target.value });
            }}
            className="textarea rounded-lg w-full"
            placeholder="Type here"
            value={note?.content}
          />
        </fieldset>
        <div className="card-actions justify-end">
          <button
            disabled={isPending}
            type="submit"
            className="btn btn-primary"
          >
            Update Note
          </button>
        </div>
      </div>
    </form>
  );
};

export default NoteDetailPage;
