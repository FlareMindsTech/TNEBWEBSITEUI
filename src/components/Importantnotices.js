import React, { useEffect, useState } from 'react';
import './Importantnotices.css';
import { FaExclamationTriangle } from 'react-icons/fa';
import { getAllImportantNotices } from '../api';


const Importantnotices = () => {
  const [importantNotices, setImportantNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const data = await getAllImportantNotices();
        setImportantNotices(data);
      } catch (err) {
        console.error("Error loading notices:", err);
        setError("Failed to load important notices.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  const openNotice = (notice) => {
    const noticeLink = notice.docUrl || notice.link;
    if (!noticeLink) return;
    
    const finalLink = noticeLink.startsWith('http')
      ? noticeLink
      : `https://tnebeaengineers.in/${noticeLink}`;
      
    window.open(finalLink, '_blank', 'noopener,noreferrer');
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="important-notices-wrapper">
      <div className="row mt-4">
        <div className="col-12">
          <div className="card shadow-sm important-notices-card">
            <div className="card-header important-notices-header text-white" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <FaExclamationTriangle className="mr-2" />
              <h5 className="mb-0">Important Notices</h5>
            </div>
            <div className="card-body important-notices-body">
              {loading ? (
                <div style={{ textAlign: 'center', padding: '30px 10px', color: '#1b5baf', fontWeight: 'bold' }}>
                  Loading notices...
                </div>
              ) : error ? (
                <div style={{ textAlign: 'center', padding: '30px 10px', color: '#dc3545', fontWeight: 'bold' }}>
                  {error}
                </div>
              ) : importantNotices.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '30px 10px', color: '#6c757d' }}>
                  No important notices available.
                </div>
              ) : (
                <div className="important-notices-table-wrap">
                  <table className="important-notices-table" aria-label="Important notices table">
                    <thead>
                      <tr>
                        <th className="serial-col">S.No</th>
                        <th className="title-col">Notice Title</th>
                        <th className="type-col">Type</th>
                        <th className="date-col">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {importantNotices.map((notice, index) => (
                        <tr
                          key={notice._id || notice.id}
                          className="notice-row"
                          role="button"
                          tabIndex={0}
                          onClick={() => openNotice(notice)}
                          onKeyDown={(event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                              event.preventDefault();
                              openNotice(notice);
                            }
                          }}
                        >
                          <td className="serial-cell">{index + 1}</td>
                          <td className="title-cell">{notice.Notice_title || notice.title}</td>
                          <td className="type-cell">{notice.Type || notice.type}</td>
                          <td className="date-cell">{formatDate(notice.date)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Importantnotices;