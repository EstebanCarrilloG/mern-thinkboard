import axios, { AxiosError } from "axios";
import { ArrowLeftIcon } from "lucide-react";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

import api from "../lib/axios";
const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPending, startTransition] = useTransition();

  const navigate = useNavigate();

  const handdleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      toast.error("All fields are required");
      return;
    }
    startTransition(async () => {
      try {
        const res = await api.post("/notes", {
          title,
          content,
        });
        toast.success("Note created successfully");
        if (res.status === 201) navigate("/");
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.status === 429) toast.error("Rate limit exceeded");
        }
        toast.error("Failed to create note");
      }
    });
  };

  return (
    <form onSubmit={handdleSubmit} className="card bg-base-100 max-w-2xl">
      <div className="card-body">
        <h2 className="card-title">
          <ArrowLeftIcon onClick={() => navigate(-1)} />
          Create New Note
        </h2>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Title</legend>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            className="input w-full"
            placeholder="Type here"
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Content</legend>
          <textarea
            onChange={(e) => setContent(e.target.value)}
            className="textarea rounded-lg w-full"
            placeholder="Type here"
          />
        </fieldset>
        <div className="card-actions justify-end">
          <button
            disabled={isPending}
            type="submit"
            className="btn btn-primary"
          >
            Create Note
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreatePage;
