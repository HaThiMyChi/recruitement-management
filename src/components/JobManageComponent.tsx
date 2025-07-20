function JobManageComponent() {
    return ( 
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
                    <tr>
                        <th scope="row">1</th>
                        <td>Title</td>
                        <td>Requirements</td>
                        <td>Location</td>
                        <td>Job Type</td>
                        <td>Status</td>
                        <td className="btn-col">
                            <button className="btn btn-primary">delete</button>
                            <button className="btn btn-danger">update</button>
                        </td>

                    </tr>
                </tbody>
            </table>
        </div>
     );
}

export default JobManageComponent;