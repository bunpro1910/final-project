

import { useState, useEffect, useRef, } from 'react'

function Category({ search, setsearch,handleSearch }) {

    useEffect(() => {



    }, [])


    return (
        <>

            <form onSubmit={handleSearch}>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Category ID</label>
                    <input type="text" onChange={(e) => { search.s_id = e.target.value; setsearch({ ...search }) }} value={search.s_id} class="form-control" />
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Category Name</label>
                    <input type="text" onChange={(e) => { search.s_name = e.target.value; setsearch({ ...search }) }} value={search.s_name} class="form-control" />
                </div>
                <input type="submit" className='hidden'/>
            </form>
            
        </>
    );
}

export default Category;
