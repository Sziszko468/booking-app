export default function LoginPage() {
  return (
    <div style={{ padding: "40px" }}>
      <h2>Login</h2>
      <form>
        <input type="email" placeholder="Email" />
        <br />
        <input type="password" placeholder="Password" />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
