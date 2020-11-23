import React, { useState } from 'react'
import ModalForm from './ModalForm';

export default function Driver(props) {
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [name, setName] = useState(props.name);
    const [age, setAge] = useState(props.age);
    const [birthdate, setBirthdate] = useState(props.birthdate);

    async function deleteDriver() {
        try {
            let res = await fetch(`http://localhost:8080/api/bus-drivers/${props.id}`, {
                method: "DELETE",
                headers: new Headers({'Accept': '*/*'})
            });

            if (res.ok) {
                setShowUpdateForm(false);
                props.updateDashboard();
            } else {
                alert('Houve um erro, tente novamente mais tarde');
            }

        } catch (err) {
            console.log(err);
            alert('Houve um erro, tente novamente mais tarde');
        }
    }

    async function updateDriver(e) {
        e.preventDefault();
        const body = { age, birthdate, name, id: props.id };

        try {
            let res = await fetch("http://localhost:8080/api/bus-drivers", {
                method: "PUT",
                headers: new Headers({'Content-Type': 'application/json', 'Accept': '*/*'}),
                body: JSON.stringify(body)
            });
            if (res.ok) {
                setShowUpdateForm(false);
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
            <tr>
                <td>
                    {props.id}
                </td>

                <td>
                    {props.name}
                </td>

                <td>
                    {props.age}
                </td>
                
                <td>
                    {props.birthdate}
                </td>

                <td>
                    <span className="btn btn-danger mr-2" onClick={deleteDriver}>
                        Deletar
                    </span>

                    <span className="btn btn-primary" onClick={() => setShowUpdateForm(true)}>
                        Editar
                    </span>

                    { showUpdateForm ? <ModalForm close={(e) => {setShowUpdateForm(false)}} submitAction={updateDriver} action="Editar" name={name} age={age} birthdate={birthdate} setName={e => setName(e.target.value)} setAge={e => setAge(parseInt(e.target.value))} setBirthdate={e => setBirthdate(e.target.value)} /> : null }
                </td>
            </tr>
        </>
    )
}
