import React, { useState } from 'react';
import './Enroll.css'; // Reusing the same layout classes since it's a similar paper form
import { BASE_URL } from '../api';
import Swal from 'sweetalert2';

const BoxGroup = ({ idPrefix, count, legend, valueStr = '', onChangeStr }) => {
  const handleChange = (e, i) => {
    let newStr = valueStr.padEnd(count, ' ').split('');
    newStr[i] = e.target.value.charAt(0); // Take only 1 char
    onChangeStr(newStr.join('').trim());

    if (e.target.value.length === 1 && i < count - 1) {
      document.getElementById(`${idPrefix}-${i + 1}`)?.focus();
    }
  };

  const handleKeyDown = (e, i) => {
    if (e.key === 'Backspace' && (!e.target.value || e.target.value === ' ') && i > 0) {
      document.getElementById(`${idPrefix}-${i - 1}`)?.focus();
    }
  };

  return (
    <div className="flex-1">
      <div className="d-flex box-inputs">
        {[...Array(count)].map((_, i) => (
          <input
            key={i}
            id={`${idPrefix}-${i}`}
            type="text"
            maxLength="1"
            className="box-char"
            value={valueStr[i] && valueStr[i] !== ' ' ? valueStr[i] : ''}
            onChange={(e) => handleChange(e, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
          />
        ))}
      </div>
      {legend && (
        <div className="d-flex mt-1">
          {legend.map((char, index) => (
            <div key={index} style={{ width: '25px', textAlign: 'center', fontSize: '0.75rem', fontWeight: 'bold' }}>
              {char}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const LifeMembership = ({ onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    lmNo: '',
    name: '',
    empNo: '',
    sex: '',
    nativePlace: '',
    designation: '',
    dob: '',
    fatherName: '',
    permanentAddress: '',
    permanentPin: '',
    presentOfficeAddress: '',
    presentOfficePin: '',
    presentOfficePhone: '',
    presentResAddress: '',
    presentResPin: '',
    presentResPhone: '',
    bloodGroup: '',
    spouseName: '',
    workingBranch: '',
    qualification: '',
    entryDate: '',
    fieldOfInterest: '',
    awards: '',
    membershipOtherInst: '',
    anyOtherInfo: '',
    dateOfFilling: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const clearFile = (e, fieldName) => {
    e.preventDefault();
    e.stopPropagation();
    setFormData(prev => ({...prev, [fieldName]: null}));
  };

  const handleFileWithValidation = (e, fieldName, minKB, maxKB) => {
    const file = e.target.files[0];
    if (!file) {
      setFormData(prev => ({...prev, [fieldName]: null}));
      return;
    }

    const fileSizeKB = file.size / 1024;
    
    if (minKB && fileSizeKB < minKB) {
      Swal.fire('Invalid File Size', `File size is too small. Minimum required is ${minKB}KB. Your file is ${fileSizeKB.toFixed(1)}KB.`, 'warning');
      e.target.value = null;
      return;
    }
    
    if (maxKB && fileSizeKB > maxKB) {
      Swal.fire('Invalid File Size', `File size is too large. Maximum allowed is ${maxKB}KB. Your file is ${fileSizeKB.toFixed(1)}KB.`, 'warning');
      e.target.value = null;
      return;
    }

    setFormData(prev => ({...prev, [fieldName]: file}));
  };

  const removeBtnStyle = {
    position: 'absolute',
    top: '5px',
    right: '5px',
    background: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    cursor: 'pointer',
    zIndex: 10,
    fontSize: '12px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = new FormData();
      payload.append('formType', 'LIFE-MEMBERSHIP');

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
            lmNo: '', name: '', empNo: '', sex: '', nativePlace: '', designation: '', dobBox: '', fatherName: '', permanentAddress: '', permanentPin: '', presentOfficeAddress: '', presentOfficePin: '', presentOfficePhone: '', presentResAddress: '', presentResPin: '', presentResPhone: '', bloodGroup: '', spouseName: '', workingBranch: '', qualification: '', entryDt: '', fieldOfInterest: '', awards: '', membershipOtherInst: '', anyOtherInfo: '', fillDt: '', applicantSignature: null
        });
        Swal.fire({
           title: 'Success!',
           text: 'Your Life Membership application has been successfully formally submitted.',
           icon: 'success',
           confirmButtonColor: '#0A3D91'
        }).then(() => {
           window.scrollTo(0, 0);
           if(onSubmitSuccess) onSubmitSuccess();
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
    <div className="ebf-container">
      <div className="ebf-paper form-shadow">
        <form onSubmit={handleSubmit}>
          
          <div className="ebf-page pb-5">
            <div className="text-center mb-4 leading-tight">
              <div className="text-right" style={{fontSize: '0.8rem', fontWeight: 'bold'}}>
                Ph.28133064, 28520731
              </div>
              <h2 className="mb-0" style={{fontSize: '1.4rem', fontWeight: '900', color: '#000'}}>T.N.E.B. Engineers' Association</h2>
              <p className="mb-0" style={{fontSize: '0.8rem', fontWeight: 'bold'}}>
                793, Anna Salai, Chennai – 600 002.<br/>
                (Website: tnebengineers.org)<br/>
                (Regn.No.217/94) (Recognised in G.O.No.854 dated 06.04.1946)
              </p>
              
              <div className="mt-3">
                 <h3 style={{fontSize: '1.1rem', fontWeight: '900', textDecoration: 'underline', display: 'inline-block'}}>LIFE MEMBERSHIP APPLICATION</h3>
              </div>
              <div className="text-right mt-1" style={{fontSize: '0.9rem', fontWeight: 'bold'}}>
                 L.M.No. <input type="text" className="inline-input border-btm w-20" name="lmNo" value={formData.lmNo} onChange={handleChange} placeholder="Enter L.M.No." />
              </div>
            </div>

            <div className="life-mem-body">
              <div className="d-flex field-row align-items-center">
                <span className="sno">1.</span>
                <label>Name in Block Letters<br/><span className="sub-label">(Initial at the end)</span></label>
                <span className="colon">:</span>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-input text-uppercase flex-1 border-btm" placeholder="Enter Name" required />
              </div>
              
              <div className="d-flex field-row align-items-center">
                <span className="sno">2.</span>
                <label>Employee No.</label>
                <span className="colon">:</span>
                <BoxGroup idPrefix="empNo" count={8} valueStr={formData.empNo} onChangeStr={(val) => setFormData(prev => ({...prev, empNo: val}))} />
              </div>
              
              <div className="d-flex field-row align-items-center mt-2">
                <span className="sno">3.</span>
                <label>Sex</label>
                <span className="colon">:</span>
                <div className="d-flex gap-0 border-box-group">
                   <label className="border-box-label m-0 px-2 py-1 border border-dark"><input type="radio" name="sex" value="M" checked={formData.sex === 'M'} onChange={handleChange} className="mr-1"/>M</label>
                   <label className="border-box-label m-0 px-2 py-1 border border-dark border-left-0"><input type="radio" name="sex" value="F" checked={formData.sex === 'F'} onChange={handleChange} className="mr-1"/>F</label>
                </div>
              </div>

              <div className="d-flex field-row align-items-center mt-3">
                <span className="sno">4.</span>
                <label>Native Place &amp; District</label>
                <span className="colon">:</span>
                <input type="text" name="nativePlace" value={formData.nativePlace} onChange={handleChange} className="form-input flex-1 border-btm" placeholder="Enter Native Place & District" />
              </div>

              <div className="d-flex field-row align-items-center mt-2">
                <span className="sno">5.</span>
                <label>Designation</label>
                <span className="colon">:</span>
                <input type="text" name="designation" value={formData.designation} onChange={handleChange} className="form-input flex-1 border-btm" placeholder="Enter Designation" />
              </div>

              <div className="d-flex field-row mt-2">
                <span className="sno">6.</span>
                <label>Date of Birth</label>
                <span className="colon">:</span>
                <BoxGroup idPrefix="dobBox" count={8} legend={['D','D','M','M','Y','Y','Y','Y']} valueStr={formData.dobBox} onChangeStr={(val) => setFormData(prev => ({...prev, dobBox: val}))} />
              </div>

              <div className="d-flex field-row align-items-center mt-2">
                <span className="sno">7.</span>
                <label>Father's Name</label>
                <span className="colon">:</span>
                <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} className="form-input flex-1 border-btm" placeholder="Enter Father's Name" />
              </div>

              <div className="d-flex field-row mt-2">
                <span className="sno">8.</span>
                <label>Permanent Address</label>
                <span className="colon">:</span>
                <div className="flex-1">
                  <input type="text" name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} className="form-input w-100 border-btm mb-1" placeholder="Enter Permanent Address" />
                  <input type="text" className="form-input w-100 border-btm mb-1" placeholder="Line 2" />
                  <input type="text" className="form-input w-100 border-btm mb-1" placeholder="Line 3" />
                  <div className="d-flex align-items-center mt-1">
                    <span className="mr-2">PIN Code</span>
                    <input type="text" name="permanentPin" value={formData.permanentPin} onChange={handleChange} className="form-input flex-1 border-btm" placeholder="Enter PIN Code" />
                  </div>
                </div>
              </div>

              <div className="d-flex field-row mt-3">
                <span className="sno">9.</span>
                <label>Present Address</label>
                <span className="colon"></span>
              </div>
              
              <div className="d-flex field-row mt-1">
                <span className="sno"></span>
                <label className="pl-3">a) Office</label>
                <span className="colon">:</span>
                <div className="flex-1">
                  <input type="text" name="presentOfficeAddress" value={formData.presentOfficeAddress} onChange={handleChange} className="form-input w-100 border-btm mb-1" placeholder="Enter Office Address" />
                  <input type="text" className="form-input w-100 border-btm mb-1" placeholder="Line 2" />
                  <input type="text" className="form-input w-100 border-btm mb-1" placeholder="Line 3" />
                  <div className="d-flex align-items-center mt-1">
                    <span className="mr-2">PIN Code</span>
                    <input type="text" name="presentOfficePin" value={formData.presentOfficePin} onChange={handleChange} className="form-input flex-1 border-btm" placeholder="Enter PIN Code" />
                  </div>
                  <div className="d-flex align-items-center mt-1">
                    <span className="mr-2">Phone:</span>
                    <input type="text" name="presentOfficePhone" value={formData.presentOfficePhone} onChange={handleChange} className="form-input flex-1 border-btm" placeholder="Enter Phone Number" />
                  </div>
                </div>
              </div>

              <div className="d-flex field-row mt-3">
                <span className="sno"></span>
                <label className="pl-3">b) Residence</label>
                <span className="colon">:</span>
                <div className="flex-1">
                  <input type="text" name="presentResAddress" value={formData.presentResAddress} onChange={handleChange} className="form-input w-100 border-btm mb-1" placeholder="Enter Residence Address" />
                  <input type="text" className="form-input w-100 border-btm mb-1" placeholder="Line 2" />
                  <input type="text" className="form-input w-100 border-btm mb-1" placeholder="Line 3" />
                  <div className="d-flex align-items-center mt-1">
                    <span className="mr-2">PIN Code</span>
                    <input type="text" name="presentResPin" value={formData.presentResPin} onChange={handleChange} className="form-input flex-1 border-btm" placeholder="Enter PIN Code" />
                  </div>
                  <div className="d-flex align-items-center mt-1">
                    <span className="mr-2">Phone:</span>
                    <input type="text" name="presentResPhone" value={formData.presentResPhone} onChange={handleChange} className="form-input flex-1 border-btm" placeholder="Enter Phone Number" />
                  </div>
                </div>
              </div>

              {/* End of Page 1 visually */}
              <div className="text-center mt-4 mb-2"><strong>- 1 -</strong></div>
              <div className="page-break"></div>

              {/* Page 2 */}
              <div className="d-flex field-row align-items-center mt-4">
                <span className="sno">10.</span>
                <label>Blood Group</label>
                <span className="colon">:</span>
                <input type="text" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="form-input flex-1 border-btm" placeholder="Enter Blood Group" />
              </div>

              <div className="d-flex field-row align-items-center mt-2">
                <span className="sno">11.</span>
                <label>Spouse Name</label>
                <span className="colon">:</span>
                <input type="text" name="spouseName" value={formData.spouseName} onChange={handleChange} className="form-input flex-1 border-btm" placeholder="Enter Spouse Name" />
              </div>

              <div className="d-flex field-row align-items-center mt-2">
                <span className="sno">12.</span>
                <label>Working Branch</label>
                <span className="colon">:</span>
                <input type="text" name="workingBranch" value={formData.workingBranch} onChange={handleChange} className="form-input flex-1 border-btm" placeholder="Enter Working Branch" />
              </div>

              <div className="d-flex field-row align-items-center mt-2">
                <span className="sno">13.</span>
                <label>Qualification</label>
                <span className="colon">:</span>
                <input type="text" name="qualification" value={formData.qualification} onChange={handleChange} className="form-input flex-1 border-btm" placeholder="Enter Qualification" />
              </div>

              <div className="d-flex field-row mt-2">
                <span className="sno">14.</span>
                <label>Entry Date</label>
                <span className="colon">:</span>
                <BoxGroup idPrefix="entryDt" count={8} legend={['D','D','M','M','Y','Y','Y','Y']} valueStr={formData.entryDt} onChangeStr={(val) => setFormData(prev => ({...prev, entryDt: val}))} />
              </div>

              <div className="d-flex field-row align-items-center mt-3">
                <span className="sno">15.</span>
                <label>Field of Interest</label>
                <span className="colon">:</span>
                <input type="text" name="fieldOfInterest" value={formData.fieldOfInterest} onChange={handleChange} className="form-input flex-1 border-btm" placeholder="Enter Field of Interest" />
              </div>

              <div className="d-flex field-row align-items-center mt-2">
                <span className="sno">16.</span>
                <label>Awards</label>
                <span className="colon">:</span>
                <input type="text" name="awards" value={formData.awards} onChange={handleChange} className="form-input flex-1 border-btm" placeholder="Enter Awards" />
              </div>

              <div className="d-flex field-row align-items-center mt-2">
                <span className="sno">17.</span>
                <label>Membership in any other<br/>Institution</label>
                <span className="colon">:</span>
                <input type="text" name="membershipOtherInst" value={formData.membershipOtherInst} onChange={handleChange} className="form-input flex-1 border-btm" placeholder="Enter Membership Info" />
              </div>

              <div className="d-flex field-row align-items-center mt-2">
                <span className="sno">18.</span>
                <label>Any other Information</label>
                <span className="colon">:</span>
                <input type="text" name="anyOtherInfo" value={formData.anyOtherInfo} onChange={handleChange} className="form-input flex-1 border-btm" placeholder="Enter Any Other Info" />
              </div>

              <div className="d-flex field-row mt-3">
                <span className="sno">19.</span>
                <label>Date of filling in the<br/>Application</label>
                <span className="colon">:</span>
                <BoxGroup idPrefix="fillDt" count={8} legend={['D','D','M','M','Y','Y','Y','Y']} valueStr={formData.fillDt} onChangeStr={(val) => setFormData(prev => ({...prev, fillDt: val}))} />
              </div>

              <div className="d-flex field-row mt-4 align-items-center">
                <span className="sno">20.</span>
                <label>Signature</label>
                <span className="colon">:</span>
                <div className="flex-1">
                  <div className="sig-upload-inner" style={{ width: '60%', position: 'relative', overflow: 'hidden' }}>
                     {formData.applicantSignature ? (
                        <>
                          <img src={URL.createObjectURL(formData.applicantSignature)} alt="Signature" style={{ width: '100%', height: '100%', objectFit: 'contain', position: 'absolute', top: 0, left: 0 }} />
                          <button onClick={(e) => clearFile(e, 'applicantSignature')} style={removeBtnStyle}>X</button>
                        </>
                     ) : (
                        <>
                          <span>UPLOAD SIGNATURE<br/><small>(JPG/JPEG, 10-50KB)</small></span>
                          <input type="file" className="photo-upload" name="applicantSignature" accept="image/jpeg, image/jpg" onChange={(e) => handleFileWithValidation(e, 'applicantSignature', 10, 50)} />
                        </>
                     )}
                  </div>
                </div>
              </div>

              <div className="mt-4 pl-4 font-weight-bold">
                 Encl: &nbsp; 1. 2 Stamp size photographs (Colour)<br/>
                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                 2. Specimen Signature in a separate paper
              </div>

              <div className="office-use-grid mt-5">
                 <div className="office-col border border-dark p-3">
                   <h4 className="text-center font-weight-bold" style={{textDecoration: 'underline'}}>For Branch Use</h4>
                   <div className="d-flex mt-3 fs-85">
                     <span className="text-nowrap">LM amount Rs.</span><span className="flex-1 border-btm mx-2"></span>
                     <span className="text-nowrap">DD.No.</span><span className="flex-1 border-btm ml-2"></span>
                   </div>
                   <div className="d-flex mt-3 fs-85">
                     <span className="text-nowrap">Dated</span><span className="w-30 border-btm mx-2"></span>
                     <span className="text-nowrap">Bank</span><span className="flex-1 border-btm ml-2"></span>
                   </div>
                   <div className="d-flex mt-3 fs-85">
                     <span className="text-nowrap">Branch</span><span className="flex-1 border-btm ml-2"></span>
                   </div>
                   
                   <div className="d-flex justify-content-between align-items-end mt-5 pt-3 fs-85">
                      <div className="d-flex"><span className="text-nowrap">Date</span><span className="border-btm ml-2" style={{width:'80px'}}></span></div>
                      <div className="text-center d-flex flex-column align-items-center">
                        <span className="border-btm" style={{width:'120px', height:'20px'}}></span>
                        <span className="mt-1">Signature &amp;<br/>Seal of Branch Sec.</span>
                      </div>
                   </div>
                 </div>
                 <div className="office-col border border-dark border-left-0 p-3">
                   <h4 className="text-center font-weight-bold" style={{textDecoration: 'underline'}}>For Head Office use</h4>
                   <div className="d-flex mt-3 fs-85">
                     <span className="text-nowrap">Receipt No.</span><span className="flex-1 border-btm mx-2"></span>
                     <span className="text-nowrap">Dated</span><span className="flex-1 border-btm ml-2"></span>
                   </div>
                   <div className="d-flex mt-3 fs-85">
                     <span className="text-nowrap">L.M.No.</span><span className="flex-1 border-btm ml-2"></span>
                   </div>
                   {/* Invisible spacer to match the height of the 'Branch' row on the left column */}
                   <div className="d-flex mt-3 fs-85" style={{ visibility: 'hidden' }}>
                     <span className="text-nowrap">Spacer</span>
                   </div>
                   <div className="d-flex justify-content-between align-items-end mt-5 pt-3 fs-85 h-break">
                      <div className="d-flex"><span className="text-nowrap">Date</span><span className="border-btm ml-2" style={{width:'80px'}}></span></div>
                      <div className="text-center d-flex flex-column align-items-center">
                        <span className="border-btm" style={{width:'120px', height:'20px'}}></span>
                        <span className="mt-1">Signature of Treasurer<br/>TNEBEA</span>
                      </div>
                   </div>
                 </div>
              </div>
              
              <div className="text-center mt-5 mb-2"><strong>- 2 -</strong></div>
            </div>
            
          </div>
          
          <div className="text-center p-4">
             <button type="submit" className="btn btn-primary submit-btn-ebf">Submit Life Membership</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LifeMembership;
