import { useState } from "react";
import { Job } from "../models/Job";
import { useDispatch, useSelector } from "react-redux";
import { JobRootState } from "../app/store";

function JobManageComponent() {
    const [job, setjob] = useState<Job[]>([]);
    const listJobs = useSelector((state: JobRootState) => state.listJobs);
    setjob(listJobs.data);

    console.log('listJobs', listJobs.data)
    return ( 
        <div className='main_content'>
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
                            <td>{lj.requirements}</td>
                            <td>{lj.location}</td>
                            <td>{lj.jobType}</td>
                            <td>{lj.status}</td>
                            <td className="btn-col">
                                <button className="btn btn-primary">delete</button>
                                <button className="btn btn-danger">update</button>
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