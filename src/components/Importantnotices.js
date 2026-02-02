import React from 'react'
import '../Home.css'
import { FaUser, FaSearch, FaFilePdf, FaDownload, FaCalendar, FaBullhorn, FaExclamationTriangle, FaList, FaSmile, FaFileContract, FaFileAlt, FaBook, FaClipboardList, FaFileSignature } from 'react-icons/fa';const Importantnotices = () => {
    // Important Notices Data
      const importantNotices = [
        {
          id: 1,
          title: "EA D 31 dt 10.12.25 Extend the SLS benifits to the employees uniformly",
          link: "uploads/notices/1765991771_EAD31dt10.12.25ExtendtheSLSbenifitstotheemployeesuniformly.pdf",
          date: "17 Dec 2025",
          size: "1,656.5 KB",
          icon: FaFileContract,
          color: "#2563eb",
          type: "Benefits"
        },
        {
          id: 2,
          title: "EA D 34 work Allocation and staff pattern",
          link: "uploads/notices/1765991634_EAD34workAllocationandstaffpattern.pdf",
          date: "17 Dec 2025",
          size: "3,684.2 KB",
          icon: FaFileAlt,
          color: "#7c3aed",
          type: "Allocation"
        },
        {
          id: 3,
          title: "EA D 35 dt - 16.12.25 CMD MEET",
          link: "uploads/notices/1765991527_EAD35dt-16.12.25CMDMEET.pdf",
          date: "17 Dec 2025",
          size: "1,379.7 KB",
          icon: FaFileSignature,
          color: "#059669",
          type: "Meeting"
        },
        {
          id: 4,
          title: "TNEBEA CEC/ EBF Election Result 2025-2027",
          link: "uploads/notices/1761625929_TNEBEAElectionResult2025.pdf",
          date: "28 Oct 2025",
          size: "2,854.3 KB",
          icon: FaBook,
          color: "#dc2626",
          type: "Results"
        },
        {
          id: 5,
          title: "LM MASTER LIST",
          link: "uploads/notices/1758385146_LMMASTERLIST072025.pdf",
          date: "20 Sep 2025",
          size: "3,242.5 KB",
          icon: FaClipboardList,
          color: "#ea580c",
          type: "List"
        }
      ];
    
      const handleViewAllNotices = () => {
        window.open('https://tnebeaengineers.in/uploads/notices/', '_blank', 'noopener,noreferrer');
      };
    
  return (
    <div className="row mt-4">
                <div className="col-12">
                  <div className="card shadow-sm important-notices-card">
                    <div className="card-header important-notices-header text-white" style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center', gap:'10px'}}>
                      <FaExclamationTriangle className="mr-2" />
                      <h5 className="mb-0">
                        Important Notices
                      </h5>
                    </div>
                    <div className="card-body important-notices-body">
                      <div className="notices-grid">
                        {importantNotices.map((notice, index) => {
                          const IconComponent = notice.icon;
                          return (
                            <div key={notice.id} className="notice-card-wrapper" style={{'--card-index': index}}>
                              <div className="notice-card" style={{'--notice-color': notice.color}}>
                                <div className="notice-card-glow"></div>
                                <div className="notice-card-header">
                                  <div className="notice-icon-wrapper" style={{background: `linear-gradient(135deg, ${notice.color}, ${notice.color}dd)`}}>
                                    <IconComponent className="notice-icon" />
                                  </div>
                                  <span className="notice-type-badge" style={{background: `${notice.color}20`, color: notice.color}}>
                                    {notice.type}
                                  </span>
                                </div>
                                <div className="notice-card-body">
                                  <h6 className="notice-card-title">
                                    <a 
                                      href={notice.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="notice-link"
                                    >
                                      {notice.title}
                                    </a>
                                  </h6>
                                </div>
                                <div className="notice-card-footer">
                                  <div className="notice-meta-item">
                                    <FaCalendar className="notice-meta-icon" />
                                    <span>{notice.date}</span>
                                  </div>
                                  <div className="notice-meta-item">
                                    <FaDownload className="notice-meta-icon" />
                                    <span>{notice.size}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="text-center mt-3">
                        <button type="button" className="btn-view-notices" onClick={handleViewAllNotices}>
                          <FaList className="mr-1" />
                          View All Notices
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  )
}

export default Importantnotices