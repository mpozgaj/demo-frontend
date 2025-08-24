import { useState } from 'react';

function App() {
  const [oib, setOib] = useState("");
  const [card, setCard] = useState(null);

  const getCard = () => {
    const url = '/api/v1/card-request/' + oib;
    const data = fetch(url)
      .then(resp => resp.json())
      .then(data => setCard(data));
  };
  function createCard(formData) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        oib: formData.get('oib'),
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        status: formData.get('status')
      })
    };

    fetch('/api/v1/card-request', requestOptions);
  };

  return (
    <header>
      <h1>My CRUD App</h1>
      <div>
        <input
          placeholder="12345678901"
          onChange={(event) => {
            setOib(event.target.value)
          }}></input>
        <button onClick={getCard}>
          Get card by OIB
        </button>
        <h1>OIB: {card?.oib}</h1>
        <h1>Name: {card?.firstName}</h1>
        <h1>Surname: {card?.lastName}</h1>
        <h1>Status: {card?.status}</h1>
      </div>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <div>
        <h1>Create Credit Card:</h1>
        <form action={createCard}>
          <label htmlFor="oib">OIB: </label>
          <input name="oib" placeholder="12345678901" />
          <br/>
          <label htmlFor="firstName">Name: </label>
          <input name="firstName" placeholder="Tom" />
          <br/>
          <label htmlFor="lastName">Surname: </label>
          <input name="lastName" placeholder="Smith" />
          <br/>
          <label htmlFor="status">Card status: </label>
          <select id="status" name="status">
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
          <br/>
          <button>Send request</button>
        </form>
      </div>
    </header>
  );
}

export default App;
