import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import photo from '../assets/logo.png';
import pic from "../assets/folder.png";
import photo2 from '../assets/cloud.png';
import photo3 from '../assets/comp.png';
import photo4 from '../assets/computer.png';
import photo5 from '../assets/data.png';
import photo6 from '../assets/multiple.png';
import photo7 from '../assets/storage.png';

const TOTAL_STORAGE = 10 * 1024 * 1024 * 1024; // 10GB in bytes

const Dashboard = () => {
    const [folders, setFolders] = useState([]);
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [showStorage, setShowStorage] = useState(false);
    const [usedStorage, setUsedStorage] = useState(0);

    useEffect(() => {
        const totalUsedStorage = folders.reduce((total, folder) => {
            return total + folder.files.reduce((folderTotal, file) => folderTotal + file.size, 0);
        }, 0);
        setUsedStorage(totalUsedStorage);
    }, [folders]);

    const createFolder = () => {
        const folderName = prompt("Enter folder name:");
        if (folderName) {
            setFolders([...folders, { name: folderName, id: Date.now(), files: [] }]);
        }
    };

    const selectFolder = (folderId) => {
        setSelectedFolder(folderId);
    };

    const handleFileUpload = async (event) => {
        if (selectedFolder === null) {
            alert("Please select a folder first!");
            return;
        }

        const uploadedFiles = Array.from(event.target.files);
        const totalSize = uploadedFiles.reduce((total, file) => total + file.size, 0);

        if (usedStorage + totalSize > TOTAL_STORAGE) {
            alert("Not enough storage space!");
            return;
        }

        for (const file of uploadedFiles) {
            const fileReader = new FileReader();
            fileReader.onload = async () => {
                const fileContent = fileReader.result;
                await uploadFileToServer(file.name, fileContent);
                addFileToFolder(file.name, file.size);
            };
            fileReader.readAsDataURL(file); // Read the file as a Data URL (base64)
        }
        setShowUploadModal(false);
    };

    const uploadFileToServer = async (fileName, fileContent) => {
        const url = 'https://<api-id>.execute-api.<region>.amazonaws.com/dev/';

        const payload = {
            body: JSON.stringify({
                fileName: fileName,
                fileContent: fileContent.split(',')[1], // Get the base64 part
            }),
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Upload Success:', data);
            } else {
                console.error('Upload Error:', data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const addFileToFolder = (fileName, fileSize) => {
        setFolders(folders.map(folder => {
            if (folder.id === selectedFolder) {
                return {
                    ...folder,
                    files: [...folder.files, {
                        name: fileName,
                        id: Date.now() + Math.random(),
                        size: fileSize,
                    }],
                };
            }
            return folder;
        }));
    };

    const toggleStorage = () => {
        setShowStorage(!showStorage);
    };

    const storagePercentage = (usedStorage / TOTAL_STORAGE) * 100;
    const remainingStorage = TOTAL_STORAGE - usedStorage;

    return (
      <>
        <div className="dashboard-container">
            <div className="sidebar">
                <div className="logo">
                    <img src={photo} alt="CloudCube Logo" />
                </div>
                <ul>
                    <li onClick={createFolder}>Create</li>
                    <li onClick={() => setShowUploadModal(true)}>Upload</li>
                    <li>Trash</li>
                    <li onClick={toggleStorage}>Storage</li>
                </ul>
            </div>
            <div className="main-content">
                <div className="header">
                    <h1 className='user-entry'>Hello <span className="username">Aditya</span></h1>
                    <p>CLOUD UP!</p>
                </div>
                {showStorage && (
                    <div className="storage-info">
                        <div className="storage-circle" style={{ background: `conic-gradient(#4CAF50 ${storagePercentage}%, #FFF ${storagePercentage}% 100%)` }}>
                            <div className="storage-inner">
                                <span>{storagePercentage.toFixed(1)}%</span>
                                <span>Used</span>
                            </div>
                        </div>
                        <div className="storage-details">
                            <p>Used: {(usedStorage / 1024 / 1024 / 1024).toFixed(2)} GB</p>
                            <p>Remaining: {(remainingStorage / 1024 / 1024 / 1024).toFixed(2)} GB</p>
                        </div>
                    </div>
                )}
                <div className="file-container">
                    {folders.map((folder) => (
                        <div
                            key={folder.id}
                            className={`file-item ${selectedFolder === folder.id ? 'selected' : ''}`}
                            onClick={() => selectFolder(folder.id)}
                        >
                            <img src={pic} alt="Folder" />
                            <p>{folder.name}</p>
                            <p className="file-count">{folder.files.length} files</p>
                        </div>
                    ))}
                </div>
                {selectedFolder !== null && (
                    <div className="file-list">
                        <h3>Files in {folders.find(f => f.id === selectedFolder)?.name}</h3>
                        {folders.find(f => f.id === selectedFolder)?.files.map((file) => (
                            <div key={file.id} className="file-item">
                                <img src={pic} alt="File" />
                                <p>{file.name}</p>
                                <p className="file-size">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="footer-icons">
                <img src={photo2} alt="Icon1" />
                <img src={photo3} alt="Icon2" />
                <img src={photo4} alt="Icon3" />
                <img src={photo5} alt="Icon4" />
                <img src={photo6} alt="Icon5" />
            </div>
            {showUploadModal && (
                <div className="upload-modal">
                    <h3>Upload Files</h3>
                    <p>Selected Folder: {folders.find(f => f.id === selectedFolder)?.name || "None"}</p>
                    <input
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                    />
                    <button onClick={() => setShowUploadModal(false)}>Cancel</button>
                </div>
            )}
        </div>
      </>
    )
};

export default Dashboard;
