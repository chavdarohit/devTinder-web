const Toast = ({ message, action }) => {
  const actionClass =
    action && action === "success"
      ? "alert-success"
      : action === "error"
      ? "alert-error"
      : action === "info"
      ? "alert-info"
      : "alert-success";

  return (
    <div className="toast toast-top toast-center">
      <div className={`alert ${actionClass}`}>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
