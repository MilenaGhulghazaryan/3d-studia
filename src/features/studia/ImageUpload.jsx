import React from 'react';
import style from './Studia.module.css';
const ImageUploadModal = ({ images, setImages }) => {
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setImages(URL.createObjectURL(selectedFile));
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
            <label htmlFor="fileInput">
                <div className={style.box}>
                    <div className={style.plus}>+</div>
                </div>
            </label>
        </div>
    );
}
export default ImageUploadModal



