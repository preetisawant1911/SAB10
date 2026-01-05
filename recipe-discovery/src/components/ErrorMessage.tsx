const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div style={{ color: "red", textAlign: "center", padding: "1rem" }}>
      {message}
    </div>
  );
};

export default ErrorMessage;
