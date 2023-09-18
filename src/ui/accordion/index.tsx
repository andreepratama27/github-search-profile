import { useEffect, useState } from "react";
import { getRepository } from "../../services/repo.services";
import Loader from "../loader";
import Chevron from "../chevron";

export default function Accordion({ user }: { user: User }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [repos, setRepos] = useState<Repo[]>([]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="pl-4 py-2">
          <Loader count={3} />
        </div>
      );
    }

    if (open) {
      return (
        <div className="repo-wrapper pl-4 py-2">
          {repos.map((repo) => (
            <div
              className="repo-wrapper--grid min-h-20 bg-gray-200 mb-4 p-2 px-4"
              key={repo.id}
            >
              <div className="repo-wrapper--title w-full flex justify-between">
                <p className="font-bold mb-2">{repo.name}</p>
                <div className="star flex items-center justify-center gap-1">
                  <p>{repo.stargazers_count}</p>
                  <span>⭐</span>
                </div>
              </div>

              <div className="repo-wrapper-desc">
                <p className="text-sm">{repo.description}</p>
              </div>
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  const fetchRepository = async () => {
    setLoading(true);
    try {
      const response = await getRepository(user.repos_url);
      setRepos(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchRepository();
    }
  }, [open]);

  return (
    <div className="card" key={user.id}>
      <div
        className="card-title p-2 bg-gray-100 mb-2 flex justify-between items-center"
        role="button"
        onClick={() => setOpen((prevState) => !prevState)}
      >
        <p className="font-bold">{user.login}</p>
        <Chevron open={open} />
      </div>
      {renderContent()}
    </div>
  );
}
