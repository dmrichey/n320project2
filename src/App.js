import React, { useState, useEffect } from "react";
import Tree from "./Components/Tree";
import Family from "./Components/Family";
import Person from "./Components/Person";
import Ancestors from "./Components/Ancestors";
import Descendants from "./Components/Descendants";
import "./styles.css";

export default function App() {
  // container for json data
  const [treeData, setTreeData] = useState({});
  // index into families array within data
  const [familyIndex, setFamilyIndex] = useState(0);
  // index into persons array within data
  const [personIndex, setPersonIndex] = useState(0);
  // toggle amongst component views
  const [currentDisplay, setCurrentDisplay] = useState(0);
  // enables delay to ensure data loads properly
  const [loading, setLoading] = useState(true);

  // load data
  useEffect(() => {
    setLoading(true);
    fetch("data.json")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTreeData(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Currently Loading Data</p>;
  }

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
          resetStyles={returnToTree}
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
          resetStyles={returnToTree}
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

  // Triggered on Click from all components except Tree, to return to Tree
  function returnToTree() {
    setFamilyIndex(0);
    setPersonIndex(0);
    setCurrentDisplay(0);
  }

  // Selects a Family Node, and Displays the data and connections associated
  function selectFamily(nodeId) {
    if (nodeId === 0) {
      returnToTree();
    }
    setFamilyIndex(nodeId);
    setCurrentDisplay(1);
  }

  // Selects a Person Node, and Displays the data and connections associated
  function selectPerson(nodeId) {
    if (nodeId === 0) {
      returnToTree();
    }
    setPersonIndex(nodeId);
    setCurrentDisplay(2);
  }

  // Called from within Person view, displays Ancestors of that Person
  function displayAncestors() {
    setCurrentDisplay(3);
  }

  // Called from within Person view, displays Descendants of that Person
  function displayDescendants() {
    setCurrentDisplay(4);
  }
}
