import Image from "next/image";
import styles from "./CategoryDropdown.module.scss"
import supabaseBrowserClient from "@/lib/supabaseBrowserClient";
import { useEffect, useState } from "react";
import { Category } from "@/types/home.types";

function CategoryDropdown({formik} : {formik: any}) {

    const [categoryList, setCategoryList] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category>();

    const supabase = supabaseBrowserClient();


    useEffect(() => {
        const getCategoryList = async () => {
            const {data, error} = await supabase.from('categories').select();
            if (!error) {
                setCategoryList(() => data as Category[]);
                console.log(data)
            }
        }
        getCategoryList();
    }, [])

    useEffect(() => {

        const result : Category | undefined = categoryList.find(
            (category) => {
                return category.id == formik.values.category
            }
          );

        result ? setSelectedCategory(result) : setSelectedCategory(undefined);
        
    }, [formik.values.category])


    return (
        <div className={`${styles.dropdownWrapper} ${!selectedCategory ? styles.default : null}`}>
            <select 
                className={styles.categoryDropdown} 
                name="category" 
                value={formik.values.category} 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            >
                <option value={-1} >Choose Topic</option>
                {
                    categoryList.map((category : Category) => {
                        return <option key={category.id} value={Number(category.id)}>{`${category.category_emoji} ${category.category_name}`}</option>
                    })
                }
            </select>
            <svg width="12" height="12" viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.98734 2L2 7.5L7.98734 13" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

            {
                selectedCategory ? 
                <p><span>{selectedCategory.category_emoji}</span>{selectedCategory.category_name}</p>
                :
                <p>Choose Topic</p>
            }
        </div>
    );
}

export default CategoryDropdown;