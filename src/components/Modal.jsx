import { useEffect } from "react";

const Modal = ({ title, onClose, children }) => {
  useEffect(() => {
    if (!onClose) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <>
      <div className="modal d-block" role="dialog" aria-modal="true" onClick={onClose}>
        <div
          className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content border border-4 border-dark">
            <div className="modal-header bg-warning border-bottom border-4 border-dark">
              <h2 className="modal-title font-pixel fs-5">{title}</h2>
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