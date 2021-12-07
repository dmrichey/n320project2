export default function Ancestors(props) {
  let linesToStyle = [];
  let nodesToVisit = [];
  //console.log(props.data.persons[props.index]);
  nodesToVisit.push(props.data.persons[props.index]);
  let currentNode = { id: 0, parents: 0, marriage: 0, isFamily: false };
  currentNode = nodesToVisit.shift();
  //console.log(currentNode);
  //console.log(currentNode.id);
  while (currentNode != null) {
    if (currentNode.isFamily) {
      let parentNum1 = currentNode.spouse1;
      let parentNum2 = currentNode.spouse2;
      if (parentNum1 !== 0 && parentNum2 !== 0) {
        nodesToVisit.push(props.data.persons[parentNum1]);
        nodesToVisit.push(props.data.persons[parentNum2]);
        linesToStyle.push(props.data.lines[currentNode.spouse1Line]);
        linesToStyle.push(props.data.lines[currentNode.spouse2Line]);
      }
    } else {
      let parentNum = currentNode.parents;
      if (parentNum !== 0) {
        nodesToVisit.push(props.data.families[parentNum]);
        linesToStyle.push(props.data.lines[currentNode.parentLine]);
      }
    }
    currentNode = nodesToVisit.shift();
  }
  console.log(linesToStyle);

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
        //onMouseEnter={SetPreview(ind)}
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
        <button onClick={props.resetStyles}>Reset Tree</button>
      </div>
    </div>
  );

  //function SetPreview(ind) {
  //console.log(ind);
  //setNamePreview(props.data.persons[ind].name);
  //setBioPreview(props.data.persons[ind].bio);
  //}
}
