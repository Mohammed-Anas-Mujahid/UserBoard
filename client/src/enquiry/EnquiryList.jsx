import React from 'react'
import { Button, Checkbox, Label, Textarea, TextInput, Table } from 'flowbite-react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

export default function EnquiryList({ data, getAllEnquiry, Swal, setFormData }) {
    let deleteRow = (delid) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            // showCancelButton: true,
            showDenyButton: true,
            confirmButtonColor: '#3085d6',
            // cancelButtonColor: '#d33',
            denyButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8020/api/website/enquiry/delete/${delid}`)
                    .then((res) => {
                        toast.success('Entry Deleted Successfully');
                        getAllEnquiry(); // Refresh the list after deletion
                    })
                Swal.fire(
                    'Deleted!',
                    'Your entry has been deleted.',
                    'success'
                )
            }
        })


    }

    let editRow = (editid) => {
        Swal.fire({
            title: 'Do you want to update?',
            showDenyButton: true,
            confirmButtonColor: '#3085d6',
            denyButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }) .then((result) => {
            if (result.isConfirmed) {
                axios.get(`http://localhost:8020/api/website/enquiry/single/${editid}`)
                .then((res)=>{
                    let data = res.data;
                    setFormData(data.enquiry);
                })
                Swal.fire(
                    'Kindly update the entry in the Entry Form.'
                )
            }
        })
    }

    return (
        <div className='bg-gray-200 mx-4 p-4 sm:rounded-lg'>
            <h2 className='text-[20px] font-bold pb-5 '>Entry List</h2>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Sr No
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Phone
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Message
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Edit
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Delete
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            data.length >= 1 ?
                                data.map((item, index) => {
                                    return (
                                        <tr key={index} className=" odd:dark:bg-gray-800  even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-400">
                                                {index + 1}
                                            </th>
                                            <td className="px-6 py-4">
                                                {item.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.email}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.phone}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.message}
                                            </td>
                                            <td className="px-6 py-4">
                                                <a href="#" onClick={() => editRow(item._id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                            </td>
                                            <td className="px-6 py-4">
                                                <a href="#" onClick={() => deleteRow(item._id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</a>
                                            </td>
                                        </tr>
                                    )
                                })
                                :
                                <tr className="text-center">
                                    <td colSpan={7} className='py-4'>No Enquiry Found</td>
                                </tr>
                        }
                        {/* <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                01
                            </th>
                            <td class="px-6 py-4">
                                Anas
                            </td>
                            <td class="px-6 py-4">
                                anas@gmail.com
                            </td>
                            <td class="px-6 py-4">
                                7738644929
                            </td>
                            <td class="px-6 py-4">
                                Hello !!
                            </td>
                            <td class="px-6 py-4">
                                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                            </td>
                            <td class="px-6 py-4">
                                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</a>
                            </td>

                        </tr> */}

                    </tbody>
                </table>
            </div>

        </div>
    );
}
