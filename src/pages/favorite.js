import "../designs/homemindev.css";
import "../designs/home.css";
import { Toaster, toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthProvided from "../lib/auth";
import AuthCheck from "../components/AuthComp";
import { useQuery } from "@tanstack/react-query";
import { GetData, getFave } from "../lib/helper";
import Loading from "./loading";

export default function Favourites() {
  const { userId } = AuthProvided();
  const [data, setDatum] = useState();
  const [isLoading, setLoading] = useState(false);
  console.log(userId);
  /*const { data, isLoading } = useQuery({
    queryKey: ['todos', userId],
    queryFn: () => GetData(userId),
  });
  if (isLoading) return <h1>loading</h1>;
  console.log(data);*/
  useEffect(() => {
    setLoading(true);

    async function fetchData() {
      try {
        const favoriteNotes = await getFave(userId);
        setLoading(false);
        console.log("Favorite Notes:", favoriteNotes);
        setDatum(favoriteNotes);
      } catch (error) {
        console.error("Error fetching favorite notes:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [userId]);

  //console.log(datum);
  if (isLoading) return <Loading />;

  return (
    <div className="cont">
      <Toaster />

      <AuthCheck>
        <div className="mainNc">
          <div className="notescont">
            <div className="anotes">
              <h1
                style={{
                  display: "flex",
                  fontSize: "larger",
                  fontSize: "22px",
                  justifyContent: "center",
                }}
              >
                FAVOURITES
              </h1>
              <hr
                style={{ marginBottom: "20px", border: "2px dashed white" }}
              ></hr>
              <div className="notes"></div>
              {!data ? (
                <div className="no_notes">
                  <h1>Create a note📒🖋</h1>
                </div>
              ) : (
                data.map((item, i) => (
                  <div className="notes" key={item.id}>
                    <Link
                      className="acN"
                      to={`/${userId}/updateform/${item.id}`}
                    >
                      <h3>{item.title}</h3>
                      <hr className="hrN"></hr>
                      <p>{item.body}</p>
                    </Link>
                    <div className="btn_div"></div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </AuthCheck>
    </div>
  );
}
