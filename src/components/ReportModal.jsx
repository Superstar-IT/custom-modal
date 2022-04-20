import React, { useState } from "react";
import { exportReport } from "../service/http.service";
import notifier from "../service/notifier.service";
import styles from "./ReportModal.module.css"

const ReportModal = ({ open, onClose }) => {
    const initialState = {
        name: '',
        format: 'excel',
        email: '',
        schedule: 'no_repeat',
        date: null,
        time: null,
    }

    const weekDays = [
        { value: 0, label: 'Monday' },
        { value: 1, label: 'Tuesday' },
        { value: 2, label: 'Wednesday' },
        { value: 3, label: 'Thursday' },
        { value: 4, label: 'Friday' },
        { value: 5, label: 'Saturday' },
        { value: 6, label: 'Sunday' },
    ]

    const [reportDetails, setReportDetails] = useState(initialState);

    if(open === false) return null;

    const handleCancel = (e) => {
        e.preventDefault();
        setReportDetails(initialState);
        onClose();
    }

    const handleSave = (e) => {
        e.preventDefault();
        exportReport()
            .then(() => {
                notifier.success("Success to export report");
                setReportDetails(initialState);
                onClose();
            })
            .catch(() => notifier.error("Failed to export report"));
    }

    const handleChange = (e) => {
        const { value, name } = e.target;
        setReportDetails({ ...reportDetails, [name]: value });
    }

    return (
        <div className={styles.centered}>
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <h5 className={styles.heading}>Export Report</h5>
                </div>
                <div className={styles.modalContent}>
                    <div className={styles.field}>
                        <label className={styles.formControlLabel}>Report name</label>
                        <input className={styles.formControl} type="text" name="name" value={reportDetails.name} onChange={handleChange} />
                    </div>
                    <div className={styles.field}>
                        <label className={styles.formControlLabel}>Format</label>
                        <div className={styles.formControl}>
                            <label className={styles.radioBtn}>
                                <input 
                                    type="radio" 
                                    name="format" 
                                    value="excel" 
                                    defaultChecked={reportDetails.format === 'excel'}
                                    onChange={handleChange}
                                />
                                Excel
                            </label>
                            <label className={styles.radioBtn}>
                                <input 
                                    type="radio" 
                                    name="format" 
                                    value="csv" 
                                    defaultChecked={reportDetails.format === 'csv'}
                                    onChange={handleChange}
                                />
                                CSV
                            </label>
                        </div>
                    </div>
                    <div className={styles.field}>
                        <label className={styles.formControlLabel}>E-mail to</label>
                        <input className={styles.formControl} type="email" name="email" value={reportDetails.email} onChange={handleChange} />
                    </div>
                    <div className={styles.field}>
                        <label className={styles.formControlLabel}>Schedule</label>
                        <div className={styles.formControl}>
                            <label className={styles.radioBtn}>
                                <input 
                                    type="radio" 
                                    name="schedule" 
                                    value="no_repeat" 
                                    defaultChecked={reportDetails.schedule === 'no_repeat'} 
                                    onChange={handleChange}
                                />
                                No Repeat
                            </label>
                            <label className={styles.radioBtn}>
                                <input 
                                    type="radio" 
                                    name="schedule" 
                                    value="date" 
                                    defaultChecked={reportDetails.schedule === 'date'} 
                                    onChange={handleChange}
                                />
                                Specific Date
                            </label>
                            <label className={styles.radioBtn}>
                                <input 
                                    type="radio" 
                                    name="schedule" 
                                    value="daily" 
                                    defaultChecked={reportDetails.schedule === 'daily'} 
                                    onChange={handleChange}
                                />
                                Daily
                            </label>
                            <label className={styles.radioBtn} checked={reportDetails.format === 'csv'}>
                                <input 
                                    type="radio" 
                                    name="schedule" 
                                    value="weekly" 
                                    defaultChecked={reportDetails.schedule === 'weekly'} 
                                    onChange={handleChange}
                                />
                                Weekly
                            </label>
                        </div>
                    </div>
                    { reportDetails.schedule === 'date' &&
                        <div className={styles.field}>
                            <label className={styles.formControlLabel}>Date</label>
                            <div className={styles.formControl}>
                                <div>
                                    <input className={styles.timePicker} type="date" name="date" value={reportDetails.date} onChange={handleChange} />
                                </div>
                                <div>
                                    <label>at</label>
                                    <input className={styles.timePicker} type="time" name="time" value={reportDetails.time} onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                    }
                    { reportDetails.schedule === 'daily' &&
                        <div className={styles.field}>
                            <label className={styles.formControlLabel}>Every at</label>
                            <div className={styles.formControl}>
                                <input className={styles.timePicker}  type="time" name="time" value={reportDetails.time} onChange={handleChange} />
                            </div>
                        </div>
                    }
                    { reportDetails.schedule === 'weekly' &&
                        <div className={styles.field}>
                            <label className={styles.formControlLabel}>Every</label>
                            <div className={styles.formControl}>
                                <div>
                                    <select className={styles.timePicker} name="date" value={reportDetails.date} onChange={handleChange}>
                                        <option value={undefined}>Select day</option>
                                        {weekDays.map((weekDay) => (
                                            <option key={weekDay.value} value={weekDay.value}>{weekDay.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label>at</label>
                                    <input className={styles.timePicker} type="time" name="time" value={reportDetails.time} onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <div className={styles.modalActions}>
                <div className={styles.actionsContainer}>
                    <button className={styles.cancelBtn} onClick={handleCancel}>
                        Cancel
                    </button>
                    <button className={styles.saveBtn} onClick={handleSave}>
                        Ok
                    </button>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default ReportModal;