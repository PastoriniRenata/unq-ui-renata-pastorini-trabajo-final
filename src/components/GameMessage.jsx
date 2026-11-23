const ALERT_CLASSES = {
  success: "alert-success",
  error: "alert-danger",
  info: "alert-info",
};

const GameMessage = ({ message }) => {
  return (
    <div
      className={`alert ${ALERT_CLASSES[message.type]} mx-3 ${message.text ? "" : "invisible"}`}
      role="status"
      aria-live="polite"
    >
      {message.text || "Sin mensajes"}
    </div>
  );
};

export default GameMessage;