import "./App.css";
import React, { useState, useEffect } from "react";

export default function App() {
  const [tree, setTree] = useState({});

  useEffect(() => {
    fetch("data.json")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTree(data);
      });
  }, []);

  let familyList = [];
  let personList = [];

  familyList = tree.families;
  personList = tree.persons;

  return <div className="App"></div>;
}
