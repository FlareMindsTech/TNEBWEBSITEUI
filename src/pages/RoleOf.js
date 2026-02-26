import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSearch } from '../context/SearchContext';
import './RoleOf.css';

const RoleOfHonour = () => {
  const { searchQuery, isSearchActive } = useSearch();

  const rollOfHonour = [
    { year: '1957', president: 'Er.T.KRISHNASWAMY', secretary: 'Er.L.R.SAPTHARISHI' },
    { year: '1958', president: 'Er.T.KRISHNASWAMY', secretary: 'Er.L.R.SAPTHARISHI' },
    { year: '1959', president: 'Er.C.E.PRAGER', secretary: 'Er.L.R.SAPTHARISHI' },
    { year: '1960', president: 'Er.C.E.PRAGER', secretary: 'Er.L.R.SAPTHARISHI' },
    { year: '1961', president: 'Er.P.K.NARAYANA RAO', secretary: 'Er.L.R.SAPTHARISHI' },
    { year: '1962', president: 'Er.G.S.RAMA IYER', secretary: 'Er.D.S.NELSON' },
    { year: '1963', president: 'Er.G.S.RAMA IYER', secretary: 'Er.D.S.NELSON' },
    { year: '1964', president: 'Er.P.A.RAMAN', secretary: 'Er.D.VEDAGIRI' },
    { year: '1965', president: 'Er.P.A.RAMAN', secretary: 'Er.D.VEDAGIRI' },
    { year: '1966', president: 'Er.P.A.RAMAN', secretary: 'Er.D.VEDAGIRI' },
    { year: '1967', president: 'Er.P.A.RAMAN', secretary: 'Er.D.VEDAGIRI' },
    { year: '1968', president: 'Er.P.A.RAMAN / Er.N.KOTHANDAPANI', secretary: 'Er.S.GANAPATHY / Er.A.P.KANDAPPAN' },
    { year: '1969', president: 'Er.V.VISHWANATHAN / Er.A.P.RAMASAMI', secretary: 'Er.A.P.KANDAPPAN / Er.K.M.SUBRAMANIAM' },
    { year: '1970', president: 'Er.A.P.RAMASAMI', secretary: 'Er.K.M.SUBRAMANIAM' },
    { year: '1971', president: 'Er.S.S.KANNAN', secretary: 'Er.S.KARUPPASAMY' },
    { year: '1972', president: 'Er.N.S.S AROKIASWAMY', secretary: 'Er.A.P.KANDAPPAN' },
    { year: '1973', president: 'Er.N.S.S AROKIASWAMY / Er.A.P.RAMASAMI', secretary: 'Er.N.K.D.ANDAVAR' },
    { year: '1974', president: 'Er.A.P.RAMASAMI', secretary: 'Er.R.SENGOTTIAN' },
    { year: '1975-76', president: 'Er.S.SABAPATHY', secretary: 'Er.R.SENGOTTIAN' },
    { year: '1976-77', president: 'Er.S.SABAPATHY', secretary: 'Er.A.P.KANDAPPAN' },
    { year: '1977-78', president: 'Er.S.SABAPATHY', secretary: 'Er.A.P.KANDAPPAN' },
    { year: '1978-79', president: 'Er.A.RAMAKRISHNASWAMY', secretary: 'Er.A.P.KANDAPPAN' },
    { year: '1979-80', president: 'Er.A.P.RAMASAMI', secretary: 'Er.A.RAMAKRISHNAN' },
    { year: '1980-81', president: 'Er.A.P.KANDAPPAN', secretary: 'Er.R.SENGOTTIAN' },
    { year: '1981-82', president: 'Er.A.P.KANDAPPAN', secretary: 'Er.A.P.RAMASAMI' },
    { year: '1982-83', president: 'Er.A.P.KANDAPPAN', secretary: 'Er.R.CHIDAMBARAM' },
    { year: '1983-84', president: 'Er.A.P.KANDAPPAN', secretary: 'Er.R.CHIDAMBARAM' },
    { year: '1984-85', president: 'Er.K.M.SUBRAMANIAM', secretary: 'Er.A.P.RAMASAMI' },
    { year: '1985-86', president: 'Er.A.P.KANDAPPAN', secretary: 'Er.R.CHIDAMBARAM' },
    { year: '1986-87', president: 'Er.A.P.KANDAPPAN', secretary: 'Er.R.CHIDAMBARAM' },
    { year: '1987-88', president: 'Er.A.P.KANDAPPAN', secretary: 'Er.R.CHIDAMBARAM' },
    { year: '1988-89', president: 'Er.K.M.SUBRAMANIAM', secretary: 'Er.N.K.D.ANDAVAR' },
    { year: '1989-90', president: 'Er.K.M.SUBRAMANIAM', secretary: 'Er.R.CHIDAMBARAM' },
    { year: '1990-91', president: 'Er.K.M.SUBRAMANIAM', secretary: 'Er.N.K.D.ANDAVAR' },
    { year: '1991-92', president: 'Er.K.M.SUBRAMANIAM', secretary: 'Er.S.ARUMUGAM' },
    { year: '1992-93', president: 'Er.N.K.D.ANDAVAR', secretary: 'Er.S.ARUMUGAM' },
    { year: '1993-95', president: 'Er.N.K.D.ANDAVAR', secretary: 'Er.S.ARUMUGAM' },
    { year: '1995-97', president: 'Er.R.CHIDAMBARAM', secretary: 'Er.G.BALAKRISHNAN' },
    { year: '1998-2000', president: 'Er.K.SETHU MUTHU KUMARASAMY', secretary: 'Er.G.BALAKRISHNAN' },
    { year: '2000-2002', president: 'Er.R.CHIDAMBARAM', secretary: 'Er.G.BALAKRISHNAN' },
    { year: '2002-07/2004', president: 'Er.R.CHIDAMBARAM', secretary: 'Er.G.BALAKRISHNAN' },
    { year: '07/04-11/04', president: 'Er.V.RAMANATHAN', secretary: 'Er.G.BALAKRISHNAN' },
    { year: '12/04-07/05', president: 'Er.S.R.KUMARASAMY ADITYAN', secretary: 'Er.G.BALAKRISHNAN' },
    { year: '2005-2008', president: 'Er.S.R.KUMARASAMY ADITYAN', secretary: 'Er.K.APPARSWAMY' },
    { year: '2009-2011', president: 'Er.K.APPARSWAMY', secretary: 'Er.G.KANNAN' },
    { year: '2012-2014', president: 'Er.P.APPARSWAMY', secretary: 'Er.S.SANKARA NARAYANAN' },
    { year: '2015-2018', president: 'Er.N.KANNAN', secretary: 'Er.N.MATHIMARAN' },
    { year: '2019-2022', president: 'Er.K.INDIRANI', secretary: 'Er.T.JAYANTHI' },
    { year: '2023-2025', president: 'Er.G.SADHASIVAM', secretary: 'Er.V.SHANMUGA' },
    { year: '2025-', president: 'Er.N.SENTHILKUMAR', secretary: 'Er.K.VIJAY' }
  ];

  const filteredData = rollOfHonour.filter(row => {
    if (!isSearchActive) return true;
    const searchLower = searchQuery.toLowerCase();
    return (
      row.year.toLowerCase().includes(searchLower) ||
      row.president.toLowerCase().includes(searchLower) ||
      row.secretary.toLowerCase().includes(searchLower)
    );
  });

  // Reverse for display
  const displayData = [...filteredData].reverse();

  return (
    <div className="rollofhonour-page">
      <div className="rollofhonour-card">
        <div className="rollofhonour-header">
          <h2>ROLL OF HONOUR</h2>
          <p>TNEB ENGINEERS' ASSOCIATION</p>
        </div>

        <div className="rollofhonour-table-wrapper">
          <table className="rollofhonour-table">
            <thead>
              <tr>
                <th>YEAR</th>
                <th>PRESIDENT</th>
                <th>GENERAL SECRETARY</th>
              </tr>
            </thead>
            <tbody>
              {displayData.length > 0 ? (
                displayData.map((row) => (
                  <tr key={row.year} className={row.year === '2025-' ? 'rollofhonour-bold-row' : ''}>
                    <td>{row.year}</td>
                    <td>{row.president}</td>
                    <td>{row.secretary}</td>
                  </tr>
                ))
              ) : null}
              {displayData.length === 0 && isSearchActive && (
                <tr>
                  <td colSpan="3" style={{ padding: '40px' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100px' }}>
                      <p style={{ fontSize: '1.5rem', color: '#dc3545', fontWeight: 'bold', margin: 0 }}>No matching values</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RoleOfHonour;
