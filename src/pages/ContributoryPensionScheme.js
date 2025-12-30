import React from 'react';
import CPS3 from '../assets/documents/CPS3.pdf';
import CPSExposureDraft1 from '../assets/documents/CPS-Exposure-Draft1.pdf';
import cpsIMAGE from '../assets/documents/cpsIMAGE.pdf';
import CPSINDEX from '../assets/documents/CPSINDEX.pdf';
import CPSMTCE from '../assets/documents/CPSMTCE.pdf';
import CPSOTHER from '../assets/documents/CPSOTHER.pdf';
import './ContributoryPensionScheme.css';

const ContributoryPensionScheme = () => {
  return (
    <div className="contributory-pension-container">
      <main className="contributory-pension-content">
        <div className="container-page">
          <div className="row" style={{float:'left'}}>
            <div className="col-md-12">
              <br />
              <br />
              <a href={CPS3} target="_blank" rel="noopener noreferrer">CPS3</a>
              <br />
              <br />
              <a href={CPSExposureDraft1} target="_blank" rel="noopener noreferrer">CPS-Exposure-Draft1</a>
              <br />
              <br />
              <a href={cpsIMAGE} target="_blank" rel="noopener noreferrer">cpsIMAGE</a>
              <br />
              <br />
              <a href={CPSINDEX} target="_blank" rel="noopener noreferrer">CPSINDEX</a>
              <br />
              <br />
              <a href={CPSMTCE} target="_blank" rel="noopener noreferrer">CPSMTCE</a>
              <br />
              <br />
              <a href={CPSOTHER} target="_blank" rel="noopener noreferrer">CPSOTHER</a>
              <br />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContributoryPensionScheme;
