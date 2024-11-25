import React, { useRef } from "react";

export default function Deletedata() {
  var y1 = useRef();
  function f2() {
    const data = {
      id: y1.current.value,
    };
    console.log(data);
    const dataa = JSON.stringify(data);
    console.log(dataa);
    fetch(`http://localhost:9000/DeleteData/${y1.current.value}`, {
      method: "DELETE",
    })
      .then((response) => {
        console.log("deleted successfull");
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  return (
    <div>
      <form action="">
        <input type="text" placeholder="id" ref={y1} /> <br />
        <button onClick={f2} type="submit">
          DELETE
        </button>
      </form>
    </div>
  );
}
