import React, {useState, useEffect} from 'react';
import './App.scss';

function App() {
  const [input, setinput] = useState({item:"", qty:""})
  const [list, setList] = useState([])
  
  const changeHandler = (e) => {
    //console.log(input)
    setinput({
      ...input,
      [e.target.name]: e.target.value
    })
  }
  
  useEffect(()=>{
    verifyLocalStorage()
    setList(JSON.parse(localStorage.getItem("shoppingcart")))
  },[])

  useEffect(()=>{
    console.log("list:", list)
    setLocalStorage()
  },[list])


  const verifyLocalStorage = () => {
    localStorage.getItem("shoppingcart") == null && localStorage.setItem("shoppingcart", JSON.stringify(list))
  }

  const setLocalStorage = () => {
    console.log("setLocalStorage JSON", JSON.stringify(list))
    localStorage.setItem("shoppingcart", JSON.stringify(list))
  }

  const submitHandler = (e) => {
    e.preventDefault()
    setList([
      ...list,
      input
    ])
    setinput({item:"", qty:""})
    console.log("submithandler")
  }

  const deleteHandler = (e) => {
    e.preventDefault()
    console.log("deleted", e.target.value)
    setList(list.filter((item)=>{
      return item.item !== e.target.value
    }))

  }


  return (
    <>
      <header>
        <form
          onSubmit={submitHandler}
        >
          <p>Add Item</p>
          <label>Item</label>
          <input 
            name="item"
            value={input.item}
            onChange={changeHandler}        
          />
          <label>Qty</label>
          <input 
            name="qty"
            value={input.qty}
            onChange={changeHandler}        
          />
          <button type="submit">Add to list</button>
        </form>
      </header>
      <section>
        {
          list.map((item, index) => (
            <article key={index}>
              <p>{item.item} qty: {item.qty}</p><button value={item.item} onClick={deleteHandler}>Delete</button>
            </article>
          ))
        }
      </section>
    </>
  );
}

export default App;
