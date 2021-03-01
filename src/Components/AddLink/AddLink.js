import React from "react";
import "../Navbar/NavBar.css";
import { useForm } from "react-hook-form";
import { db } from "../../firebase.config";

const AddLink = (props) => {
  const { hide } = props;
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data, e) => {
    console.log(data);
    db.collection("links")
      .add({
        title: data.title,
        link: data.link,
      })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
        e.target.reset();
        window.location.pathname = "/";
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });

    hide();
  };

  return (
    <>
      <div className="linkAdd">
        <button
          //   onClick={() => hide()}
          className="nav-link addLink bgGrad"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          <span className="text-white ">Add Link</span>
        </button>
      </div>

      {/* Modal */}

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title highLight" id="exampleModalLabel">
                Add New Link
              </h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-2">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    <h5 className="highLight">Title</h5>
                  </label>
                  <input
                    type="text"
                    name="title"
                    ref={register({ required: true })}
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="title..."
                  />
                  {!errors.title && (
                    <span style={{ color: "transparent" }}>
                      This field is required
                    </span>
                  )}
                  {errors.title && <span>This field is required</span>}
                </div>
                <div className="mb-1">
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    <h5 className="highLight">Link</h5>
                  </label>
                  <input
                    name="link"
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    ref={register({ required: true })}
                    placeholder="link..."
                  />
                  {!errors.title && (
                    <span style={{ color: "transparent" }}>
                      This field is required
                    </span>
                  )}
                  {errors.link && <span>This field is required</span>}
                </div>
                <input className="bgGrad  addLink p-2" type="submit" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddLink;
