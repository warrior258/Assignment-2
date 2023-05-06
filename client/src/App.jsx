import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {

  const [tab, setTab] = useState(1);

  const [image, setImage] = useState("");
  const [text, setText] = useState("");

  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5500/api/v1/user");
      setUsers(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUsers();
  },[])

  const covertToBase64 = (e) => {
    
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImage(reader.result);
    }

    reader.onerror = (error) => {
      console.log(error);
    }
  }

  const uploadFile = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.patch("http://localhost:5500/api/v1/form", {
        image: image,
        buttonText: text !== "" ? text : "Next"
      });
      alert("Updated!")
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>

      <div className='navbar'>
        <p onClick={() => setTab(1)}>Update Data</p>
        <p onClick={() => setTab(2)}>View User Info</p>
      </div>

      {tab === 1 ? (
        <>
          <p style={{"fontSize": "14px", "marginBottom": "30px"}}>Change Form Image</p>
          <form className='form-container' onSubmit={uploadFile}>
            <input type="file" accept='image/*' onChange={(e) => covertToBase64(e)} required/>
            <button type='submit'>Upload</button>
          </form>
          
          <div style={{"marginBlock": "20px"}}>
              <img src={image} alt="" />
          </div>

          <p style={{"fontSize": "14px", "marginBottom": "30px"}}>Change Button Text</p>
          <form className='form-container' onSubmit={uploadFile}>
            <input type="text" onChange={(e) => setText(e.target.value)} required/>
            <button type='submit'>Submit</button>
          </form>
        </>
      ): (

        <table> 
          <thead>
            <tr>
              <th style={{"textAlign": "left"}}>Name</th>
              <th>Email</th>
            </tr>
          </thead> 
          <tbody style={{"fontSize": "15px"}}>
            {users.map((user) => (
              <tr key={user._id}>
                <td style={{"textAlign": "left"}}>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}            

          </tbody>          
        </table>

      )}

      

      

    </div>
  )
}

export default App
