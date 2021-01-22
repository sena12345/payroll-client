import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import Modal from "./Modal";

function FieldsConfiguration() {
  const [show, setShow] = useState(false);


  return (
    <div className="fieldconfig">
      <div className="card bg-grey">
        <h2>
          <b>Position</b>
        </h2>
        <hr />
         <button onClick={() => setShow(true)} className="bg-success">         
          New <i className="fa fa-plus"></i>
        </button><Modal onClose={ () => setShow(false)} show={ show} />


        <div className="container">
          <input type="text" />
          <button className=" float-right">
            <i className="fa fa-pen"></i>
          </button>
          <button className=" float-right">
            <i className="fa fa-trash"></i>
          </button>
        </div>
      </div>

      <div className="card bg-grey">
        <h2>
          <b>Department</b>
        </h2>
        <hr />
         <button onClick={() => setShow(true)} className="bg-success">         
          New <i className="fa fa-plus"></i>
        </button><Modal onClose={ () => setShow(false)} show={ show} />


        <div className="container">
          <input type="text" />
          <button className=" float-right">
            <i className="fa fa-pen"></i>
          </button>
          <button className=" float-right">
            <i className="fa fa-trash"></i>
          </button>
        </div>
      </div>

      <div className="card bg-grey">
        <h2>
          <b>Salary</b>
        </h2>
        <hr />
         <button onClick={() => setShow(true)} className="bg-success">         
          New <i className="fa fa-plus"></i>
        </button><Modal onClose={ () => setShow(false)} show={ show} />


        <div className="container">
          <input type="text" />
          <button className=" float-right">
            <i className="fa fa-pen"></i>
          </button>
          <button className=" float-right">
            <i className="fa fa-trash"></i>
          </button>
        </div>
      </div>

      <div className="card bg-grey">
        <h2>
          <b>Allowance</b>
        </h2>
        <hr />
         <button onClick={() => setShow(true)} className="bg-success">         
          New <i className="fa fa-plus"></i>
        </button><Modal onClose={ () => setShow(false)} show={ show} />


        <div className="container">
          <input type="text" />
          <button className=" float-right">
            <i className="fa fa-pen"></i>
          </button>
          <button className=" float-right">
            <i className="fa fa-trash"></i>
          </button>
        </div>
      </div>

      <div className="card bg-grey">
        <h2>
          <b>Designation</b>
        </h2>
        <hr />
        <button onClick={() => setShow(true)} className="bg-success">         
          New <i className="fa fa-plus"></i>
        </button><Modal onClose={ () => setShow(false)} show={ show} />


        <div className="container">
          <input type="text" />
          <button className=" float-right">
            <i className="fa fa-pen"></i>
          </button>
          <button className=" float-right">
            <i className="fa fa-trash"></i>
          </button>
        </div>
      </div>

      <div className="card bg-grey">
        <h2>
          <b>Role</b>
        </h2>
        <hr />
        <button onClick={() => setShow(true)} className="bg-success">         
          New <i className="fa fa-plus"></i>
        </button><Modal onClose={ () => setShow(false)} show={ show} />

        <div className="container">
          <input type="text" />
          <button className=" float-right">
            <i className="fa fa-pen"></i>
          </button>
          <button className=" float-right">
            <i className="fa fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default FieldsConfiguration;
