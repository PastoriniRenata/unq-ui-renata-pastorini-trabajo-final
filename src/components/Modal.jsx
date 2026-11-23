const Modal = ({ title, onClose, children }) => {
  return (
    <>
      <div className="modal d-block" role="dialog" aria-modal="true" onClick={onClose}>
        <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title fs-5">{title}</h2>
              {onClose && (
                <button type="button" className="btn-close" aria-label="Cerrar" onClick={onClose} />
              )}
            </div>
            <div className="modal-body">{children}</div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop show" />
    </>
  );
};

export default Modal;
