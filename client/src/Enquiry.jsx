import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Label, Textarea, TextInput, Table } from 'flowbite-react';
import { ToastContainer, toast } from 'react-toastify';
import EnquiryList from './enquiry/EnquiryList';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import axios from 'axios';

export default function Enquiry() {

    let [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    })

    let [enquiryList, setEnquiryList] = useState([])

    let saveEnquiry = (e) => {
        e.preventDefault();
        // let formData = {
        //     name: e.target.name.value,
        //     email: e.target.email.value,
        //     phone: e.target.phone.value,
        //     message: e.target.message.value
        // }

        if (formData._id) {
            // Update existing enquiry
            axios.put(`http://localhost:8020/api/website/enquiry/update/${formData._id}`, formData)
            .then((res) => {
                toast.success('Entry Updated Successfully')
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    message: '',
                    _id: ''
                })
                getAllEnquiry(); // Refresh the list after update
            })
        } else {
            // Insert new Entry
            axios.post(`http://localhost:8020/api/website/enquiry/insert`, formData)
            .then((res) => {
                console.log(res.data);
                toast.success('Entry Saved Successfully')
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    message: '',
                    _id: ''
                })
                getAllEnquiry(); // Refresh the list after saving
            })
        }


    }

    let getAllEnquiry = () => {
        axios.get(`http://localhost:8020/api/website/enquiry/view`)
            .then((res) => {
                return res.data;
            })
            .then((finalData) => {
                if (finalData.status) {
                    setEnquiryList(finalData.enquiryList);
                }
            })
    }

    let getValue = (e) => {
        let inputName = e.target.name // name,email,phone,message
        let inputValue = e.target.value
        let oldData = { ...formData }

        oldData[inputName] = inputValue;
        setFormData(oldData);
    }

    useEffect(() => {
        getAllEnquiry();
    }, [])

    return (
        <div>
            <ToastContainer />
            <h1 className='text-[40px] text-center py-6 font-bold'>Data Entry Dashboard</h1>

            <div className='grid grid-cols-[30%_auto]'>
                <div className='bg-gray-200 mx-4 p-4 sm:rounded-lg'>
                    <h2 className='text-[20px] font-bold'>Entry Form</h2>
                    <form action="" onSubmit={saveEnquiry}>
                        <div className='py-3'>
                            <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-900">Your Name</label>
                            <TextInput id="name" type='text' value={formData.name} onChange={getValue} name='name' placeholder='Enter Your Name' required={true} />
                        </div>
                        <div className='py-3'>
                            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-900">Your Email</label>
                            <TextInput id="email" type='email' value={formData.email} onChange={getValue} name='email' placeholder='Enter Your Email' required={true} />
                        </div>
                        <div className='py-3'>
                            <label htmlFor="phone" className="block mb-1 text-sm font-medium text-gray-900">Your Phone No</label>
                            <TextInput id="phone" type='text' value={formData.phone} onChange={getValue} name='phone' placeholder='Enter Your Phone No' required={true} />
                        </div>
                        <div className='py-3'>
                            <label htmlFor="message" className="block mb-1 text-sm font-medium text-gray-900">Your Message</label>
                            <Textarea id="message" name='message' value={formData.message} onChange={getValue} placeholder='Enter Your Message...' required={true} rows={4} />
                        </div>
                        <div className='py-3'>
                            <Button type='submit' className='w-[100%] bg-blue-700'>
                                {formData._id ? 'Update Enquiry' : 'Save Enquiry'}
                            </Button>
                        </div>
                    </form>
                </div>

                <EnquiryList data={enquiryList} getAllEnquiry={getAllEnquiry} Swal={Swal} setFormData={setFormData} />

            </div>
        </div>
    )
}


