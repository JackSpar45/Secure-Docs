import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css'; 
import DescriptionIcon from '@mui/icons-material/Description';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Dashboard = ({ email, onLogout }) => {
    const [profile, setProfile] = useState({});
    const [loginTimestamps, setLoginTimestamps] = useState([]);
    const [files, setFiles] = useState([]); // Add state for files

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/profile`, {
                    params: { email },
                });
                setProfile(response.data);
                setLoginTimestamps(response.data.loginTimestamps || []);
                setFiles(response.data.files || []); // Set files from profile data
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, [email]);

    // Decrypt file function
    const handleDecrypt = async (file) => {
    try {
        const response = await axios.post('https://secure-docs.onrender.com/decrypt', 
        { email, fileId: file._id }, 
        { responseType: 'blob' });  // Ensure response is treated as binary

        // Create a blob URL from the response
        const blob = new Blob([response.data], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);

        // Create a temporary download link
        const link = document.createElement('a');
        link.href = url;
        link.download = file.filename; // Set downloaded filename
        document.body.appendChild(link);
        link.click(); // Trigger the download
        document.body.removeChild(link);

        // Clean up URL
        URL.revokeObjectURL(url);
        
        alert('File decrypted and downloaded successfully!');
    } catch (error) {
        console.error('Error decrypting file:', error);
        alert('File decryption failed.');
    }
};


    // Share file function
    const handleShare = async (file) => {
        const recipientEmail = prompt('Enter the recipient\'s email:');
        if (!recipientEmail) return;

        try {
            const response = await axios.post(`${API_BASE_URL}/share`, {
                email,
                recipientEmail,
                fileId: file._id, // Pass file ID to identify the file
            });
            alert('File shared successfully!');
        } catch (error) {
            console.error('Error sharing file:', error);
            alert('File sharing failed.');
        }
    };

    // File Upload function
    const FileUpload = ({ email }) => {
        const [file, setFile] = useState(null);

        const handleFileChange = (e) => {
            setFile(e.target.files[0]);
        };

        const handleUpload = async () => {
            if (!file) return;

            const formData = new FormData();
            formData.append('file', file);
            formData.append('email', email);

            try {
                const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                alert('File encrypted and uploaded successfully!');
                setFiles([...files, response.data.file]); // Add the newly uploaded file to the state
            } catch (error) {
                console.error('Error uploading file:', error);
                alert('File upload failed.');
            }
        };

        return (
            <div className='File_Upload'>
                <p className='text-xl mt-10 font-semibold'>Upload New File <span className="text-base italic font-normal">(Files up to 5MB are supported for now)</span></p>
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleUpload} className='bg-green-500 rounded-md ml-[-50px] text-white px-5 py-2 hover:bg-green-600'>Upload</button>
            </div>
        );
    };

    return (
        <div className="dashboard">
            <h1 className='text-4xl mb-2'>Dashboard</h1>
            <button onClick={onLogout} className="logout-btn">Logout</button>
            <div>
                <p className='text-3xl mb-2 mt-10'>Profile</p>
                <p className='text-xl'><strong>Email:</strong>  {profile.email}</p>
                <p className='text-xl'><strong>Registered At:</strong> {profile.registeredAt}</p>
            </div>

            <FileUpload email={email} />

            <div className='files'>
                <p className='mt-10 text-xl font-semibold'>Your Files</p>
                <table className="files-table">
                    <thead>
                        <tr>
                            <th>Filename</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {files.length > 0 ? (
                            files.map((file, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                                    <td><DescriptionIcon style={{ marginRight: '8px' }}/>{file.filename}</td>
                                    <td>
                                        <button onClick={() => handleDecrypt(file)} className='bg-blue-500 rounded-md ml-5 text-white px-3 py-2 hover:bg-blue-600'>Decrypt</button>
                                        <button onClick={() => handleShare(file)} className='bg-purple-500 rounded-md text-white px-5 py-2 hover:bg-purple-600 ml-2'>Share</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2" className="no-files">
                                    No files available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className='logs'>
                <p className='mt-10 text-xl font-semibold'>Login Logs</p>
                <table className="logs-table">
                    <thead>
                        <tr>
                            <th>Date, Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loginTimestamps.length > 0 ? (
                            loginTimestamps.map((log, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                                    <td>{log}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="1" className="no-logs">
                                    No login logs available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            
        </div>
    );
};

export default Dashboard;

