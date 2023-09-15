import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { AddNote } from "../lib/helper";
import AuthProvided from "../lib/auth";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { GetData } from "../lib/helper";
import { useQuery } from "@tanstack/react-query";

const Updateform = () => {
  const { userId } = AuthProvided();
  const nav = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["todos", userId],
    queryFn: () => GetData(userId),
  });
  if (isLoading) return <h1>loading</h1>;
  console.log(data);

  //const { userId } = AuthProvided();
  /* const mutation = useMutation({
    //mutationFn: () => AddNote({ title, body }, userId),
  });*/
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

  const updatenotes = (e) => {
    e.preventDefault();
    if (title.length === 0 || body.length === 0) {
      toast("Fill the Text fields appropriately!", {
        duration: 2000,
        icon: "🚩🚩",
      });
    } else if (title.length < 3 || title.length > 15) {
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
      toast("Note Updated!", { duration: 1200, icon: "✔" });
      setTimeout(() => {
        nav("/home");
      }, 1500);
    }
  };

  return (
    <div>
      <Toaster />
      <div className="noteform">
        <form onSubmit={updatenotes} className="notesform">
          <h1>UPDATE NOTE</h1>
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
              UPDATE
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

export default Updateform;
