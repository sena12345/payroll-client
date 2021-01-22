import React, { useEffect} from 'react';

const Modal = props => { 

    if (!props.show) { 
        return null
    }

    

    return (
        <div className="modal" onClick={ props.onClose}>
            <div className="modal-content" onClick={ e => e.stopPropagation()}>
                <div className="modal-head">
                    <h2>Modal Head</h2>
                </div>
                <div className="modal-body container">
                    <input type="text" />
                    <button className="bg-success float-right">Submit</button>
                </div>
                <div className="modal-footer">
                    <button onClick={props.onClose } className="modal-button bg-grey">Close</button>
                </div>
            </div>
        </div>
    );
    
}

export default Modal;
