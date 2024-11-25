import React, { useEffect, useRef, useState } from "react";
import Deletedata from "./Deletedata";

export default function App() {
  var x1 = useRef();
  var x2 = useRef();
  var x3 = useRef();
  var x4 = useRef();
    var x5 = useRef();
    
    function f1() {
        // alert('hgfdgh')
      console.log(
        x1.current.value,
        x2.current.value,
        x3.current.value,
          x4.current.value,
          x5.current.value,
        
      );
      
    var val = {
      id: x1.current.value,
      modelName: x2.current.value,
      brand: x3.current.value,
      price: x4.current.value,
      size: x5.current.value,
    };
    console.log(val);

    var value = JSON.stringify(val);
    console.log(value);

    fetch(`http://localhost:9000/UpdateData/${x1.current.value}`, {
      method: "PUT",
      body: value,
      headers: { "content-type": "application.json" },
    })
      .then((value) => {
        console.log(x1.current.value + "updated");
      })
      .catch((err) => {
        console.log(err.message);
      });
    }
    
  var [data, setdata] = useState([]);
  useEffect(() => {
    fetch("http://localhost:9000/getData")
      .then((res) => res.json())
      .then((val) => {
        console.log(val);
        setdata(val);
      });
  }, []);
  return (
    <div>
      <form action="">
        <input type="text" placeholder="id" ref={x1} /> <br />
        <input type="text" placeholder="modelname" ref={x2} /> <br />
        <input type="text" placeholder="brand" ref={x3} /> <br />
        <input type="text" placeholder="price" ref={x4} /> <br />
        <input type="text" placeholder="size" ref={x5} /> <br />
        <button onClick={f1} type="submit">
          Update
        </button>
      </form>
      <br />
      <h1>Telivisions</h1>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">modelName</th>
            <th scope="col">brand</th>
            <th scope="col">price</th>
            <th scope="col">size</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.length > 0 &&
            data.map((record) => (
              <tr>
                <th>{record.id}</th>
                <td>{record.modelName}</td>
                <td>{record.brand}</td>
                <td>{record.price}</td>
                <td>{record.size}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <br />
      <Deletedata />
    </div>
  );
}
