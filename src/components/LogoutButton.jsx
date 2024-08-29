export default function LogoutButton({ onLogout }) {
  return (
    <form onSubmit={(e) => onLogout(e)}>
      <button type="submit">Log Out</button>
    </form>
  );
}
