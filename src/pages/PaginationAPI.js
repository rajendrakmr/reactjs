import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const PaginationAPI = () => {


    const fData = [
        { id: 1, name: "item1" },
        { id: 2, name: "item2" },
        { id: 3, name: "item1" },
        { id: 4, name: "item4" },
        { id: 5, name: "item1" },
        { id: 6, name: "item1" },
        { id: 7, name: "item66" },
        { id: 8, name: "item1" }
    ]

    const itemPerPage = 3



    
    const [currentPage, setCurrentPage] = useState(1)
    const [currentItems, setCurrentItems] = useState([])



    useEffect(() => {
        const fetchData = () => {
            const offset = (currentPage - 1) * itemPerPage;
            const paginationItems = fData.slice(offset, offset + itemPerPage)
            setCurrentItems(paginationItems)
        }


        fetchData()
    }, [currentPage])


 
    return (
        <div>
            {
                currentItems?.map((item) => (
                    <li>{item.name}</li>
                ))
            }

            <div>
                <button onClick={()=>{ setCurrentPage(currentItems - 1)}}>Pre</button>
                <button onClick={()=>{ setCurrentPage(currentItems + 1)}}>Next</button>
            </div>

        </div>
    )
}

export default PaginationAPI