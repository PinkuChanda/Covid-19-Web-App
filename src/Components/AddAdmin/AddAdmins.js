import React, { useEffect, useState } from "react";
import firebaseConfig, { db } from "../../firebase.config";
import "./Addmins.css";

const AddAdmins = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const ref = firebaseConfig.firestore().collection("users");

  const scsUser = localStorage.getItem("SCS_USER");
  const user = JSON.parse(scsUser);

  const getLinks = () => {
    setLoading(true);
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        if (doc.data().email !== user.email) {
          items.push(doc);
        }
      });
      setUsers(items);
      //   console.log(items);
      setLoading(false);
    });
  };

  useEffect(() => {
    getLinks();
    // eslint-disable-next-line
  }, []);

  const addAdmin = (data) => {
    toogleAdminFunction(data);
  };
  const removeAdmin = (data) => {
    console.log(data);
    toogleAdminFunction(data);
  };

  const toogleAdminFunction = (data) => {
    const userrr = db.collection("users").where("email", "==", data.email);
    console.log("celled", data.email);
    userrr
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log(doc.id, " => ", doc.data());
          db.collection("users")
            .doc(doc.id)
            .update({
              isAdmin: data.isAdmin ? false : true,
            })
            .then(function (docRef) {
              if (data.isAdmin) {
                alert(`Success! ${data.email} has been removed from admin!`);
              } else {
                alert(`Success! ${data.email} has been made an admin!`);
              }
              // window.location.reload();
            })
            .catch(function (error) {
              alert("error");
              console.log("Error adding document: ", error);
            });
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  };

  return (
    <div>
      {loading ? <h1>Loading...</h1> : null}
      <div className="container">
        <div className="row m-2 mt-5">
          {users.map((link) => (
            <div className="col-md-6 mb-3" key={link.data().uid}>
              <div className="card cardBrder">
                <div className="card-header">{link.data().name}</div>
                <div className="card-body">
                  <h5 className="card-title">{link.data().email}</h5>
                </div>

                <hr style={{ margin: "0px" }} />
                <div className="d-flex justify-content-end">
                  {link.data().isAdmin ? (
                    <button
                      onClick={() => removeAdmin(link.data())}
                      className="btn del m-2 text-white"
                    >
                      <i
                        style={{ color: "#ffffff" }}
                        className="fas fa-trash-alt "
                      ></i>{" "}
                      Remove Admin
                    </button>
                  ) : (
                    <button
                      className="btn add m-2 text-white"
                      onClick={() => addAdmin(link.data())}
                    >
                      <i
                        style={{ color: "#ffffff" }}
                        className="fas fa-check-circle "
                      ></i>{" "}
                      Make Admin
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddAdmins;
