import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {

  const [imageLoading, setImageLoading] = useState(false);
  const [textLoading, setTextLoading] = useState(false);

  const [userLoading, setUserLoading] = useState(false);

  const [tab, setTab] = useState(1);

  const [image, setImage] = useState("");
  const [text, setText] = useState("");

  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    setUserLoading(true);

    try {
      const res = await axios.get("https://backend-vy0n.onrender.com/api/v1/user");
      setUsers(res.data);
      setUserLoading(false);
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
    setImageLoading(true);
    try {
      const res = await axios.patch("https://backend-vy0n.onrender.com/api/v1/form", {
        image: image
      });
      setImageLoading(false);
      alert("Updated!")
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  const uploadText = async (e) => {
    
    e.preventDefault();
    setTextLoading(true);
    try {
      const res = await axios.patch("https://backend-vy0n.onrender.com/api/v1/form", {
        buttonText: text
      });
      setTextLoading(false);
      setText("");
      alert("Submitted!")
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
            <button type='submit' className='upload'>
              {imageLoading ? (
                <svg aria-hidden="true" role="status" className="loading" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="rgb(196, 149, 240)"/>
                </svg>

              ) : (<></>)}
              Upload
            </button>
          </form>
          
          <div style={{"marginBlock": "20px"}}>
              <img src={image} alt="" />
          </div>

          <p style={{"fontSize": "14px", "marginBottom": "30px"}}>Change Button Text</p>
          <form className='form-container' onSubmit={uploadText}>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} required/>
            <button type='submit' className='upload'>
            {textLoading ? (
                <svg aria-hidden="true" role="status" className="loading" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="rgb(196, 149, 240)"/>
                </svg>

              ) : (<></>)}
              Submit
            </button>
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
            {!userLoading ? users.map((user) => (
              <tr key={user._id}>
                <td style={{"textAlign": "left"}}>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            )) : (
              <tr>
                <td style={{"textAlign": "left"}}>
                  <svg aria-hidden="true" role="status" className="loading" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="rgb(196, 149, 240)"/>
                    </svg>

                </td>
              </tr>
            )}            

          </tbody>          
        </table>


      )}

      

      

    </div>
  )
}

export default App
