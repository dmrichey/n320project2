export default function Tree(props) {
  let familyNodeEls = props.data.families.map((node, ind) => {
    return (
      <circle
        className="familyNode"
        r={25}
        cx={node.nodeXCoord}
        cy={node.nodeYCoord}
        onClick={props.selectFamily}
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
        onClick={props.selectPerson}
        //onMouseOver={SetPreview(ind)}
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

  return (
    <div className="content">
      <div className="viewport">
        <svg height="100%" width="100%">
          {lineEls}
          {familyNodeEls}
          {personNodeEls}
        </svg>
      </div>
      <div className="sidePanel"></div>
    </div>
  );

  //function SetPreview(ind) {
  //console.log(ind);
  //setNamePreview(props.data.persons[ind].name);
  //setBioPreview(props.data.persons[ind].bio);
  //}
}
