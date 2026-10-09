import React, { useState } from 'react';
import './Enroll.css';
import { FaUpload, FaFileSignature, FaArrowLeft, FaIdCard } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import LifeMembership from './LifeMembership';
import { BASE_URL } from '../api';
import Swal from 'sweetalert2';

const Enroll = () => {
  const [selectedForm, setSelectedForm] = useState(null);

  const [formData, setFormData] = useState({
    // Applicant Details
    ebfViiNo: '',
    applicantName: '',
    gender: '',
    qualification: '',
    designationAddress: '',
    dob: '',
    dateOfEntry: '',
    dateOfRetirement: '',
    dateOfMarriage: '',
    presentAddress: '',
    permanentAddress: '',
    mobileNo: '',
    emailId: '',
    existingEbfMember: '',
    paymentAmount: '',
    ddNo: '',
    ddDate: '',
    drawnOn: '',
    branch: '',
    lmNo: '',

    // Nomination Details
    havingFamily: '',
    nomineeName: '',
    nomineeAddress: '',
    nomineeRelationship: '',
    nomineeDob: '',
    specimenSignature: '',
    contingencies: '',
    rightPassName: '',
    rightPassAddress: '',
    rightPassRelationship: '',
    rightPassDob: '',
    
    // Witnesses
    wit1Signature: '',
    wit1Name: '',
    wit1Address: '',
    wit2Signature: '',
    wit2Name: '',
    wit2Address: '',
    // Additional Date / Office fields
    applicantDate: '',
    applicantDateNom: '',
    officeEbfViiNo: '',
    officeDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = new FormData();
      payload.append('formType', 'EBF-VII');
      
      Object.entries(formData).forEach(([key, value]) => {
        if (value instanceof File) {
           payload.append(key, value);
        } else if (value !== null && value !== undefined && value !== '') {
           payload.append(key, value);
        }
      });

      const response = await fetch(`${BASE_URL}/api/enroll/submit`, {
        method: 'POST',
        body: payload
      });
      if (response.ok) {
        setFormData({
            applicantName: '', gender: '', qualification: '', designationAddress: '', dob: '', dateOfEntry: '', dateOfRetirement: '', dateOfMarriage: '', presentAddress: '', permanentAddress: '', mobileNo: '', emailId: '', existingEbfMember: '', paymentAmount: '', ddNo: '', ddDate: '', drawnOn: '', branch: '', lmNo: '', contingencies: '', rightPassName: '', rightPassAddress: '', rightPassRelationship: '', rightPassDob: '', applicantPhoto: null, nomineePhoto: null, applicantSignature: null, nomineeName: '', nomineeAddress: '', nomineeRelationship: '', nomineeDob: '', specimenSignature: null, applicantSignatureNom: null, wit1Signature: null, wit1Name: '', wit1Address: '', wit2Signature: null, wit2Name: '', wit2Address: '', applicantDate: '', applicantDateNom: '', officeEbfViiNo: '', officeDate: '',
        });
        Swal.fire({
           title: 'Success!',
           text: 'Your EBF application has been successfully formally submitted.',
           icon: 'success',
           confirmButtonColor: '#0A3D91'
        }).then(() => {
           setSelectedForm(null);
           window.scrollTo(0, 0);
        });
      } else {
        Swal.fire('Error', 'There was an error saving your application. Please try again.', 'error');
      }
    } catch (err) {
      console.error('Submit Error:', err);
      Swal.fire('Network Error', 'Please assure you are connected properly.', 'error');
    }
  };

  return (
    <div className="enrollment-hub-wrapper">
      {!selectedForm ? (
        // Selection Screen
        <div className="selection-screen">
          <div className="selection-header">
            <h2>Association Membership &amp; Funds</h2>
            <p>Select an application to proceed</p>
          </div>
          <div className="cards-grid">
            <motion.div 
              className="enroll-option-card"
              onClick={() => setSelectedForm('ebf-vii')}
              whileHover={{ scale: 1.02, translateY: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="card-icon-circle">
                <FaFileSignature />
              </div>
              <h3 className="card-title">EBF-VII Application</h3>
              <p className="card-desc">T.N.E.B. Engineers' Benevolent Fund &amp; Nomination Scheme</p>
              <div className="card-action">Open Form &rarr;</div>
            </motion.div>

            <motion.div 
              className="enroll-option-card"
              onClick={() => setSelectedForm('life-membership')}
              whileHover={{ scale: 1.02, translateY: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="card-icon-circle">
                <FaIdCard />
              </div>
              <h3 className="card-title">Life Membership</h3>
              <p className="card-desc">T.N.E.B. Engineers' Association Life Membership Application</p>
              <div className="card-action">Open Form &rarr;</div>
            </motion.div>
          </div>
        </div>
      ) : selectedForm === 'ebf-vii' ? (
        // Render exact Form Document for EBF-VII
        <div className="ebf-container">
          <div className="form-head-actions">
            <button className="back-btn" onClick={() => setSelectedForm(null)}>
              <FaArrowLeft /> Back to Selection
            </button>
          </div>
          <div className="ebf-paper form-shadow">
            <form onSubmit={handleSubmit}>
          
          {/* ================= PAGE 1: APPLICATION ================= */}
          <div className="ebf-page">
            <div className="d-flex justify-content-between align-items-start mb-4">
              <div className="w-150">
                <img src="/logo192.png" alt="TNEB Logo" className="ebf-logo" />
              </div>
              <div className="ebf-header-text flex-1 text-center px-3">
                <h2 style={{fontSize: '1.2rem', fontWeight: 'bold', margin: '0 0 5px 0'}}>T.N.E.B. ENGINEERS' BENEVOLENT FUND</h2>
                <p className="reg-text">Reg. No.217/94 Recognised in G.O.No.854 Dt.6.4.1946</p>
                <p className="address-text">Electricity Avenue, 144, Anna Salai, Chennai - 600 002. Ph : 044 - 28520731 / 044 - 28517307</p>
                <p className="address-text">email : tnebea@gmail.com, Website : www.tnebengineers.in</p>
                <p className="admin-text">(Administered by the TNEB Engineer's Association)</p>
                <h3 className="app-title-box">APPLICATION</h3>
              </div>
              <div className="w-150 text-right">
                <div style={{fontSize: '13px', fontWeight: 'bold', whiteSpace: 'nowrap'}}>EBF VII No.</div>
                <input type="text" className="inline-input no-border-btm w-100 mt-1" name="ebfViiNo" value={formData.ebfViiNo} onChange={handleChange} />
              </div>
            </div>

            <div className="ebf-body">
              <div className="flex-row photo-container">
                <div className="fields-col">
                  <div className="d-flex field-row">
                    <span className="sno">1.</span>
                    <label>Name of the Applicant<br/><span className="sub-label">(in capital letters)</span></label>
                    <span className="colon">:</span>
                    <input type="text" name="applicantName" value={formData.applicantName} onChange={handleChange} className="form-input text-uppercase flex-1" required />
                  </div>
                  <div className="d-flex field-row">
                    <span className="sno">2.</span>
                    <label>Male or Female</label>
                    <span className="colon">:</span>
                    <div className="d-flex gap-3 flex-1 align-items-center">
                      <label className="radio-inline"><input type="radio" name="gender" value="Male" onChange={handleChange} /> Male</label>
                      <label className="radio-inline"><input type="radio" name="gender" value="Female" onChange={handleChange} /> Female</label>
                    </div>
                  </div>
                  <div className="d-flex field-row">
                    <span className="sno">3.</span>
                    <label>Qualification with Discipline</label>
                    <span className="colon">:</span>
                    <input type="text" name="qualification" value={formData.qualification} onChange={handleChange} className="form-input flex-1" required />
                  </div>
                  <div className="d-flex field-row">
                    <span className="sno">4.</span>
                    <label>Official Designation and<br/>Office Address</label>
                    <span className="colon">:</span>
                    <textarea name="designationAddress" value={formData.designationAddress} onChange={handleChange} className="form-input flex-1" rows="2" required></textarea>
                  </div>
                </div>
                <div className="photo-box">
                  <div className="photo-inner" style={{ position: 'relative', overflow: 'hidden' }}>
                    {formData.applicantPhoto ? (
                       <img src={URL.createObjectURL(formData.applicantPhoto)} alt="Applicant" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }} />
                    ) : (
                       <span>PASSPORT SIZE<br/>PHOTO OF<br/>APPLICANT<br/><br/><small style={{color: '#c92a2a', fontWeight: 'bold'}}>(JPG, 20-50KB)</small></span>
                    )}
                    <input type="file" className="photo-upload" name="applicantPhoto" accept="image/jpeg, image/jpg" onChange={(e) => setFormData(prev => ({...prev, applicantPhoto: e.target.files[0]}))} />
                  </div>
                </div>
              </div>

              <div className="d-flex field-row mt-3">
                <span className="sno">5.</span>
                <label>Date of Birth<br/><span className="sub-label">(as per service register)</span></label>
                <span className="colon">:</span>
                <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="form-input flex-1" required />
              </div>
              <div className="d-flex field-row">
                <span className="sno">6.</span>
                <label>Date of Entry<br/><span className="sub-label">(in the Board's Service)</span></label>
                <span className="colon">:</span>
                <input type="date" name="dateOfEntry" value={formData.dateOfEntry} onChange={handleChange} className="form-input flex-1" required />
              </div>
              <div className="d-flex field-row">
                <span className="sno">7.</span>
                <label>Date of Retirement</label>
                <span className="colon">:</span>
                <input type="date" name="dateOfRetirement" value={formData.dateOfRetirement} onChange={handleChange} className="form-input flex-1" required />
              </div>
              <div className="d-flex field-row">
                <span className="sno">8.</span>
                <label>If Married, Date of Marriage</label>
                <span className="colon">:</span>
                <input type="date" name="dateOfMarriage" value={formData.dateOfMarriage} onChange={handleChange} className="form-input flex-1" />
              </div>
              <div className="d-flex field-row">
                <span className="sno">9.</span>
                <label>Present Address<br/><span className="sub-label">(in capital letters)</span></label>
                <span className="colon">:</span>
                <textarea name="presentAddress" value={formData.presentAddress} onChange={handleChange} className="form-input text-uppercase flex-1" rows="2" required></textarea>
              </div>
              <div className="d-flex field-row">
                <span className="sno">10.</span>
                <label>Permanent Address<br/><span className="sub-label">(in capital letters)</span></label>
                <span className="colon">:</span>
                <textarea name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} className="form-input text-uppercase flex-1" rows="2" required></textarea>
              </div>
              <div className="d-flex field-row">
                <span className="sno">11.</span>
                <label>Mobile No</label>
                <span className="colon">:</span>
                <input type="tel" name="mobileNo" value={formData.mobileNo} onChange={handleChange} className="form-input flex-1" required />
              </div>
              <div className="d-flex field-row">
                <span className="sno">12.</span>
                <label>Email Id</label>
                <span className="colon">:</span>
                <input type="email" name="emailId" value={formData.emailId} onChange={handleChange} className="form-input flex-1" required />
              </div>
              <div className="d-flex field-row">
                <span className="sno">13.</span>
                <label>If the Applicant is a member<br/>in the Existing EBF Schemes<br/><span className="sub-label">(Furnish the Detail)</span></label>
                <span className="colon">:</span>
                <div className="d-flex gap-2 flex-1 flex-wrap align-items-center">
                  {['EBF I', 'II', 'III', 'IV', 'V', 'VI', 'No.'].map(opt => (
                    <label key={opt} className="radio-inline"><input type="radio" name="existingEbfMember" value={opt} onChange={handleChange} /> {opt}</label>
                  ))}
                </div>
              </div>
              <div className="d-flex field-row">
                <span className="sno">14.</span>
                <label>Mode the Payment<br/><span className="sub-label">Full Subscription at a time</span></label>
                <span className="colon">:</span>
                <div className="flex-1 payment-row">
                  <span>Rs.</span><input type="number" name="paymentAmount" value={formData.paymentAmount} onChange={handleChange} className="inline-input w-20" required />
                  <span>DD No.</span><input type="text" name="ddNo" value={formData.ddNo} onChange={handleChange} className="inline-input w-20" required />
                  <span>Date</span><input type="date" name="ddDate" value={formData.ddDate} onChange={handleChange} className="inline-input border-btm" required />
                  <br/>
                  <span>Drawn on</span><input type="text" name="drawnOn" value={formData.drawnOn} onChange={handleChange} className="inline-input w-30" required />
                  <span>at</span><input type="text" name="branch" value={formData.branch} onChange={handleChange} className="inline-input w-30" required />
                  <span>branch</span>
                </div>
              </div>

              <div className="certifies-section mt-4">
                <p className="bold-text">Certifies that :</p>
                <div className="d-flex field-row">
                  <span className="sno">1.</span>
                  <div>I am Life Member of the TNEB Engineers' Association bearing L.M. No. <input type="text" name="lmNo" value={formData.lmNo} onChange={handleChange} className="inline-input w-30" required /></div>
                </div>
                <div className="d-flex field-row">
                  <span className="sno">2.</span>
                  <div>I am not a Member of similar benevolent Fund(s) of any other Union(s) of any other Union(s) Association (s) of the TANGEDCO.</div>
                </div>
                <div className="d-flex field-row">
                  <span className="sno">3.</span>
                  <div>The particulars furnished are correct to the best of my knowledge.</div>
                </div>
              </div>

              <div className="signatures-row mt-4">
                <div className="d-flex align-items-center mb-3">
                  <span className="mr-2">Date:</span>
                  <input type="date" name="applicantDate" value={formData.applicantDate} onChange={handleChange} className="form-input" style={{ width: '150px' }} />
                </div>
                <div className="signature-upload-box">
                  <div className="sig-upload-inner" style={{ position: 'relative', overflow: 'hidden' }}>
                     {formData.applicantSignature ? (
                        <img src={URL.createObjectURL(formData.applicantSignature)} alt="Signature" style={{ width: '100%', height: '100%', objectFit: 'contain', position: 'absolute', top: 0, left: 0 }} />
                     ) : (
                        <span>UPLOAD SIGNATURE<br/><small>(JPG/JPEG, 10-50KB)</small></span>
                     )}
                     <input type="file" className="photo-upload" name="applicantSignature" accept="image/jpeg, image/jpg" onChange={(e) => setFormData(prev => ({...prev, applicantSignature: e.target.files[0]}))} />
                  </div>
                  <div className="bold-text mt-2 text-center">SUBSCRIBER'S SIGNATURE</div>
                </div>
              </div>

              <div className="notes-section mt-3">
                <div className="d-flex field-row">
                  <span className="bold-text">Note :</span>
                </div>
                <div className="d-flex field-row">
                  <span className="sno">1.</span>
                  <div>The EBF VII Scheme will be operationalised only on enrolling 1000 members in scheme VII</div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-4 mb-2">
               <strong>- 1 -</strong>
            </div>

            {/* Page Break line for digital view */}
            <div className="page-break"></div>
          </div>

          {/* ================= PAGE 2: NOMINATION ================= */}
          <div className="ebf-page">
            <div className="nomination-header">
               <div className="text-right note-small">
                 <span className="mr-2">EBF VII No.</span><input type="text" className="inline-input w-20" disabled value={formData.ebfViiNo} />
               </div>
               <p className="text-center note-small mt-2">Note : Members are advised to NOMINATE ONLY THEIR LEGAL HEIR(S) Contemplated in succession Act.</p>
               <h3 className="section-main-title text-center mt-3 mb-4">T.N.EB. ENGINEERS' BENEVOLENT FUND NOMINATION</h3>
            </div>
            
            <div className="nomination-body">
              <p className="mb-4">
                I <input type="text" className="inline-input w-30 border-btm" value={formData.applicantName} disabled /> having a family / having no family, hereby nominate one person or more than one person who is / are legal heir(s) as mentioned below to receive the payment from the Benevolent Fund in the event of my death.
              </p>

              <div className="flex-row photo-container">
                <div className="fields-col">
                  <div className="d-flex field-row">
                    <span className="sno">1.</span>
                    <label>Name of the Nominee<br/><span className="sub-label">(in case of more than one person<br/>share in percentage to be specified)</span></label>
                    <span className="colon">:</span>
                    <input type="text" name="nomineeName" value={formData.nomineeName} onChange={handleChange} className="form-input flex-1" required />
                  </div>
                  <div className="d-flex field-row">
                    <span className="sno">2.</span>
                    <label>Address of the Nominee</label>
                    <span className="colon">:</span>
                    <textarea name="nomineeAddress" value={formData.nomineeAddress} onChange={handleChange} className="form-input flex-1" rows="3" required></textarea>
                  </div>
                </div>
                <div className="photo-box">
                  <div className="photo-inner" style={{ position: 'relative', overflow: 'hidden' }}>
                    {formData.nomineePhoto ? (
                       <img src={URL.createObjectURL(formData.nomineePhoto)} alt="Nominee" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }} />
                    ) : (
                       <span>PASS PORT SIZE<br/>PHOTO OF<br/>NOMINATED<br/>PERSON (S)<br/><small style={{color: '#c92a2a', fontWeight: 'bold'}}>(JPG, 20-50KB)</small></span>
                    )}
                    <input type="file" className="photo-upload" name="nomineePhoto" accept="image/jpeg, image/jpg" onChange={(e) => setFormData(prev => ({...prev, nomineePhoto: e.target.files[0]}))} />
                  </div>
                </div>
              </div>

              <div className="d-flex field-row mt-3">
                <span className="sno">3.</span>
                <label>Relationship of the Nominee</label>
                <span className="colon">:</span>
                <input type="text" name="nomineeRelationship" value={formData.nomineeRelationship} onChange={handleChange} className="form-input flex-1" required />
              </div>
              <div className="d-flex field-row">
                <span className="sno">4.</span>
                <label>Date of Birth of the Nominee</label>
                <span className="colon">:</span>
                <input type="date" name="nomineeDob" value={formData.nomineeDob} onChange={handleChange} className="form-input flex-1" required />
              </div>
              <div className="d-flex field-row">
                <span className="sno">5.</span>
                <label>Three Specimen Signature(s)<br/>of the nominee obtained in the<br/>presence of the subscriber<br/>and attested</label>
                <span className="colon">:</span>
                 <div className="sig-upload-inner spec-sig-box flex-1" style={{ position: 'relative', overflow: 'hidden' }}>
                    {formData.specimenSignature ? (
                        <img src={URL.createObjectURL(formData.specimenSignature)} alt="Specimen Signature" style={{ width: '100%', height: '100%', objectFit: 'contain', position: 'absolute', top: 0, left: 0 }} />
                    ) : (
                       <span>UPLOAD 3 SPECIMEN SIGNATURES<br/><small>(JPG/JPEG, Max 100KB)</small></span>
                    )}
                    <input type="file" className="photo-upload" name="specimenSignature" accept="image/jpeg, image/jpg" onChange={(e) => setFormData(prev => ({...prev, specimenSignature: e.target.files[0]}))} />
                 </div>
              </div>
              <div className="d-flex field-row">
                <span className="sno">6.</span>
                <label>Contingencies on the happening<br/>of which are nomination shall<br/>become invalid</label>
                <span className="colon">:</span>
                <textarea name="contingencies" value={formData.contingencies} onChange={handleChange} className="form-input flex-1" rows="2"></textarea>
              </div>
              <div className="d-flex field-row">
                <span className="sno">7.</span>
                <label>In the event of the item (6) the right<br/>of the nominee shall pass onto</label>
                <span className="colon">:</span>
              </div>
              <div className="sub-fields ml-4">
                <div className="d-flex field-row">
                  <label className="w-150">(a) Name(s)</label><span className="colon">:</span><input type="text" name="rightPassName" value={formData.rightPassName} onChange={handleChange} className="form-input flex-1" />
                </div>
                <div className="d-flex field-row">
                  <label className="w-150">(b) Address(s)</label><span className="colon">:</span><input type="text" name="rightPassAddress" value={formData.rightPassAddress} onChange={handleChange} className="form-input flex-1" />
                </div>
                <div className="d-flex field-row">
                  <label className="w-150">(c) Relationship of the person (s)</label><span className="colon">:</span><input type="text" name="rightPassRelationship" value={formData.rightPassRelationship} onChange={handleChange} className="form-input flex-1" />
                </div>
                <div className="d-flex field-row">
                  <label className="w-150">(d) Date of Birth of the person(s)</label><span className="colon">:</span><input type="date" name="rightPassDob" value={formData.rightPassDob} onChange={handleChange} className="form-input flex-1" />
                </div>
              </div>

              <div className="signatures-row mt-5">
                <div className="d-flex align-items-center mb-3">
                  <span className="mr-2">Date:</span>
                  <input type="date" name="applicantDateNom" value={formData.applicantDateNom} onChange={handleChange} className="form-input" style={{ width: '150px' }} />
                </div>
                <div className="signature-upload-box">
                  <div className="sig-upload-inner" style={{ position: 'relative', overflow: 'hidden' }}>
                     {formData.applicantSignatureNom ? (
                        <img src={URL.createObjectURL(formData.applicantSignatureNom)} alt="Signature" style={{ width: '100%', height: '100%', objectFit: 'contain', position: 'absolute', top: 0, left: 0 }} />
                     ) : (
                        <span>UPLOAD SIGNATURE<br/><small>(JPG/JPEG, 10-50KB)</small></span>
                     )}
                     <input type="file" className="photo-upload" name="applicantSignatureNom" accept="image/jpeg, image/jpg" onChange={(e) => setFormData(prev => ({...prev, applicantSignatureNom: e.target.files[0]}))} />
                  </div>
                  <div className="bold-text mt-2 text-center">SUBSCRIBER'S SIGNATURE</div>
                </div>
              </div>

              <div className="witnesses-section mt-4">
                <p className="bold-text mb-3">WITNESSES</p>
                <div className="witness-grid">
                  <div className="wit-header row text-center">
                    <div className="col-4">Signature</div>
                    <div className="col-4">Name</div>
                    <div className="col-4">Address of the Witness</div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-4 d-flex align-items-center">
                      <span className="mr-2">1.</span>
                      <div className="sig-upload-inner w-100" style={{height: '50px', position: 'relative', overflow: 'hidden'}}>
                        {formData.wit1Signature ? (
                            <img src={URL.createObjectURL(formData.wit1Signature)} alt="Witness 1" style={{ width: '100%', height: '100%', objectFit: 'contain', position: 'absolute', top: 0, left: 0 }} />
                        ) : (
                           <span>UPLOAD <small>(JPG)</small></span>
                        )}
                        <input type="file" className="photo-upload" name="wit1Signature" accept="image/jpeg, image/jpg" onChange={(e) => setFormData(prev => ({...prev, wit1Signature: e.target.files[0]}))} />
                      </div>
                    </div>
                    <div className="col-4 d-flex align-items-center">
                      <input type="text" name="wit1Name" placeholder="Witness Name" value={formData.wit1Name} onChange={handleChange} className="form-input w-100" />
                    </div>
                    <div className="col-4 d-flex align-items-center">
                      <input type="text" name="wit1Address" placeholder="Witness Address" value={formData.wit1Address} onChange={handleChange} className="form-input w-100" />
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-4 d-flex align-items-center">
                      <span className="mr-2">2.</span>
                      <div className="sig-upload-inner w-100" style={{height: '50px', position: 'relative', overflow: 'hidden'}}>
                        {formData.wit2Signature ? (
                            <img src={URL.createObjectURL(formData.wit2Signature)} alt="Witness 2" style={{ width: '100%', height: '100%', objectFit: 'contain', position: 'absolute', top: 0, left: 0 }} />
                        ) : (
                           <span>UPLOAD <small>(JPG)</small></span>
                        )}
                        <input type="file" className="photo-upload" name="wit2Signature" accept="image/jpeg, image/jpg" onChange={(e) => setFormData(prev => ({...prev, wit2Signature: e.target.files[0]}))} />
                      </div>
                    </div>
                    <div className="col-4 d-flex align-items-center">
                      <input type="text" name="wit2Name" placeholder="Witness Name" value={formData.wit2Name} onChange={handleChange} className="form-input w-100" />
                    </div>
                    <div className="col-4 d-flex align-items-center">
                      <input type="text" name="wit2Address" placeholder="Witness Address" value={formData.wit2Address} onChange={handleChange} className="form-input w-100" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="office-use-section mt-5 border-top pt-4">
                <p className="bold-text">FOR OFFICE USE ONLY</p>
                <p>1.Detail of payment of subscription</p>
                <div className="office-tables d-flex gap-3 mt-3">
                  <table className="ebf-table border-table">
                    <thead>
                      <tr>
                        <th colSpan="6" className="text-center">EBF</th>
                      </tr>
                      <tr>
                        <th>I</th><th>II</th><th>III</th><th>IV</th><th>V</th><th>VI</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><input type="text" disabled/></td><td><input type="text" disabled/></td><td><input type="text" disabled/></td><td><input type="text" disabled/></td><td><input type="text" disabled/></td><td><input type="text" disabled/></td>
                      </tr>
                      <tr>
                        <td><input type="text" disabled/></td><td><input type="text" disabled/></td><td><input type="text" disabled/></td><td><input type="text" disabled/></td><td><input type="text" disabled/></td><td><input type="text" disabled/></td>
                      </tr>
                      <tr>
                        <td><input type="text" disabled/></td><td><input type="text" disabled/></td><td><input type="text" disabled/></td><td><input type="text" disabled/></td><td><input type="text" disabled/></td><td><input type="text" disabled/></td>
                      </tr>
                    </tbody>
                  </table>
                  <table className="ebf-table border-table h-100">
                    <thead>
                      <tr>
                        <th>EBF VII</th><th>LUMSUM</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Amount</td><td><input type="text" disabled/></td>
                      </tr>
                      <tr>
                        <td>EBF No</td><td><input type="text" disabled/></td>
                      </tr>
                      <tr>
                        <td>Date</td><td><input type="text" disabled/></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 mb-4 lh-2 text-center">
                  2. Application admitted nomination approved and the TNEB Engineer's Benevolent Fund<br/>
                  membership number allotted in EBF VII no. <input type="text" className="inline-input w-20" name="officeEbfViiNo" value={formData.officeEbfViiNo} onChange={handleChange} /> Date <input type="date" className="inline-input w-20" name="officeDate" value={formData.officeDate} onChange={handleChange} />
                </div>

                <div className="notes-section mt-3 text-center">
                  <div className="bold-text">Note :</div>
                  <div className="mt-2">
                    1. EBF-VII Subscription Amount Rs.15,000/- Admission Fee : Rs.3, The Following balance<br/>
                    Subscription for those who are moving from existing EBF Schemes Which shall be<br/>
                    payable in one lumpsum.
                  </div>
                </div>
              </div>

            </div>
            
            <div className="text-center mt-5 mb-2">
               <strong>- 2 -</strong>
            </div>
          </div>
          
          <div className="text-center p-4">
             <button type="submit" className="btn btn-primary submit-btn-ebf">Submit EBF Application</button>
          </div>
        </form>
      </div>
    </div>
    ) : selectedForm === 'life-membership' ? (
      <div className="ebf-container">
        <div className="form-head-actions">
          <button className="back-btn" onClick={() => setSelectedForm(null)}>
            <FaArrowLeft /> Back to Selection
          </button>
        </div>
        <LifeMembership onSubmitSuccess={() => setSelectedForm(null)} />
      </div>
    ) : null}
    </div>
  );
};

export default Enroll;
