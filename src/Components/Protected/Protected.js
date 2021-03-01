import React, { useEffect, useState } from "react";
import firebaseConfig from "../../firebase.config";
import "./Protected.css";
import Edit from "./Edit";
const Protected = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState();

  const ref = firebaseConfig.firestore().collection("links");

  //REALTIME GET FUNCTION
  const getLinks = () => {
    setLoading(true);
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc);
      });
      setLinks(items);
      setLoading(false);
    });
  };

  //DELETE FUNCTION
  const deleteLink = (links) => {
    ref
      .doc(links.id)
      .delete()
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getLinks();
    // eslint-disable-next-line
  }, []);

  if (state) {
    console.log("state", state.data());
  }
  return (
    <div>
      {loading ? <h1>Loading...</h1> : null}
      <div className="container">
        <div className="row m-2">
          {links.map((link) => (
            <div className="col-md-6 mb-3" key={link.id}>
              <div className="card cardBrder">
                <div className="card-header">Links</div>
                <div className="card-body">
                  <h5 className="card-title">{link.data().title}</h5>
                  <a
                    className="card-text"
                    href={link.data().link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.data().link}
                  </a>
                  <hr style={{ margin: "0px" }} />
                  <div className="d-flex justify-content-end">
                    <button onClick={() => deleteLink(link)} className="btn">
                      <i
                        style={{ color: "#FE6464" }}
                        className="fas fa-trash-alt "
                      ></i>
                    </button>

                    <button
                      type="button"
                      className="btn"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal2"
                      onClick={() => setState(link)}
                    >
                      <i className="fas fa-edit "></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModal2"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Links
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <Edit update="update" link={state} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Protected;
