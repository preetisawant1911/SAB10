type Props = {
  message: string;
};

const ErrorMessage = ({ message }: Props) => {
  return (
    <div
      style={{
        padding: "1rem",
        background: "#f8d7da",
        color: "#721c24",
        borderRadius: "6px",
        margin: "1rem 0",
      }}
    >
      {message}
    </div>
  );
};

export default ErrorMessage;
