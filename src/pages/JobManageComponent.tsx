import { useEffect, useState } from "react";
import { Job } from "../models/Job";
import { useDispatch, useSelector } from "react-redux";
import { JobRootState } from "../app/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash, faMagnifyingGlass  } from "@fortawesome/free-solid-svg-icons";
import {useForm} from 'react-hook-form'
import { JobStatus } from "../enums/JobStatus";
import { RequestFilter } from "../app/types/job.type";
import { FilterJobs } from "../app/slices/jobs.slice";

interface valueForm {
    id?: number
    jobType?: string
    status?: string
}

function JobManageComponent() {
    const dispatch = useDispatch()
    const [job, setjob] = useState<Job[]>([]);
    const listJobs = useSelector((state: JobRootState) => state.listJobs.data?.data);
    console.log('listJobs', listJobs)

    const {register, handleSubmit, formState: {errors}} = useForm<valueForm>();

    const onsubmit = (data: valueForm) => {
        const dispatchParam: RequestFilter = {
            id: data.id,
            jobType: data.jobType,
            status: data.status
        }
        dispatch(FilterJobs(dispatchParam));
    }

    useEffect(() => {
        if (Array.isArray(listJobs)) {
            setjob(listJobs);
        }
    }, [listJobs])

    return ( 
        <div className='main_content'>
            <div className="filter_group">
                <form onSubmit={handleSubmit(onsubmit)}>
                    <input {...register('id', {
                        validate: (value) => !value || !isNaN(Number(value)) || 'Must be a number'
                    })} placeholder='Enter job id to search' />
                    {errors.id && <p style={{color: 'red'}}>{errors.id.message}</p>}

                    <input {...register('jobType')} placeholder='Enter job type to search'/>
                    <select {...register('status')}>
                        <option value="">---Select Status----</option>
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
                                <button className="btn btn-primary">
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
        </div>
     );
}

export default JobManageComponent;