import { useEffect, useState } from 'react'

function App() {
  const [items, setItems] = useState([])

  useEffect(() => {  // useEffect runs this function whenever any of its dependencies are re-rendered
    fetch("/api/items")
    .then(res => res.json())
    .then(data => setItems(data));
  }, []);  // Empty array of dependencies, so this is only run on page load, could put items in here to run this each time items is updated

  function renderItems() {
    return items.map((item, i) => {
      return (
        <div key={i}>
          <h3>{item.name}</h3>
          <p>Price: {item.price}</p>
        </div>
      );
    });
  }

  return (
      <main>
        <h1>Example webshop!</h1>
        {renderItems()}
      </main>
  )
}

export default App
