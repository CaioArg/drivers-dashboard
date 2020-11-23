import React from 'react'
import './Table.css'

function Table(props) {
    return (
        <div className="mt-5 table-responsive limit">
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>
                            ID
                        </th>

                        <th>
                            Nome
                        </th>

                        <th>
                            Idade
                        </th>

                        <th>
                            Data de Nascimento                                   
                        </th>

                        <th>
                            Ações                                   
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {props.children}
                </tbody>
            </table>
        </div>
    )
}

export default React.memo(Table);