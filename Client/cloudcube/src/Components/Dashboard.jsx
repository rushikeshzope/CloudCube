import React, { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import './Dashboard.css';
import photo from '../assets/logo.png';
import pic from "../assets/folder.png";

const TOTAL_STORAGE = 10 * 1024 * 1024 * 1024; // 10GB in bytes

const Dashboard = () => {
    const [folders, setFolders] = useState([]);
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [showStorage, setShowStorage] = useState(false);
    const [usedStorage, setUsedStorage] = useState(0);
    const [trashFiles, setTrashFiles] = useState([]);
    const [showTrash, setShowTrash] = useState(false);

    // Load folders from localStorage when the component mounts
    useEffect(() => {
        const savedFolders = JSON.parse(localStorage.getItem('folders'));
        if (savedFolders) {
            setFolders(savedFolders);
        }
    }, []);

    // Calculate and set used storage whenever folders or trashFiles change
    useEffect(() => {
        const totalUsedStorage = folders.reduce((total, folder) => {
            return total + folder.files.reduce((folderTotal, file) => folderTotal + file.size, 0);
        }, 0) + trashFiles.reduce((total, file) => total + file.size, 0);
        setUsedStorage(totalUsedStorage);

        // Save folders to localStorage whenever folders change
        localStorage.setItem('folders', JSON.stringify(folders));
    }, [folders, trashFiles]);

    const createFolder = () => {
        const folderName = prompt("Enter folder name:");
        if (folderName) {
            const newFolders = [...folders, { name: folderName, id: Date.now(), files: [] }];
            setFolders(newFolders);
            localStorage.setItem('folders', JSON.stringify(newFolders)); // Save folders to localStorage
        }
    };

    const selectFolder = (folderId) => {
        setSelectedFolder(folderId);
        setShowTrash(false);
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
            // Simulate file upload and add to folder
            addFileToFolder(file.name, file.size, Date.now());
        }

        setShowUploadModal(false);
    };

    const addFileToFolder = (fileName, fileSize, fileId) => {
        setFolders(folders.map(folder => {
            if (folder.id === selectedFolder) {
                return {
                    ...folder,
                    files: [...folder.files, { name: fileName, id: fileId, size: fileSize }],
                };
            }
            return folder;
        }));
    };

    const deleteFile = (folderId, fileId) => {
        setFolders(folders.map(folder => {
            if (folder.id === folderId) {
                const fileToDelete = folder.files.find(file => file.id === fileId);
                if (fileToDelete) {
                    setTrashFiles(prev => [...prev, {
                        ...fileToDelete,
                        originalFolderId: folderId,
                        originalFolderName: folder.name,
                        deletedAt: new Date().toISOString()
                    }]);
                }
                return {
                    ...folder,
                    files: folder.files.filter(file => file.id !== fileId)
                };
            }
            return folder;
        }));
    };

    const restoreFile = (fileId) => {
        const fileToRestore = trashFiles.find(file => file.id === fileId);
        if (fileToRestore) {
            const originalFolder = folders.find(f => f.id === fileToRestore.originalFolderId);
            if (originalFolder) {
                setFolders(folders.map(folder => {
                    if (folder.id === fileToRestore.originalFolderId) {
                        return {
                            ...folder,
                            files: [...folder.files, {
                                name: fileToRestore.name,
                                id: fileToRestore.id,
                                size: fileToRestore.size
                            }]
                        };
                    }
                    return folder;
                }));
                setTrashFiles(trashFiles.filter(file => file.id !== fileId));
            } else {
                alert("Original folder no longer exists. Creating a new folder for restored file.");
                const newFolder = {
                    name: "Restored Files",
                    id: Date.now(),
                    files: [{
                        name: fileToRestore.name,
                        id: fileToRestore.id,
                        size: fileToRestore.size
                    }]
                };
                setFolders([...folders, newFolder]);
                setTrashFiles(trashFiles.filter(file => file.id !== fileId));
            }
        }
    };

    const permanentlyDeleteFile = (fileId) => {
        if (window.confirm("Are you sure you want to permanently delete this file?")) {
            setTrashFiles(trashFiles.filter(file => file.id !== fileId));
        }
    };

    const deleteFolder = (folderId) => {
        if (window.confirm("Are you sure you want to delete this folder?")) {
            const updatedFolders = folders.filter(folder => folder.id !== folderId);
            setFolders(updatedFolders);
            localStorage.setItem('folders', JSON.stringify(updatedFolders)); // Save updated folders to localStorage
        }
    };

    const toggleTrash = () => {
        setShowTrash(true);
        setSelectedFolder(null);
    };

    const storagePercentage = (usedStorage / TOTAL_STORAGE) * 100;
    const remainingStorage = TOTAL_STORAGE - usedStorage;

    const getFolderSize = (folder) => {
        return folder.files.reduce((total, file) => total + file.size, 0);
    };

    return (
        <div className="dashboard-container">
            <div className="sidebar">
                <div className="logo">
                    <img src={photo} alt="CloudCube Logo" />
                </div>
                <ul>
                    <li onClick={createFolder}>Create</li>
                    <li onClick={() => setShowUploadModal(true)}>Upload</li>
                    <li onClick={toggleTrash}>Trash</li>
                    <li onClick={() => setShowStorage(!showStorage)}>Storage</li>
                </ul>
            </div>
            <div className="main-content">
                <div className="header">
                    <h1 className="user-entry">Hello <span className="username">Aditya</span></h1>
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
                            <h3>Folder Details</h3>
                            <ul>
                                {folders.map(folder => (
                                    <li key={folder.id}>
                                        {folder.name} - {getFolderSize(folder) / 1024 / 1024} MB
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {!showTrash ? (
                    <>
                        <div className="file-container">
                            {folders.map((folder) => (
                                <div
                                    key={folder.id}
                                    className={`file-item ${selectedFolder === folder.id ? 'selected' : ''}`}
                                    onClick={() => selectFolder(folder.id)}
                                >
                                    <img src={pic} alt="Folder" />
                                    <p>{folder.name}</p>
                                    <button onClick={() => deleteFolder(folder.id)}>Delete Folder</button>
                                    <p className="file-count">{folder.files.length} files</p>
                                </div>
                            ))}
                        </div>

                        {selectedFolder !== null && (
                            <div className="file-list">
                                <h3>Files in {folders.find(f => f.id === selectedFolder)?.name}</h3>
                                {folders.find(f => f.id === selectedFolder)?.files.map((file) => (
                                    <div key={file.id} className="file-item file-row">
                                        <div className="file-info">
                                            <img src={pic} alt="File" />
                                            <p>{file.name}</p>
                                            <p className="file-size">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                        </div>
                                        <button onClick={() => deleteFile(selectedFolder, file.id)}>Delete</button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                ) : (
                    <div className="trash-list">
                        <h3>Trash</h3>
                        {trashFiles.length === 0 ? (
                            <p>No files in trash.</p>
                        ) : (
                            trashFiles.map((file) => (
                                <div key={file.id} className="file-item file-row">
                                    <div className="file-info">
                                        <p>{file.name}</p>
                                        <p className="file-size">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                        <p className="file-folder">From: {file.originalFolderName}</p>
                                    </div>
                                    <button className="restore-button" onClick={() => restoreFile(file.id)}>Restore</button>
                                    <button className="delete-button" onClick={() => permanentlyDeleteFile(file.id)}>Delete</button>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {showUploadModal && (
                    <div className="upload-modal">
                        <div className="modal-content">
                            <h3>Upload Files</h3>
                            <input type="file" multiple onChange={handleFileUpload} />
                            <button onClick={() => setShowUploadModal(false)}>Cancel</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
