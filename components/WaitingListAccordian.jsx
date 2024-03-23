'use client';
import axios from "axios";
import React, { useState } from "react";

const WaitingListAccordion = ({ title, items }) => {
    const [accordionOpen, setAccordionOpen] = useState(false);

    const handleDelete = (waitinglistId) => {
        axios.delete("http://localhost:9091/waitinglist/removewaitinglist/" + waitinglistId).then((response) => {
            if(response.status){
                alert("Waiting list has been deleted successfully");
                window.location.reload(true);
            };
        }
        );
    }
    
    const handleApprove = (waitinglistId) => {
        axios.put("http://localhost:9091/waitinglist/approvewaitinglist/" + waitinglistId).then((response) => {
            if(response.status){
                alert("Waiting list has been Approved successfully");
                window.location.reload(true);
            };
        }
        );
    }

    return (
        <div className="py-4">
            <button
                onClick={() => setAccordionOpen(!accordionOpen)}
                className="flex items-center justify-center gap-2 w-full py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors duration-150 ease-in-out"
            >
                <span>{accordionOpen ? 'Hide' : 'View'}</span>
                <svg
                    className={`fill-current transition-transform duration-200 ${accordionOpen ? 'rotate-45' : ''}`}
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect x="3" y="9" width="14" height="2" rx="1" />
                    {!accordionOpen && <rect x="9" y="3" width="2" height="14" rx="1" />}
                </svg>
            </button>
            <div
                className={`mt-4 overflow-hidden transition-all duration-300 ease-in-out ${accordionOpen ? 'max-h-screen' : 'max-h-0'
                    }`}
            >
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Client Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Telnum
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Schedule Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {items.map((elem, index) => {
                            const { client, booking: { schedule } } = elem;
                            return (
                                <tr key={index} className="">
                                    <td key={index + 1} className="px-6 py-4 whitespace-nowrap">
                                        {client.clientName}
                                    </td>
                                    <td key={index + 2} className="px-6 py-4 whitespace-nowrap">
                                        {client.email}
                                    </td>
                                    <td key={index + 3} className="px-6 py-4 whitespace-nowrap">
                                        {client.telnum}
                                    </td>
                                    <td key={index + 4} className="px-6 py-4 whitespace-nowrap">
                                        {schedule.date}
                                    </td>
                                    <td key={index + 5} className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                                        <button key={index+ 6} className="text-green-600 hover:text-green-900" onClick={() => handleApprove(elem.id)}>Approve</button>
                                        <button key={index+ 7} className="ml-4 text-red-600 hover:text-red-900" onClick={() => handleDelete(elem.id)}>Decline</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WaitingListAccordion;
