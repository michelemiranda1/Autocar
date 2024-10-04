import React from "react";

function Body(
    {carros, editMode, handleSubmit, marca, modelo, preço, ano, handleEdit, handleDelete, setMarca, setModelo, setPreço, setAno}
){
    return (
        <main className="conteudo">
            <div className="container">
                <ul className="lista-carros">
                    {carros.map((carro) => (
                        <li key={carro.id} className="itens-carro">
                            <div className="carro-infos">
                                <h3>{carro.marca}</h3>
                                <p>{carro.modelo}</p>
                                <p>{carro.ano}</p>
                                <p>{carro.preço}</p>
                            </div>
                            <div className="carro-actions">
                                <button onClick={() => handleEdit(carro)}>Editar</button>
                                <button onClick={() => handleDelete(carro.id)}>Deletar</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="forms">
                <h2>{editMode ? "Editar veículo" : "Adicionar veículo"}</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Marca:
                        <input type="text" 
                        value={marca}
                        onChange={(e) => setMarca(e.target.value)}
                        required
                        minLength="2"
                        />    
                    </label> <br/>
                    <label>
                        Modelo:
                        <input type="text" 
                        value={modelo}
                        onChange={(e) => setModelo(e.target.value)}
                        required
                        minLength="2"
                        />    
                    </label> <br/>
                    <label>
                        Ano:     
                        <input type="number" 
                        value={ano}
                        onChange={(e) => setAno(e.target.value)}
                        required
                        min="1990"
                        max="2024"
                        />  
                    </label> <br/>
                    <label>
                        Preço: 
                        <input type="number" 
                        value={preço}
                        onChange={(e) => setPreço(e.target.value)}
                        required
                        minLength="0.01"
                        />  
                    </label>
                    <input type="submit" className="forms-button" value={editMode ? "Atualizar" : "Criar"} />
                </form>
            </div>
        </main>
    );
}


export default Body;
