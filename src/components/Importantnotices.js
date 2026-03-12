import './Importantnotices.css'
import { FaExclamationTriangle } from 'react-icons/fa';

const Importantnotices = () => {
    // Important Notices Data
      const importantNotices = [
        {
          id: 1,
          title: "EA D 31 dt 10.12.25 Extend the SLS benifits to the employees uniformly",
          link: "uploads/notices/1765991771_EAD31dt10.12.25ExtendtheSLSbenifitstotheemployeesuniformly.pdf",
          date: "17 Dec 2025",
          size: "1,656.5 KB",
          type: "Benefits"
        },
        {
          id: 2,
          title: "EA D 34 work Allocation and staff pattern",
          link: "uploads/notices/1765991634_EAD34workAllocationandstaffpattern.pdf",
          date: "17 Dec 2025",
          size: "3,684.2 KB",
          type: "Allocation"
        },
        {
          id: 3,
          title: "EA D 35 dt - 16.12.25 CMD MEET",
          link: "uploads/notices/1765991527_EAD35dt-16.12.25CMDMEET.pdf",
          date: "17 Dec 2025",
          size: "1,379.7 KB",
          type: "Meeting"
        },
        {
          id: 4,
          title: "TNEBEA CEC/ EBF Election Result 2025-2027",
          link: "uploads/notices/1761625929_TNEBEAElectionResult2025.pdf",
          date: "28 Oct 2025",
          size: "2,854.3 KB",
          type: "Results"
        },
        {
          id: 5,
          title: "LM MASTER LIST",
          link: "uploads/notices/1758385146_LMMASTERLIST072025.pdf",
          date: "20 Sep 2025",
          size: "3,242.5 KB",
          type: "List"
        }
      ];

      const openNotice = (notice) => {
        if (!notice?.link) return;
        const noticeLink = notice.link.startsWith('http')
          ? notice.link
          : `https://tnebeaengineers.in/${notice.link}`;
        window.open(noticeLink, '_blank', 'noopener,noreferrer');
      };
    
  return (
    <div className="important-notices-wrapper">
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
                      <div className="important-notices-table-wrap">
                        <table className="important-notices-table" aria-label="Important notices table">
                          <thead>
                            <tr>
                              <th className="serial-col">S.No</th>
                              <th className="title-col">Notice Title</th>
                              <th className="type-col">Type</th>
                              <th className="date-col">Date</th>
                              <th className="size-col">Size</th>
                            </tr>
                          </thead>
                          <tbody>
                            {importantNotices.map((notice, index) => (
                              <tr
                                key={notice.id}
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
                                <td className="title-cell">{notice.title}</td>
                                <td className="type-cell">{notice.type}</td>
                                <td className="date-cell">{notice.date}</td>
                                <td className="size-cell">{notice.size}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
    </div>
  )
}

export default Importantnotices