import { useState } from "react";
import Navbar from "../components/navbar";
import { useMutation } from "@tanstack/react-query";
import { AddNote } from "../lib/helper";
import AuthProvided from "../lib/auth";
const Notesform = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const { userId } = AuthProvided();
  const mutation = useMutation({
    mutationFn: () => AddNote({ title, body }, userId),
  });
  const bodyText = (e) => {
    setBody(e.target.value);
  };
  const titleText = (e) => {
    setTitle(e.target.value);
  };
  const clearThem = () => {
    mutation.mutate();
  };
  return (
    <div>
      <div className="noteform">
        <form className="notesform">
          <h1>Create Note</h1>
          <hr></hr>
          <input
            minLength={3}
            value={title}
            type="text"
            placeholder="Title..."
            onChange={titleText}
            required
            className="titlebox"
            maxLength={15}
          />
          <input
            minLength={2}
            value={body}
            type="text"
            maxLength={250}
            placeholder="Enter your text here"
            onChange={bodyText}
            className="textbox"
            required
          />
          <button type="submit">Save</button>
          <button type="reset" onClick={clearThem}>
            {mutation.isLoading ? "...loading" : "submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Notesform;
