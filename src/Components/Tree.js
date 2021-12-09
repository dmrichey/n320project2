import { useState } from "react";

export default function Tree(props) {
  // Containers for Preview Text, Updated when Mouse is over a Person Node
  // Displayed in SidePanel
  const [namePreview, setNamePreview] = useState("");
  const [bioPreview, setBioPreview] = useState("");

  // Constructs Family Node circles from json data
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
  // Construct Person Node circles from json data
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
        onMouseOver={() => {
          SetPreview(ind);
        }}
        nodeindex={ind}
      />
    );
  });
  // Construct lines from json data
  // Present for visual effect and to enable highlighting in Ancestor/Descendant view
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

  return (
    <div className="content">
      <div className="viewport">
        <svg height="100%" width="100%">
          {lineEls}
          {familyNodeEls}
          {personNodeEls}
        </svg>
      </div>
      <div className="sidePanel">
        <div className="namePreview">{namePreview}</div>
        <div className="bioPreview">{bioPreview}</div>
      </div>
    </div>
  );

  // Set Preview Text on Mouse Over
  function SetPreview(ind) {
    //console.log(ind);
    setNamePreview(props.data.persons[ind].name);
    setBioPreview(props.data.persons[ind].bio);
  }
}
