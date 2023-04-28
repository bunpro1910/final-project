
import {  useEffect } from 'react'

function Category({ pro }) {

    useEffect(() => {

    }, [])
  
    return (
        <>
            <div className="relative flex">
                <img className="w-[200px] h-fit" src={pro.image} alt=""/>
                <div className="ml-4 flex flex-wrap">
                    <div className="mr-4">
                        <h1 className="mb-2">ID :</h1>
                        <h1 className="mb-2">Name :</h1>
                        <h1 className="mb-2">Category Name :</h1>
                        <h1 className="mb-2">Brand Name :</h1>
                        <h1 className="mb-2">Price :</h1>
                        <h1 className="mb-2">Storage Quantity :</h1>
                        <h1 className="mb-2">Strap :</h1>
                        <h1 className="mb-2">Waterproof :</h1>
                        <h1 className="mb-2">Description :</h1>
                    </div>
                    <div>
                        <h1 className="mb-2">{pro.id}</h1>
                        <h1 className="mb-2">{pro.name}</h1>
                        <h1 className="mb-2">{pro.catename}</h1>
                        <h1 className="mb-2">{pro.brandname}</h1>
                        <h1 className="mb-2">{pro.price}</h1>
                        <h1 className="mb-2">{pro.quantity}</h1>
                        <h1 className="mb-2">{pro.waterproof}</h1>
                        <h1 className="max-w-[400px] mb-2">{pro.description}</h1>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Category;
