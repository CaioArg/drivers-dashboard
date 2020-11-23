import React, { useState, useEffect } from 'react'
import './Dashboard.css'
import Card from './Card'
import Table from './Table'
import Driver from './Driver'
import AddDriverForm from './AddDriverForm'

export default function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [drivers, setDrivers ]= useState(null);
    const [filterString, setFilterString ]= useState("");
    let dashboardContent;

    async function loadData() {
        setLoading(true);

        try {
            let data = await fetch("http://localhost:8080/api/bus-drivers");
            setDrivers(await data.json());
            setLoading(false);
        } catch (err) {
            console.log(err);
            alert('Houve um erro, tente novamente mais tarde');
        }
    }

    useEffect(() => { loadData() }, []);

    function getVowelsCount(drivers) {
        let vowelsCount = 0;
        let vowels = ['a', 'á', 'ã', 'â', 'e', 'é', 'ê', 'i', 'í', 'î', 'o', 'ó', 'ô', 'õ', 'u', 'ú', 'û'];

        drivers.forEach(driver => {
            for (let i = 0; i < driver.name.length; i++) {
                if (vowels.includes((driver.name[i]).toLowerCase())) vowelsCount++;
            }
        });

        return vowelsCount;
    }

    function getAvarageAge(drivers) {
        let agesSum = 0;

        drivers.forEach(driver => {
            agesSum = agesSum + driver.age;
        });

        let avarageAge = (agesSum / drivers.length).toFixed()

        return isNaN(avarageAge) ? 0 : avarageAge;
    }

    function getFilteredDrivers(drivers) {
        return drivers.filter(driver => {
            return driver.name.toLowerCase().includes(filterString.toLowerCase());
        })
    }

    if (loading) {
        dashboardContent = <div className="loader"></div>
    } else {
        dashboardContent = (
            <>
                <h1 className="display-4 mt-4 mb-4">Motoristas</h1>

                <div className="d-flex flex-column flex-md-row justify-content-between">
                    <div className="d-flex">
                        <Card heading="Soma de vogais" content={getVowelsCount(drivers)} />
                        <Card heading="Média de idade" content={getAvarageAge(drivers)} />
                    </div>

                    <div className="align-self-start align-self-md-end mt-4 mt-lg-0">
                        <label className="d-flex flex-column">
                            Filtrar por nome:
                            <input value={filterString} type="text" placeholder="Nome" onChange={(e) => setFilterString(e.target.value)}></input>
                        </label>
                    </div>
                </div>

                <Table>
                    {getFilteredDrivers(drivers).map(driver => {
                        return <Driver key={driver.id} updateDashboard={loadData} id={driver.id} name={driver.name} age={driver.age} birthdate={driver.birthdate}/>
                    })}
                </Table>

                <AddDriverForm updateDashboard={loadData}/>
            </>
        )
    }

    return (
        <div className="container">
            {dashboardContent}
        </div>
    )
}