import { useEffect, useState } from "react";
import RateLimitedUI from "../components/RateLimitedUI";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import api from "../lib/axios";
import NotesNotFound from "../components/NotesNotFound";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);

  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        console.log(res.data);
        setNotes(res.data);
        setLoading(false);
        setIsRateLimited(false);
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.status === 429) setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        }
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      {isRateLimited && <RateLimitedUI />}
      {notes.length === 0 && !isRateLimited && <NotesNotFound/> }
      {loading && <div>loading....</div>}
      {notes.length > 0 && !isRateLimited && (
        <div className="grid  grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-5">
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} setNotes={setNotes} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
