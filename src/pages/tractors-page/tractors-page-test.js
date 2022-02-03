import { useAuth0 } from "@auth0/auth0-react";
import { getTractorsTable } from "api";
import React, { useEffect, useRef, useState } from "react";
import { TabulatorFull as Tabulator } from "tabulator-tables";

const FuelLocationsPage = () => {
  const [tractors, setTractors] = useState([]);
  const [tractorsInit, setTractorsInit] = useState([]);
  const [finalTractorsList, setFinalTractorsList] = useState([]);

  const [recCounter, setRecCounter] = useState(-1);

  const [loading, setLoading] = useState(true);

  const tabulatorContainer = useRef();
  const tabulator = useRef();

  const { user } = useAuth0();

  useEffect(() => {
    const getTractorsTableAsync = async () => {
      try {
        const { data } = await getTractorsTable(user["https://ifuelsmart.com/company"]);
        setTractors(data);
        setTractorsInit(JSON.parse(JSON.stringify(data)));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getTractorsTableAsync();
  }, [user]);

  useEffect(() => {
    tabulator.current = new Tabulator(tabulatorContainer.current, {
      // height: "100%",
      height: "300px",
      placeholder: loading ? "Retrieving Tractors" : "No Tractors",
      layout: "fitColumns",
      selectable: false,
      data: tractors,
      columns: [
        { title: "Id", field: "vehicleid", headerFilter: "input", headerFilterPlaceholder: "Enter id", editor: true },
        { title: "Email", field: "emailAddress", editor: true },
        { title: "Tank Capacity", field: "tankCapacity", editor: true },
        {
          title: "Status",
          field: "flag",
          formatter: "tickCross",
          editor: true,
          editable: true,
        },
        {
          title: "Delete",
          field: "passed",
          formatter: () => "delete",
          cellClick: function (e, cell) {
            cell.getRow().delete();
          },
        },
      ],
    });
    tabulator.current.on("dataChanged", (newData) => {
      console.log("Data changed even fired");
      setTractors(newData);
    });
  }, [user, loading, tractors]);

  const saveAll = () => {
    //Step 1 - Convert array of objects to array of strings
    let newList = [];
    if (null != tractors) {
      for (let i = 0; i < tractors.length; i++) {
        newList.push(JSON.stringify(tractors[i]));
      }
    }

    //Step 2 - Convert array of objects to array of strings
    let oldList = [];
    if (null != tractorsInit) {
      for (let i = 0; i < tractorsInit.length; i++) {
        oldList.push(JSON.stringify(tractorsInit[i]));
      }
    }

    //Step 3 - Items to add/modify/delete
    let insertList = newList.filter((x) => !oldList.includes(x));
    let deleteList = oldList.filter((x) => !newList.includes(x));
    let modifyObjects = [];

    //Step 4 - Bring objects back for further  process
    let insertObjects = [];
    let deleteObjects = [];

    if (null != insertList) {
      for (let i = 0; i < insertList.length; i++) {
        insertObjects.push(JSON.parse(insertList[i]));
      }
    }

    if (null != deleteList) {
      for (let i = 0; i < deleteList.length; i++) {
        deleteObjects.push(JSON.parse(deleteList[i]));
      }
    }

    //Step 5 - find intersection of IDs
    let insertArray = [];
    let deleteArray = [];

    insertObjects.forEach((item) => {
      insertArray.push(item.vehicleid); // used to be id
    });
    deleteObjects.forEach((item) => {
      deleteArray.push(item.vehicleid); // used to be id
    });

    let intersectionArray = [];
    intersectionArray = insertArray.filter((value) => deleteArray.includes(value));

    //Step 6 - For intersection ids,
    // a) remove id from insert list,
    // b) remove from delete list and add to modify list.
    if (typeof intersectionArray !== "undefined" && intersectionArray.length > 0) {
      let modifyObjectsNew = [];
      //a) remove id from insert list,
      let insertObjectsNew = [];
      if (null != insertObjects) {
        for (let i = 0; i < insertObjects.length; i++) {
          if (!intersectionArray.includes(insertObjects[i].vehicleid)) {
            // used to be id
            insertObjectsNew.push(insertObjects[i]);
            //console.log("inserting==>"+insertObjects[i]);
          } else {
            modifyObjectsNew.push(insertObjects[i]);
          }
        }

        insertObjects = JSON.parse(JSON.stringify(insertObjectsNew));
      }

      // b) remove from delete list and add to modify list.
      let deleteObjectsNew = [];

      if (null != deleteObjects) {
        for (let i = 0; i < deleteObjects.length; i++) {
          if (!intersectionArray.includes(deleteObjects[i].vehicleid)) {
            //used to be .id
            deleteObjectsNew.push(deleteObjects[i]);
          } //else {
          //modifyObjectsNew.push(deleteObjects[i]);
          //}
        }

        deleteObjects = JSON.parse(JSON.stringify(deleteObjectsNew));
        modifyObjects = JSON.parse(JSON.stringify(modifyObjectsNew));
      }
    }

    const finalList = {
      INSERT: insertObjects,
      MODIFY: modifyObjects,
      DELETE: deleteObjects,
    };
    setFinalTractorsList(finalList);
  };

  //Add new record
  function addNewRow() {
    var rec1 = {
      vehicleid: recCounter,
      emailAddress: "new-truck@gmail.com",
      tankCapacity: 360,
      flag: false,
    };
    tractors.push(rec1);
    setTractors(tractors);
    setRecCounter(recCounter - 1);

    tabulator.current.addRow(rec1, true);
  }

  return (
    <>
      <div ref={tabulatorContainer} />
      <button onClick={addNewRow}>Add Product</button>
      <button onClick={saveAll}>Save</button>
      Final Tractors List:
      {finalTractorsList === null ? (
        <div> Nothing to save </div>
      ) : (
        <div>
          Insert: {JSON.stringify(finalTractorsList.INSERT)}
          <br /> Modify: {JSON.stringify(finalTractorsList.MODIFY)}
          <br /> Delete: {JSON.stringify(finalTractorsList.DELETE)}
        </div>
      )}
      <br />
      Note: Send this to Services/DB to store
    </>
  );
};

export default FuelLocationsPage;
