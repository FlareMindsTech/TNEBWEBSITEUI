import React from 'react';
import conductregulations from '../assets/documents/TNEBConductRegulations.pdf';
import disciplineregulations from '../assets/documents/TNEBDARegulations.pdf';
import leaveregulations from '../assets/documents/TNEBLeaveRegulations.pdf';
import serviceregulations from '../assets/documents/TNEBServiceRegulations.pdf';
import amendments from '../assets/documents/TNERC-Amendments-to-SC-DC.pdf';
import costdata from '../assets/documents/Costdata202122-consolidated.pdf';
import maternityleave from '../assets/documents/Maternity-Leave-BPS-TNGOs.pdf';
import nhisbpsgos from '../assets/documents/NHIS-BPs-GOs.pdf';
import tnebnhis2021bp from '../assets/documents/TNEB-NHIS-2021-BP-NO-162-17721.pdf';
import courtjudgement from '../assets/documents/TNEB-CourtJudgement-nhis-father-also-as-family-02012020.pdf';

const ManualsAndFormsDownload = () => {
  const documents = [
    {
      id: 1,
      title: "TNEB Conduct Regulations",
      href: conductregulations
    },
    {
      id: 2,
      title: "TNEB Discipline and Appeal Regulations",
      href: disciplineregulations
    },
    {
      id: 3,
      title: "TNEB Leave Regulations",
      href: leaveregulations
    },
    {
      id: 4,
      title: "TNEB Service Regulations",
      href: serviceregulations
    },
    {
      id: 5,
      title: "TNERC, Amendments to the Tamil Nadu Electricity Supply Code & Distribution code",
      href: amendments,
      note: "(Notification No. TNERC/SC/7–40, dated 18-12-2019.)\n(Notification No. TNERC/DC/8–25 dated 18-12-2019.)"
    },
    {
      id: 6,
      title: "GAZETTE YEARWISE -1983-2020",
      href: "#"
    },
    {
      id: 7,
      title: "COST DATA 2021-2022- Consolidated",
      href: costdata
    },
    {
      id: 8,
      title: "Guidelines on Administrative Matters and Entitlements",
      href: "#"
    },
    {
      id: 9,
      title: "Maternity Leave BPS TNGOs",
      href: maternityleave
    },
    {
      id: 10,
      title: "NHIS BPs GOs",
      href: nhisbpsgos
    },
    {
      id: 11,
      title: "TNEB-NHIS2021- REVISED MEDICAL POLICY-TNGO-29.06.2021",
      href: nhisbpsgos
    },
    {
      id: 12,
      title: "TNEB-NHIS2018- ADDITIONAL HOSPITAL COVERAGE-TNGO-ADOPTED BY BOARD -02.08.2021",
      href: "#"
    },
    {
      id: 13,
      title: "TNEB-NHIS 2021 – BP NO 162-17.07.2021",
      href: tnebnhis2021bp
    },
    {
      id: 14,
      title: "TNEB-Court Judgement-NHIS – Father also as family member-02.01.2020",
      href: courtjudgement
    }
  ];

  return (
    <main>
      <div className="container-page" style={{ paddingLeft: '3rem' }}>
        <br />
        <h2 className="text-center font-weight-bold mb-4">TNEB regulated Regulations, Manuals and Forms Download</h2>
        <ol style={{ fontSize: '1.2rem', padding: 0, float: 'left' }}>
          {documents.map((doc) => (
            <li key={doc.id} style={{ marginBottom: '1rem' }}>
              <span className="font-weight-bold">
                {doc.title}
              </span>
              {doc.note && (
                <>
                  <br />
                  <span className="text-dark" style={{ fontSize: '1rem' }}>
                    {doc.note.split('\n').map((line, index) => (
                      <span key={index}>
                        {line}
                        {index < doc.note.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </span>
                </>
              )}
            </li>
          ))}
        </ol>
        <div style={{ clear: 'both' }}></div>
      </div>
    </main>
  );
};

export default ManualsAndFormsDownload;
