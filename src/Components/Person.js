export default function Person(props) {
  let currentPerson = props.index;
  let personList = props.data.persons;

  //console.log(currentPerson);
  //console.log(personList);
  //console.log(personList[currentPerson]);

  // Display Person Data, with Buttons to move to Connected Family Nodes
  return (
    <div className="content">
      <div className="viewport">
        <div className="info">
          <h1>{personList[currentPerson].name}</h1>
          <h2>{"Race: " + personList[currentPerson].race}</h2>
          <h3>
            {personList[currentPerson].bornText +
              ": " +
              personList[currentPerson].born}
          </h3>
          <h3>
            {personList[currentPerson].deathText +
              ": " +
              personList[currentPerson].died}
          </h3>
          <h3>{personList[currentPerson].bio}</h3>
        </div>
        <svg className="nodeButtons" height="100%" width="1280px">
          <circle
            //points="640,80 680,120 600,40"
            cx="640"
            cy="80"
            r="25"
            fill="gold"
            onClick={() => {
              if (personList[currentPerson].parents === 0) {
                props.resetStyles();
              } else {
                props.selectFamily(personList[currentPerson].parents);
              }
            }}
          />
          <circle
            //points="640,872 600,832 680,832"
            cx="640"
            cy="872"
            r="25"
            fill="gold"
            onClick={() => {
              if (personList[currentPerson].marriage === 0) {
                props.resetStyles();
              } else {
                props.selectFamily(personList[currentPerson].marriage);
              }
            }}
          />
        </svg>
      </div>
      <div className="sidePanel">
        <button onClick={props.resetStyles}>Return to Tree</button>
        <button onClick={props.displayAncestors}>Display Ancestors</button>
        <button onClick={props.displayDescendants}>Display Descendants</button>
      </div>
    </div>
  );
}
