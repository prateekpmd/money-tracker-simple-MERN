import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [datetime, setdateTime] = useState("");
  const [description, setDescription] = useState("");
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const url = process.env.REACT_APP_API_URL + "/transactions";
    try {
      // Perform data fetching
      const response = await fetch(url);
      const result = await response.json();

      // Update state with fetched data
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Call the fetchData function
    fetchData();
  }, []);

  const addTransaction = async (e) => {
    e.preventDefault();
    const url = process.env.REACT_APP_API_URL + "/transaction";
    const price = name.split(" ")[0];
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: name.substring(price.length + 1),
        price,
        datetime,
        description,
      }),
    });

    if (!response.ok) {
      console.error("HTTP error: ", response.status);
    }
    const Newdata = await response.json();
    console.log(response);
    setData((prevData) => [...prevData, Newdata]);
    setName("");
    setDescription("");
    setdateTime("");
  };

  return (
    <main>
      <h1>
        $400 <span>.00</span>
      </h1>

      <form action="" onSubmit={addTransaction}>
        <div className="basic">
          <input
            type="text"
            name=""
            id=""
            placeholder={"+200 new samsung tv"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="date"
            value={datetime}
            onChange={(e) => setdateTime(e.target.value)}
          />
        </div>
        <div className="description">
          <input
            type="text"
            name=""
            id=""
            placeholder={"description"}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Add new Transaction</button>
      </form>
      <div className="transactions">
        {data.map((singleData) => {
          return (
            <div className="transaction" key={singleData._id}>
              <div className="left">
                <div className="name">{singleData.name}</div>
                <div className="description">{singleData.description}</div>
              </div>
              <div className="right">
                <div className="price green">{singleData.price}</div>
                <div className="datetime"> {singleData.datetime}</div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default App;
