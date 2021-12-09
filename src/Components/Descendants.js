import { useState } from "react";

export default function Descendants(props) {
  // Containers for Preview Text
  const [namePreview, setNamePreview] = useState("");
  const [bioPreview, setBioPreview] = useState("");

  // Container for highlighted lines
  let linesToStyle = [];

  // Container for navigating graph
  let nodesToVisit = [];

  // Begin at current Node
  nodesToVisit.push(props.data.persons[props.index]);
  let currentNode = {};
  currentNode = nodesToVisit.shift();
  // Search through graph for lower level Nodes(marriages, children)
  while (currentNode != null) {
    if (currentNode.isFamily) {
      // add children to toVisit
      currentNode.children.forEach((element) => {
        nodesToVisit.push(props.data.persons[element]);
      });
      currentNode.childrenLines.forEach((element) => {
        linesToStyle.push(props.data.lines[element]);
      });
    } else {
      let marriageNum = currentNode.marriage;
      // if valid marriage, add to toVisit
      if (marriageNum !== 0) {
        nodesToVisit.push(props.data.families[marriageNum]);
        linesToStyle.push(props.data.lines[currentNode.marriageLine]);
      }
    }
    // remove first element from toVisit, search for lower Nodes
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
        stroke="purple"
        strokeWidth={10}
      />
    );
  });

  // Display Descendants
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

  // Update preview text
  function SetPreview(ind) {
    console.log(ind);
    setNamePreview(props.data.persons[ind].name);
    setBioPreview(props.data.persons[ind].bio);
  }
}
