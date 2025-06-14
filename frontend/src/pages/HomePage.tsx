import { useEffect, useState } from "react";
import RateLimitedUI from "../components/RateLimitedUI";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

type Note = {
  title: string;
  content: string;
};
const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);

  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/notes");
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
    <div className="min-h-screen max-w-6xl">
      {isRateLimited && <RateLimitedUI />}
      {loading ? (
        <div>loading....</div>
      ) : (
        <div className="flex flex-wrap gap-3">
          {notes.map((note) => (
            <div>
              <h2>{note.title}</h2>
              <p>{note.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
