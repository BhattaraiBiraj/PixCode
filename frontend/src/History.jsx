import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function History() {
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
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

  if (loading) return <p className='text-center'>Loading...</p>;

  return (
    <div className="d-flex flex-column align-items-center">
      <h2 className='my-5'>Your Upload History</h2>
      {uploads.length === 0 ? (
        <p>No uploads yet.</p>
      ) : (
        <div className="d-flex flex-wrap gap-3 justify-content-center">
          {uploads.map((upload) => (
            <div key={upload._id} className="text-center" style={{ width: '150px' }}>
              <img
                src={upload.imageUrl}
                alt="upload"
                style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
              />
              <p className="text-muted my-3">Code: {upload.code}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}