
import {  useEffect } from 'react'

function Category({ cate }) {

    useEffect(() => {

    }, [])
  
    return (
        <>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            {cate.id}
                        </td>
                        <td>
                            {cate.name}
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}

export default Category;
