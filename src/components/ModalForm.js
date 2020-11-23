import React from 'react'
import './ModalForm.css'

function ModalForm(props) {
    return (
        <div className="modal-form" onClick={props.close}>
            <div className="centered-modal p-5" onClick={(e) => {e.stopPropagation()}}>
                <form onSubmit={props.submitAction}>
                    <div className="form-group">
                        <label>
                            Name
                            <input value={props.name} onChange={props.setName} required type="text" className="form-control" placeholder="Name" name="name"></input>
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Age
                            <input value={props.age} onChange={props.setAge} required type="number" className="form-control" placeholder="Age" name="age"></input>
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Birthdate
                            <input value={props.birthdate} onChange={props.setBirthdate} required type="date" className="form-control" placeholder="Birthdate" name="birthdate"></input>
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary">{props.action}</button>
                    <span className="btn ml-3 btn-danger" onClick={props.close}>Cancelar</span>
                </form>
            </div>
        </div>
    )
}

export default React.memo(ModalForm);