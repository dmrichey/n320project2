import { useState } from "react";

export default function Ancestors(props) {
  // Preview Text Containers
  const [namePreview, setNamePreview] = useState("");
  const [bioPreview, setBioPreview] = useState("");

  // array containing lines to style to highlight
  let linesToStyle = [];

  // array for traversal of graph
  let nodesToVisit = [];
  // add starting Node to array
  nodesToVisit.push(props.data.persons[props.index]);
  let currentNode = {};
  // remove currentNode from toVisit, showing Visited
  currentNode = nodesToVisit.shift();
  // search Node data for higher Nodes in graph (parents, spouses)
  while (currentNode != null) {
    if (currentNode.isFamily) {
      let parentNum1 = currentNode.spouse1;
      let parentNum2 = currentNode.spouse2;
      // if both spouses are valid Nodes, add to toVisit array
      if (parentNum1 !== 0 && parentNum2 !== 0) {
        nodesToVisit.push(props.data.persons[parentNum1]);
        nodesToVisit.push(props.data.persons[parentNum2]);
        linesToStyle.push(props.data.lines[currentNode.spouse1Line]);
        linesToStyle.push(props.data.lines[currentNode.spouse2Line]);
      }
    } else {
      let parentNum = currentNode.parents;
      // if parent is valid Node, add to toVisit array
      if (parentNum !== 0) {
        nodesToVisit.push(props.data.families[parentNum]);
        linesToStyle.push(props.data.lines[currentNode.parentLine]);
      }
    }
    // remove first element of toVisit, search for higher Nodes
    currentNode = nodesToVisit.shift();
  }
  //console.log(linesToStyle);

  // Construct Tree Copy
  let familyNodeEls = props.data.families.map((node, ind) => {
    return (
      <circle
        className="familyNode"
        r={25}
        cx={node.nodeXCoord}
        cy={node.nodeYCoord}
        onClick={() => {
          props.selectFamily(ind);
        }}
        nodeindex={ind}
      />
    );
  });
  let personNodeEls = props.data.persons.map((node, ind) => {
    return (
      <circle
        className="personNode"
        r={25}
        cx={node.nodeXCoord}
        cy={node.nodeYCoord}
        onClick={() => {
          props.selectPerson(ind);
        }}
        onMouseEnter={() => {
          SetPreview(ind);
        }}
        nodeindex={ind}
      />
    );
  });
  let lineEls = props.data.lines.map((line, ind) => {
    return (
      <line
        x1={line.x1Coord}
        y1={line.y1Coord}
        x2={line.x2Coord}
        y2={line.y2Coord}
        stroke="black"
        strokeWidth={5}
      />
    );
  });
  // Reconstruct Highlighted Lines
  let highlightedLineEls = linesToStyle.map((line, ind) => {
    return (
      <line
        x1={line.x1Coord}
        y1={line.y1Coord}
        x2={line.x2Coord}
        y2={line.y2Coord}
        stroke="gold"
        strokeWidth={10}
      />
    );
  });

  // Display Ancestors
  return (
    <div className="content">
      <div className="viewport">
        <svg height="100%" width="100%">
          {lineEls}
          {highlightedLineEls}
          {familyNodeEls}
          {personNodeEls}
        </svg>
      </div>
      <div className="sidePanel">
        <div className="namePreview">{namePreview}</div>
        <div className="bioPreview">{bioPreview}</div>
        <button onClick={props.resetStyles}>Reset Tree</button>
      </div>
    </div>
  );

  // Set Preview Text
  function SetPreview(ind) {
    console.log(ind);
    setNamePreview(props.data.persons[ind].name);
    setBioPreview(props.data.persons[ind].bio);
  }
}
