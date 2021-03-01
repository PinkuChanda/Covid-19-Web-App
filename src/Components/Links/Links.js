import React, { useEffect, useState } from "react";
import firebaseConfig from "../../firebase.config";
import "../Protected/Protected.css";

const Links = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    getLinks();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {loading ? <h1>Loading...</h1> : null}
      <div className="container">
        <div className="row m-2">
          {links.map((link) => (
            <div className="col-md-12 mb-3" key={link.id}>
              <div className="card cardBrder">
                <div className="card-header">Links</div>
                <div className="card-body">
                  <h5 className="card-title">{link.data().title}</h5>
                  <a
                    className="card-text"
                    rel="noreferrer"
                    target="_blank"
                    href={link.data().link}
                  >
                    {link.data().link}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Links;
