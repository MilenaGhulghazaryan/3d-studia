import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import style from './AddImg.module.css'
import PictureUpload from './PictureUpload';
import { useDispatch, useSelector } from 'react-redux';
import { GetImages, addNewImage } from './AddImgSlice';
import { useSearchParams } from "react-router-dom";

const styles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '255px',
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    height: '229px',
    background: '#545662',
    borderRadius: '5px'
};

const AddImg = () => {
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [pictures, setPictures] = React.useState([])
    const images = useSelector(state => state.images.images)
    const [productName, setProductname] = React.useState('')
    const [openPicture, setOpenPicture] = React.useState(false)
    const close = () => setOpenPicture(false)
    const [searchParams, setSearchParams] = useSearchParams();
    const [imgId, setImgId] = React.useState(null)
    React.useEffect(() => {
        dispatch(GetImages())
    }, [])
    const subcategoryId = useSelector(state => state.subcategory.subcategoryId)
    const categoryId = useSelector(state => state.icons.categoryId)

    return (
        <>
            <div style={{ background: 'red', height: '350px', backgroundColor: '#383A45' }}>
                <button className={style.addBtn} onClick={handleOpen}> <p style={{ fontSize: '24px' }}>+</p>
                    <p>Добавить</p>
                </button>
                <PictureUpload pictures={pictures} setPictures={setPictures} />
                <div style={{ display: 'flex', gap: '22px', width: '91%', marginLeft: '55px', marginTop: '27px' }}>
                    {
                        images?.map(({ id, productName, picture, subCategoryId, categoryId }) => {
                            // if (categoryId === +searchParams.get('category') && subCategoryId === +searchParams.get('subcategory')) {
                            return (
                                <div key={id} className={style.whiteBox}>
                                    <img src={picture} alt="" onClick={() => {
                                        setOpenPicture(true)
                                        setImgId(id)
                                    }} />
                                    <p>{productName}</p>
                                </div>
                            )
                            // }
                        })
                    }
                </div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={styles} >
                        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            <div className={style.box1}>
                                <svg width="22" height="27" viewBox="0 0 22 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.2499 1H3.49997C2.83694 1 2.20106 1.26339 1.73222 1.73223C1.26339 2.20107 1 2.83696 1 3.5V23.5C1 24.163 1.26339 24.7989 1.73222 25.2678C2.20106 25.7366 2.83694 26 3.49997 26H18.4998C19.1628 26 19.7987 25.7366 20.2676 25.2678C20.7364 24.7989 20.9998 24.163 20.9998 23.5V9.75L12.2499 1Z" stroke="white" stroke-opacity="0.55" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M12.25 1V9.75H20.9999" stroke="white" stroke-opacity="0.55" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M11.3999 11.833V16.833" stroke="white" stroke-opacity="0.55" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M9 14.333H13.8" stroke="white" stroke-opacity="0.55" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>

                                <p>добавить файл </p>
                            </div>
                            {
                                pictures.length === 0 ? (<label htmlFor="fileInput">
                                    <div className={style.box2}>
                                        <svg width="27" height="22" viewBox="0 0 27 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6 6.2002V11.0002" stroke="white" stroke-opacity="0.55" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M3.5 8.60059H8.49999" stroke="white" stroke-opacity="0.55" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M23.2221 1H3.77777C2.24365 1 1 1.99492 1 3.22222V18.7778C1 20.0051 2.24365 21 3.77777 21H23.2221C24.7563 21 25.9999 20.0051 25.9999 18.7778V3.22222C25.9999 1.99492 24.7563 1 23.2221 1Z" stroke="white" stroke-opacity="0.55" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M26.0005 14.3329L19.056 8.77734L3.77832 20.9996" stroke="white" stroke-opacity="0.55" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        <p>добавить  фото  </p>
                                    </div>
                                </label>) :
                                    pictures && (
                                        <div className={style.box2}>
                                            <img src={pictures} alt="" width='65px' height='60px' />
                                        </div>
                                    )
                            }
                        </div>
                        <p className={style.name}> название</p>
                        <input type="text" onChange={(e) => {
                            setProductname(e.target.value)
                        }} />
                        <button className={style.modalAddBtn} onClick={() => {
                            dispatch(addNewImage({
                                productName: productName,
                                picture: pictures,
                                categoryId: categoryId,
                                subCategoryId: subcategoryId
                            })).then(() => {
                                dispatch(GetImages())
                                handleClose()
                                setPictures([])
                            })
                        }}>сохранить  </button>
                    </Box>
                </Modal>

                <Modal
                    open={openPicture}
                    onClose={close}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={styles} >
                        {
                            images?.map(({ id, productName, picture }) => {
                                if (imgId === id) {
                                    return (
                                        <div className={style.modalBox}>
                                            <img src={picture} alt="" width='670px' height='398px' style={{
                                                marginLeft: '14px',
                                                marginTop: '15px'
                                            }} />
                                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '96%', margin: 'auto', alignItems: 'center' }}>
                                                <p>{productName}</p>
                                                <button>открыть </button>
                                            </div>

                                        </div>
                                    )
                                }
                            })
                        }
                    </Box>
                </Modal>
            </div>
        </>
    );
}
export default AddImg 