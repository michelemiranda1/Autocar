import { useState, useEffect } from 'react';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';
import './App.css';

const url = "http://localhost:3000/carros";

function App() {
  const [carros, setCarros] = useState([]);
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [ano, setAno] = useState("");
  const [preço, setPreço] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const resp = await fetch(url);
      const data = await resp.json();
      setCarros(data);
    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();


    const carro = { marca, modelo, ano, preço: parseFloat(preço) };
    let res;

    if (editMode) {
      res = await fetch(`${url}/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(carro),
      });
      

      setEditMode(false);
      setEditId(null);
    } else {
      res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(carro),
      });
    }

    const data = await res.json();
    setCarros((prevCarros) => {
      if (editMode) {
        return prevCarros.map((p) => (p.id === data.id ? data : p));
      } else {
        return [...prevCarros, data];
      }
    });

    setMarca("");
    setModelo("");
    setAno("");
    setPreço("");
  };

  const handleDelete = async (id) => {
    await fetch(`${url}/${id}`, {
      method: "DELETE",
    });

    setCarros((prevCarros) => prevCarros.filter((carro) => carro.id !== id));
  };

  const handleEdit = (carro) => {
    setMarca(carro.marca);
    setModelo(carro.modelo);
    setAno(carro.ano);
    setPreço(carro.preço);
    setEditMode(true);
    setEditId(carro.id);
  };

  return (
    <>
      <Header />
      <Body 
        carros={carros}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        marca={marca}
        modelo={modelo}
        ano={ano}
        preço={preço}
        editMode={editMode}
        handleSubmit={handleSubmit}
        setMarca={setMarca}
        setModelo={setModelo}
        setAno={setAno}
        setPreço={setPreço}
      />
      <Footer />
    </>
  );
}

export default App;
