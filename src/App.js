import "./App.css";
import React, { useState, useEffect } from "react";
import Tree from "./Components/Tree";
import Family from "./Components/Family";
import Person from "./Components/Person";
import Ancestors from "./Components/Ancestors";
import Descendants from "./Components/Descendants";

export default function App() {
  const [treeData, setTreeData] = useState({});
  const [familyIndex, setFamilyIndex] = useState(0);
  const [personIndex, setPersonIndex] = useState(0);
  const [currentDisplay, setCurrentDisplay] = useState(0);

  useEffect(() => {
    fetch("data.json")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTreeData(data);
      });
  }, []);

  // Display Tree
  if (currentDisplay === 0) {
    return (
      <div className="App">
        <Tree
          data={treeData}
          selectFamily={selectFamily}
          selectPerson={selectPerson}
        />
      </div>
    );
  } // Display Family Node
  else if (currentDisplay === 1) {
    return (
      <div className="App">
        <Family
          data={treeData}
          index={familyIndex}
          selectPerson={selectPerson}
        />
      </div>
    );
  } // Display Person Node
  else if (currentDisplay === 2) {
    return (
      <div className="App">
        <Person
          data={treeData}
          index={personIndex}
          selectFamily={selectFamily}
          displayAncestors={displayAncestors}
          displayDescendants={displayDescendants}
        />
      </div>
    );
  } // Displays Tree and Highlights Ancestors of Current Person
  else if (currentDisplay === 3) {
    return (
      <div className="App">
        <Ancestors
          data={treeData}
          index={personIndex}
          selectFamily={selectFamily}
          selectPerson={selectPerson}
          resetStyles={returnToTree}
        />
      </div>
    );
  } // Displays Tree and Highlights Descendants of Current Person
  else if (currentDisplay === 4) {
    return (
      <div className="App">
        <Descendants
          data={treeData}
          index={personIndex}
          selectFamily={selectFamily}
          selectPerson={selectPerson}
          resetStyles={returnToTree}
        />
      </div>
    );
  }

  function returnToTree() {
    setFamilyIndex(0);
    setPersonIndex(0);
    setCurrentDisplay(0);
  }

  function selectFamily(nodeId) {
    setFamilyIndex(nodeId);
    setCurrentDisplay(1);
  }

  function selectPerson(nodeId) {
    setPersonIndex(nodeId);
    setCurrentDisplay(2);
  }

  function displayAncestors() {
    setCurrentDisplay(3);
  }

  function displayDescendants() {
    setCurrentDisplay(4);
  }
}
