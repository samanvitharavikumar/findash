function Navbar() {
  return (
    <nav
      style={{
        background: "linear-gradient(135deg, #2563eb, #4f46e5)",
        color: "white",
        padding: "25px",
        borderRadius: "18px",
        textAlign: "center",
        boxShadow: "0 12px 25px rgba(0,0,0,0.15)",
      }}
    >
      <h1
        style={{
          margin: 0,
          fontSize: "32px",
        }}
      >
        💰 Finance Dashboard
      </h1>

      <p
        style={{
          marginTop: "10px",
          opacity: 0.9,
        }}
      >
        Track your income and expenses effortlessly
      </p>
    </nav>
  );
}

export default Navbar;