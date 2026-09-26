import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function History() {
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const res = await axios.get(`${API_URL}/api/history`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUploads(res.data);
      } catch (err) {
        console.error(err);
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          alert("Session expired, please log in again");
          navigate('/login');
          window.location.reload();
        }
      }
      setLoading(false);
    };

    fetchHistory();
  }, []);

  const handleCopyCode = async (code, id) => {
    await navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 5000);
  };

  if (loading) return <p className='text-center'>Loading...</p>;

  return (
    <div className="d-flex flex-column align-items-center">
      <h2 className='my-5'>Your Upload History</h2>
      {uploads.length === 0 ? (
        <p>No uploads yet.</p>
      ) : (
        <div className="history-list">
          {uploads.map((upload) => (
            <div key={upload._id} className="history-row">
              <img
                src={upload.imageUrl}
                alt="upload"
                className="history-thumb"
              />
              <span className="history-code">{upload.code}</span>
              <button
                type="button"
                className="copy-btn history-copy-btn"
                onClick={() => handleCopyCode(upload.code, upload._id)}
                aria-label="Copy code"
              >
                {copiedId === upload._id ? "Copied!" : "Copy"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}