import React, { useState } from 'react'
import ModalForm from './ModalForm'

export default function AddDriverForm(props) {
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [birthdate, setBirthdate] = useState("");

    async function postDriver(e) {
        e.preventDefault();
        const body = { age, birthdate, name };

        try {
            let res = await fetch("http://localhost:8080/api/bus-drivers", {
                method: "POST",
                headers: new Headers({'Content-Type': 'application/json', 'Accept': '*/*'}),
                body: JSON.stringify(body)
            });
            if (res.ok) {
                props.updateDashboard();
            } else {
                alert('Houve um erro, tente novamente mais tarde');
            }
        } catch (err) {
            console.log(err);
            alert('Houve um erro, tente novamente mais tarde');
        }
    }

    return (
        <>
            <span className="btn btn-lg btn-dark mt-5 mb-5" onClick={() => {setShowForm(true)}}>
                Adicionar motorista
            </span>

            { showForm ? <ModalForm close={(e) => {setShowForm(false)}} submitAction={postDriver} action="Adicionar" name={name}  age={age} birthdate={birthdate} setName={e => setName(e.target.value)} setAge={e => setAge(parseInt(e.target.value))} setBirthdate={e => setBirthdate(e.target.value)} /> : null }
        </>
    )
}
