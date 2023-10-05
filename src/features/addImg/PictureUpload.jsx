import React from 'react';

const PictureUpload = ({ pictures, setPictures }) => {
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setPictures(URL.createObjectURL(selectedFile));
        }
    };
    return (
        <div>
            <input
                type="file"
                accept=".png,.svg,.jpg"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id="fileInput"
            />
        </div>
    );
}
export default PictureUpload