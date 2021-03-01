import React, { useEffect, useState } from "react";
import "../Navbar/NavBar.css";
import { useForm } from "react-hook-form";
import { db } from "../../firebase.config";

const Edit = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const [value, setValue] = useState();

  const { link } = props;

  useEffect(() => {
    setValue(link);
  }, [link]);

  const onSubmit = (data, e) => {
    console.log(data);
    console.log(value.id);
    db.collection("links")
      .doc(value.id)
      .update({
        title: data.title,
        link: data.link,
      })
      .then(function (docRef) {
        e.target.reset();
        window.location.reload();
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  };

  return (
    <>
      {/* Form */}
      {link && (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-2">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                <h5 className="highLight">Title</h5>
              </label>
              <input
                type="text"
                name="title"
                ref={register({ required: true })}
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="title..."
                defaultValue={value ? value.data().title : ""}
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
                defaultValue={value ? value.data().link : ""}
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
        </>
      )}
    </>
  );
};

export default Edit;
