export default function Family(props) {
  let currentFamily = props.index;
  let familyList = props.data.families;

  //console.log(currentPerson);
  //console.log(personList);
  //console.log(personList[currentPerson]);

  // Dynamically place the Children buttons, based on the number of children of the Family
  let numChildren = familyList[currentFamily].children.length + 1;
  let childButtonEls = familyList[currentFamily].children.map((child, ind) => {
    return (
      <circle
        cx={(1280 / numChildren) * (ind + 1)}
        cy="872"
        r="25"
        fill="purple"
        onClick={() => props.selectPerson(child)}
      />
    );
  });

  // Display Family View, with Buttons to move to connected Person Nodes
  return (
    <div className="content">
      <div className="viewport">
        <div className="info"></div>
        <svg className="nodeButtons" height="100%" width="1280px">
          <circle
            cx="320"
            cy="80"
            r="25"
            fill="purple"
            onClick={() => {
              props.selectPerson(familyList[currentFamily].spouse1);
            }}
          />
          <circle
            cx="960"
            cy="80"
            r="25"
            fill="purple"
            onClick={() => {
              props.selectPerson(familyList[currentFamily].spouse2);
            }}
          />
          {childButtonEls}
        </svg>
      </div>
      <div className="sidePanel">
        <button onClick={props.resetStyles}>Return to Tree</button>
      </div>
    </div>
  );
}
