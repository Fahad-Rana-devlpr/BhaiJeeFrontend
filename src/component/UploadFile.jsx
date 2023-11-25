import React, { useState } from "react";
import axios from "axios";

const UploadFile = () => {
    const [file, setFile] = useState(null);
    const handleUploadFile = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        try {
            await axios.post('http://localhost:3001/uploadfile',formData, {
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
            
        })
        } catch (error) {
        }
        
    }
  return (
    <>
      <div style={{width: '100%', height: '100vh',display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div>
            <form onSubmit={handleUploadFile} style={{display: 'flex', flexDirection: 'column'}} >
              <input
              style={{marginBottom: '1em', width: '100%'}}
            type="file"
            accept=".csv,.xlsx,application/vnd.ms-excel"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input type="submit" value="Upload File" onSubmit={handleUploadFile} />

            </form>
        </div>
      </div>
    </>
  );
};

export default UploadFile;
