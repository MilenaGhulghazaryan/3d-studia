import { useEffect, useState } from 'react';
import style from './Studia.module.css';
import { useDispatch, useSelector } from "react-redux";
import { GetIcons, addNewImage, changeIcons, setCategoryId } from './StudiaSlice';
import { IoIosArrowDown } from 'react-icons/io';
import ImageUpload from './ImageUpload';
import { ReactSVG } from 'react-svg'
import Subcategory from '../subcategory/Subcategory';
import { useSearchParams } from "react-router-dom";

const MoveableItem = () => {
    const [isDragging, setIsDragging] = useState(false);
    const dragStart = () => setIsDragging(true);
    const dragEnd = () => setIsDragging(false);

    return (
        <div
            draggable="true"
            onDragEnd={dragEnd}
            onDragStart={dragStart}
        >
        </div>
    );
};


const Studia = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch()
    const colorArray = ['#000000', '#A9A9A9', '#FF4500', '#663399', '#48D1CC', '#D3D3D3', '#87CEFA', 'red', 'blue', 'yellow', 'green', 'purple', '#2E8B57', '#00FF7F'];
    const [showColors, setShowColors] = useState(false)
    const [images, setImages] = useState([]);

    useEffect(() => {
        dispatch(GetIcons())
    }, [])
    const [title, setTitle] = useState('')
    const [colors, setColors] = useState('purple')
    const [lineColor, setLineColor] = useState('')
    const categoryId = useSelector(state => state.icons.categoryId)
    const icons = useSelector(state => state.icons.icons)
    const [items, setItems] = useState([])


    useEffect(() => {
        if (icons?.length) {
            setItems(icons)
        }
    }, [icons])

    const [draggedItem, setDraggedItem] = useState(null);
    const dragStart = index => {
        setDraggedItem(items[index]);
    };

    const dragOver = (e, index) => {
        const updatingList = items.filter(elem => elem !== draggedItem);
        updatingList.splice(index, 0, draggedItem);
        setItems(dispatch(changeIcons(updatingList)));
    };

    return (
        <>
            <div style={{ height: '42px' }}>
                <ul className={style.lists}>
                    <li>3D Студия</li>
                    <li>Производство</li>
                </ul>
            </div>
            <div className={style.process}>
                <p className={style.proces}>Процессы</p>
                <div className={style.icons}>
                    {
                        icons?.map(({ id, icon, title, color, images }, index) => {
                            return (
                                <>
                                    <div key={id} onDragOver={e => dragOver(e, index)}>
                                        <ReactSVG src={images} style={{ stroke: color }} />
                                        <div className={style.ellipse} id={title}
                                            draggable="true"
                                            onDragStart={() => dragStart(index)}
                                            onDragEnd={() => setDraggedItem(null)} onClick={() => {
                                                setSearchParams({
                                                    category: id
                                                })
                                                dispatch(setCategoryId(id))
                                            }} style={categoryId === id ? { boxShadow: `1px  2px 20px 10px ${color}`, background: `${color}` } : { background: `linear-gradient(to left,${color}, ${color}` }} >

                                            <MoveableItem
                                                key={title}
                                                index={index}
                                                name={title}
                                            />
                                        </div>

                                        <div className={style.rectangle} style={{ background: `linear-gradient(to left , ${icons[(index + 1) % icons.length].color}, ${color} ` }}></div>

                                        <p className={style.title} style={{ marginTop: '100px' }}>{title}</p>
                                    </div>
                                    {/* <p className={style.title} style={{ marginTop: '100px' }}>{title}</p> */}
                                </>
                            )
                        })

                    }
                    <div className={style.addElipse} onClick={() => {
                        setShowColors(true)
                    }}>+</div>
                </div>

                {
                    showColors ?
                        <>
                            <div className={style.ok} onClick={() => {
                                if (title.trim() && images.length !== 0) {
                                    dispatch(addNewImage({
                                        images: images,
                                        title: title,
                                        color: colors,
                                    })).then(() => {
                                        dispatch(GetIcons())
                                        setTitle('')
                                        setShowColors(false)
                                    })
                                } else {
                                    alert("Լրացրեք բոլոր դաշտերը")
                                }
                            }}><IoIosArrowDown /></div>

                            <div className={style.addChangeColor}>
                                <div className={style.pro}>
                                    <ImageUpload images={images} setImages={setImages} />
                                    <p>Про</p>
                                    <input type="text" onChange={(e) => {
                                        setTitle(e.target.value)
                                    }} />
                                    <div className={style.colorBox} style={{ background: colors }}></div>
                                </div>
                                <div className={style.whiteBox}>

                                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-around' }}>
                                        {colorArray.map((color, index) => (
                                            <div
                                                key={index}
                                                style={{
                                                    backgroundColor: color,
                                                    width: '20px',
                                                    height: '20px',
                                                    borderRadius: '50%'
                                                }}
                                                onClick={() => {
                                                    setColors(color)
                                                }}>
                                            </div>

                                        ))}
                                    </div>
                                </div>
                            </div>
                        </> : null
                }
                <div className={style.line}></div>
                <Subcategory />
            </div>
        </>
    )
}
export default Studia




