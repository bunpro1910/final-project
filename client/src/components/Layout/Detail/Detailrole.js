
import {  useEffect } from 'react'

function Category({ role }) {

    useEffect(() => {

    }, [])
  
    return (
        <>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Permission</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            {role.name}
                        </td>
                        <td>
                            {role.permission}
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}

export default Category;
