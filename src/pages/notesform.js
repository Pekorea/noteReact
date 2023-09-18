import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { AddNote } from "../lib/helper";
import AuthProvided from "../lib/auth";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router";
const Notesform = () => {
  const nav = useNavigate();
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
  const clears = () => {
    setBody("");
  };
  //const textcontent= textObject.value

  const savenotes = (e) => {
    e.preventDefault();
    if (title.length === 0 || body.length === 0) {
      toast("Fill the Text fields appropriately!", {
        duration: 2000,
        icon: "🚩🚩",
      });
    } else if (title.length < 3) {
      toast("Title minlength is 3 and max is 15", {
        duration: 2000,
        icon: "❗❗",
      });
    } else if (body.length < 3) {
      toast("Text minlength is 3", {
        duration: 2000,
        icon: "❗❗",
      });
    } else if (body.length > 3500) {
      toast("TEXT maxlength is 3500 Characters", {
        duration: 2000,
        icon: "❗❗",
      });
    } else {
      mutation.mutate();
      toast("Note created!", { duration: 1200, icon: "😁✔" });
      setTimeout(() => {
        nav(-1);
      }, 1500);
    }
  };

  return (
    <div>
      <Toaster />
      <div className="noteform">
        <form onSubmit={savenotes} className="notesform">
          <h1>CREATE NOTE</h1>
          <hr></hr>

          <input
            minLength={3}
            value={title}
            type="text"
            placeholder="TITLE..."
            onChange={titleText}
            className="titlebox"
            maxLength={30}
          />
          <div className="textbox_div">
            <textarea
              minLength={2}
              value={body}
              type="text"
              rows={10}
              maxLength={3500}
              placeholder="Enter your text here"
              onChange={bodyText}
              className="textbox"
            />
          </div>
          <div className="notesbtn_div">
            <button className="Savebtn" type="submit">
              {mutation.isLoading ? "...loading" : "SAVE"}
            </button>
            <button className="buttun" type="button" onClick={clears}>
              CLEAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Notesform;
