import React from 'react';
import { useForm } from 'react-hook-form';
import style from '../../common/FormsStyle/FormsStyle.module.css';

const ProfileForm = ({ profile, onSubmit }) => {
    const { handleSubmit, register, formState: { errors } } = useForm();

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <button>Save</button>
            </div>
            <div>
                <b>Full name:</b>
                <input {...register('fullName', { required: "Required field" })} defaultValue={profile?.fullName} />
                {errors?.fullName && <span className={style.error}>{errors?.fullName?.message || "Error!"}</span>}

            </div>

            <div>
                <b>Looking for a job:</b>
                <input
                    {...register('lookingForAJob')}
                    type="checkbox"
                    defaultChecked={profile?.lookingForAJob}
                />
            </div>
            <div>
                <b>My professional skills:</b>
                <textarea
                    {...register('lookingForAJobDescription', { required: "Required field" })}
                    defaultValue={profile?.lookingForAJobDescription}
                />
                {errors?.lookingForAJobDescription && <span className={style.error}>{errors?.lookingForAJobDescription?.message || "Error!"}</span>}
            </div>
            <div>
                <b>About me:</b>
                <textarea {...register('aboutMe', { required: "Required field" })} defaultValue={profile?.aboutMe} />
                {errors?.aboutMe && <span className={style.error}>{errors?.aboutMe?.message || "Error!"}</span>}

            </div>
            <div>
                <b>Contacts:</b>
                {Object.keys(profile.contacts).map((key) => (
                    <div key={key} className={style.contact}>
                        <b>{key}:</b>
                        <input {...register(`contacts.${key}`)} defaultValue={profile?.contacts[key]} />
                    </div>
                ))}
            </div>
        </form>
    );
};

export default ProfileForm;
