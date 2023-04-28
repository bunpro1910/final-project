

import { useState, useEffect, useRef, } from 'react'

function Category({ search, setsearch, handleSearch }) {

    useEffect(() => {



    }, [])


    return (
        <>

            <form onSubmit={handleSearch}>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Product ID</label>
                    <input type="text" onChange={(e) => { search.s_id = e.target.value; setsearch({ ...search }) }} value={search.s_id} class="form-control" />
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Product Name</label>
                    <input type="text" onChange={(e) => { search.s_name = e.target.value; setsearch({ ...search }) }} value={search.s_name} class="form-control" />
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Category Name</label>
                    <input type="text" onChange={(e) => { search.s_cateid = e.target.value; setsearch({ ...search }) }} value={search.s_cateid} class="form-control" />
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Price ID</label>
                    <select class="form-select" onChange={(e) => { search.s_price.type = e.target.value; search.s_price.value = ''; setsearch({ ...search }) }} value={search.s_price.type}  >
                        <option value='equal' defaultValue={true}>Equal</option>
                        <option value='bigger' >Bigger than</option>
                        <option value='less'>Less than</option>
                        <option value='bigger_equal' >Bigger or Equal</option>
                        <option value='less_equal' >Less or Equal</option>
                        <option value='between' >between</option>
                    </select>
                    {search.s_price.type == "between" ?
                        <>
                            <input type="text" onChange={(e) => { search.s_price.value = { bigger: e.target.value, less: search.s_price.value.less }; setsearch({ ...search }) }} value={search.s_price.value.bigger} class="form-control" placeholder='less than' />
                            <input type="text" onChange={(e) => { search.s_price.value = { bigger: search.s_price.value.bigger, less: e.target.value }; setsearch({ ...search }) }} value={search.s_price.value.less} class="form-control" placeholder='bigger than' />
                        </> :
                        <input type="text" onChange={(e) => {
                            search.s_price.value = e.target.value; setsearch({ ...search })
                        }} value={search.s_price.value} class="form-control" placeholder={search.s_price.type} />
                    }
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Price ID</label>
                    <select class="form-select" onChange={(e) => { search.s_quantity.type = e.target.value; search.s_quantity.value = ''; setsearch({ ...search }) }} value={search.s_quantity.type}  >
                        <option value='equal' defaultValue={true}>Equal</option>
                        <option value='bigger' >Bigger than</option>
                        <option value='less' >Less than</option>
                        <option value='bigger_equal' >Bigger or Equal</option>
                        <option value='less_equal'>Less or Equal</option>
                        <option value='between' >between</option>
                    </select>
                    {search.s_quantity.type == "between" ?
                        <>
                            <input type="text" onChange={(e) => { search.s_quantity.value = { bigger: e.target.value, less: search.s_quantity.value.less }; setsearch({ ...search }) }} value={search.s_quantity.value.bigger} class="form-control" placeholder="bigger than" />
                            <input type="text" onChange={(e) => { search.s_quantity.value = { bigger: search.s_quantity.value.bigger, less: e.target.value }; setsearch({ ...search }) }} value={search.s_quantity.value.less} class="form-control" placeholder="less than" />

                        </> :
                        <input type="text" onChange={(e) => {
                            search.s_quantity.value = e.target.value; setsearch({ ...search })
                        }} value={search.s_quantity.value} class="form-control" placeholder={search.s_quantity.type} />
                    }
                </div>
                <button className="btn btn-danger" type='submit' style={{ display: 'none' }} onClick={handleSearch}></button>
            </form>
        </>
    );
}

export default Category;
