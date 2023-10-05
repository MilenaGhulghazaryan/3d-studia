import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { GetSubcategory, addSubCategory, setSubcategoryId } from "./SubcategorySlice"
import { useSearchParams } from "react-router-dom";
import style from './Subcategory.module.css'
import { IoIosArrowDown } from 'react-icons/io';

const Subcategory = () => {
    const dispatch = useDispatch()
    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        dispatch(GetSubcategory())
    }, [])
    const subcategory = useSelector(state => state.subcategory.subcategory)
    const icons = useSelector(state => state.icons.icons)
    const categoryQuery = +searchParams.get('category')
    const [inp, setInp] = useState(false)
    const [subCategoryTitle, setSubCategoryTitle] = useState('')
    const subcategoryId = useSelector(state => state.subcategory.subcategoryId)
    const categoryId = useSelector(state => state.icons.categoryId)
    return (
        <>

            <div className={style.subCategoryTitle}>
                {
                    subcategory.map(({ id, title, parentId }) => {
                        if (parentId === categoryQuery) {
                            return (
                                <div key={id} onClick={() => {
                                    setSearchParams({
                                        category: +searchParams.get('category'),
                                        subcategory: id
                                    })
                                    dispatch(setSubcategoryId(id))
                                }}>
                                    <p className={id == searchParams.get('subcategory') ? style.border1 : style.border2} >{title}</p>
                                </div>
                            )
                        }
                    })
                }
            </div>
            <div className={style.addSubcategory} onClick={() => {
                setInp(true)
            }}>+</div>

            {
                inp ? <div>
                    <input type="text" onChange={(e) => {
                        setSubCategoryTitle(e.target.value)
                    }} className={style.inp} />
                    <div className={style.addSubcategory} style={{ marginTop: '40px', background: 'green', fontSize: '20px', lineHeight: '0.8vw' }} onClick={() => {
                        if (subCategoryTitle.trim()) {
                            dispatch(addSubCategory({
                                parentId: categoryQuery,
                                title: subCategoryTitle
                            })).then(() => {
                                dispatch(GetSubcategory(categoryQuery))
                                setInp(false)
                            })
                            setSubCategoryTitle('')
                        } else {
                            alert('Լրացրեք դաշտը')
                        }
                    }}><IoIosArrowDown />
                    </div>
                </div> : null
            }

            <div className={style.line2}></div>
        </>
    )
}
export default Subcategory