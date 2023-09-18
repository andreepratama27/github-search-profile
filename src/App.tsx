import { useState } from "react";
import Accordion from "./ui/accordion";
import { getUserByUsername } from "./services/repo.services";

function App() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsername = async () => {
    setLoading(true);
    try {
      const response = await getUserByUsername({ username });
      setUsers(response.items);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    if (loading) {
      return <p>Fetching Information..</p>;
    }

    return users.map((user) => <Accordion user={user} key={user.id} />);
  };

  return (
    <main className="w-full mx-auto">
      <nav className="bg-black flex justify-center items-center h-14 p-2">
        <p className="text-white">Github Profile</p>
      </nav>

      <div className="max-w-xl mx-auto py-4 px-4 sm:px-4 md:px-0">
        <p className="mb-2">Search Github Username</p>
        <input
          type="text"
          className="w-full border h-10 rounded px-2 bg-gray-100"
          placeholder="Type username"
          value={username}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(evt.target.value)
          }
        />

        <button
          className="text-light bg-blue-400 w-full h-10 my-4 disabled:bg-blue-200 disabled:cursor-not-allowed"
          onClick={fetchUsername}
          disabled={!username.length}
        >
          <p className="text-white">Search</p>
        </button>

        <div className="result-wrapper">{renderContent()}</div>
      </div>
    </main>
  );
}

export default App;
