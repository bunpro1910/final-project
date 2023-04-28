
import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef, } from 'react'


function Category({account}) {


    useEffect(() => {


    }, [])

    return (
        <>

            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>fullname</th>
                        <th>gmail</th>
                        <th>Role</th>
                        <th>Gender</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            {account.fullname}
                        </td>
                        <td>
                            {account.id}
                        </td>
                        <td>
                            {account.rolename}
                        </td>
                        <td>
                            {account.gender?"boy":"girl"}
                        </td>
                    </tr>
                </tbody>
            </table>


        </>
    );
}

export default Category;
