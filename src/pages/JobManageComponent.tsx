import { useEffect, useState } from "react";
import { Job } from "../models/Job";
import { useDispatch, useSelector } from "react-redux";
import { JobRootState } from "../app/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash, faMagnifyingGlass  } from "@fortawesome/free-solid-svg-icons";
import {useForm} from 'react-hook-form'
import { JobStatus } from "../enums/JobStatus";
import { RequestFilter } from "../app/types/job.type";
import { FilterJobs, GetListJobs } from "../app/slices/jobs.slice";
import { Pagination } from "react-bootstrap";
import CreateNewJob from "./popupScreen/CreateNewJob";

interface valueForm {
    id?: number
    jobType?: string
    status?: string
}

function JobManageComponent() {
    const dispatch = useDispatch()
    const [job, setjob] = useState<Job[]>([]);
    
    const [page, setPage] = useState(1);
    const [jobType, setJobType] = useState('');
    const [status, setStatus] = useState('');
    const [showModal, setShowModal] = useState(false);
    var listJobs = useSelector((state: JobRootState) => state.listJobs.data?.data);
    console.log('listJobs', listJobs);
    var page_number = useSelector((state: JobRootState) => state.listJobs.data?.meta);

    const pageNumbers = [];
    const totalPages = page_number?.totalPages ?? 1;
    let active = page_number?.currentPage;
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
            <Pagination.Item key={i} active={i === active} onClick={() => setPage(Number(i))}>{i}</Pagination.Item>
        );
    }

    const {register, handleSubmit, formState: {errors}} = useForm<RequestFilter>();
    
    const onsubmit = (data: RequestFilter) => {
        setJobType(data.jobType ?? '');
        setStatus(data.status ?? '');
    }

    useEffect(() => {
        dispatch(GetListJobs({jobType, status, page}))
    }, [jobType, status, page]);

    useEffect(() => {
        if (Array.isArray(listJobs)) {
            setjob(listJobs);
        }
    }, [listJobs]);

    // useEffect(() => {
    //     <CreateNewJob show={showModal} onClose={() => {
    //         setShowModal(false);
    //     }} />
    // }, [showModal]);

    return ( 
        <div className='main_content'>
            <div className="filter_group">
                <form onSubmit={handleSubmit(onsubmit)}>
                    <input {...register('id', {
                        validate: (value) => !value || !isNaN(Number(value)) || 'Must be a number'
                    })} placeholder='Enter job id to search' />
                    {errors.id && <span style={{color: 'red'}}>{errors.id.message}</span>}

                    <input {...register('jobType')} placeholder='Enter job type to search'/>
                    <select {...register('status')}>
                        <option value="">----STATUS----</option>
                        {Object.entries(JobStatus).map(([key, value]) => (
                            <option value={value} key={key}>{key}</option>
                        ))}
                    </select>
                    <button type='submit' className="btn_filter">
                        <FontAwesomeIcon icon={faMagnifyingGlass} /> search
                    </button>
                </form>
            </div>
            <div className="job_manage_component">
                <table className="table table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Requirements</th>
                            <th>Location</th>
                            <th>Job Type</th>
                            <th> Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {job.map((lj) =>
                            <tr key={lj.id}>
                            <th scope="row">{lj.id}</th>
                            <td>{lj.title}</td>
                            <td>${lj.minSalary} - ${lj.maxSalary}</td>
                            <td>{lj.location}</td>
                            <td>{lj.jobType}</td>
                            <td>{lj.status}</td>
                            <td className="btn-col">
                                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </button>
                                <button className="btn btn-danger">
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </td>

                        </tr>
                        )}
                        
                    </tbody>
                </table>
            </div>
            <div className="pagingnation">
                <Pagination size='sm'>{pageNumbers}</Pagination>
            </div>

            {showModal && (
                <CreateNewJob
                    show={showModal}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
     );
}

export default JobManageComponent;