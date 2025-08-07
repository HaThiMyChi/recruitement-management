import { useForm } from "react-hook-form";
import styles from './CreateNewJob.module.css';

interface NewJobInfor {
    title: string,
    location: string,
    jobType: string,
    minSalary: number,
    maxSalary: number,
    status: string
}

interface ShowModal {
    show: boolean,
    onClose: () => void;
}

const CreateNewJob: React.FC<ShowModal> = (props: ShowModal) => {
    const {register, handleSubmit, formState: {errors}} = useForm<NewJobInfor>();

    if (!props.show) {
        return null;
    }

    console.log(`vao cau roi ${props.show}`);
    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2>test modal</h2>
                <button onClick={props.onClose} className={styles.btnClose}>Close</button>
            </div>
        </div>
    )
}

export default CreateNewJob;