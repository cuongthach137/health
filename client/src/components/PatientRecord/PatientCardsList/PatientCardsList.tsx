import "./index.scss";
import { useQuery } from "@apollo/client";
import { useAppSelector } from "app/store";
import React, { useEffect, useState } from "react";
import { GET_PATIENTS_OF_DOCTOR } from "../PatientList/schema";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { BiLinkExternal } from "react-icons/bi";
import Avatar from '../../../assets/default-avatar-patient.png'
import BG from 'assets/abstract12.svg'
import { toast } from "react-toastify";
import Experiment from './Experiment'

const defaultList = [
    {
        age: 18,
        birth: "2004-09-09T17:00:00.000Z",
        fullName: "Nguyễn Kim Anh",
        gender: "Nữ",
        index: 0,
    },
    {
        age: 19,
        birth: "2003-04-02T17:00:00.000Z",
        fullName: "Nguyễn Thế Anh",
        gender: "Nam",
        index: 1,
    },
    {
        age: 18,
        birth: "2004-12-09T17:00:00.000Z",
        fullName: "Nguyễn Thùy Trang",
        gender: "Nữ",
        index: 0,
    },
    {
        age: 32,
        birth: "1990-05-01T17:00:00.000Z",
        fullName: "Nguyễn Thế Anh",
        gender: "Nam",
        index: 1,
    },
    {
        age: 19,
        birth: "2003-04-02T17:00:00.000Z",
        fullName: "Trần Phương Thảo",
        gender: "Nữ",
        index: 1,
    },
    {
        age: 40,
        birth: "1982-05-07T17:00:00.000Z",
        fullName: "Nguyễn Thị Thùy Chi",
        gender: "Nữ",
        index: 0,
    },
    {
        age: 18,
        birth: "2004-09-09T17:00:00.000Z",
        fullName: "Nguyễn Phương Thảo",
        gender: "Nữ",
        index: 0,
    },
    {
        age: 19,
        birth: "2003-04-02T17:00:00.000Z",
        fullName: "Nguyễn Thanh Giang",
        gender: "Nam",
        index: 1,
    },
    {
        age: 18,
        birth: "2004-12-09T17:00:00.000Z",
        fullName: "Nguyễn Thanh Hằng",
        gender: "Nữ",
        index: 0,
    },
    {
        age: 20,
        birth: "2002-05-01T17:00:00.000Z",
        fullName: "Nguyễn Thế Khang",
        gender: "Nam",
        index: 1,
    },
    {
        age: 19,
        birth: "2003-04-02T17:00:00.000Z",
        fullName: "Trần Thanh Phong",
        gender: "Nữ",
        index: 1,
    },
    {
        age: 35,
        birth: "1987-01-09T17:00:00.000Z",
        fullName: "Nguyễn Thị Nữ",
        gender: "Nữ",
        index: 0,
    },

    {
        age: 18,
        birth: "2004-09-09T17:00:00.000Z",
        fullName: "Trần Thị Huyền",
        gender: "Nữ",
        index: 0,
    },
    {
        age: 19,
        birth: "2003-04-02T17:00:00.000Z",
        fullName: "Nguyễn Anh Khoa",
        gender: "Nam",
        index: 1,
    },
    {
        age: 18,
        birth: "2004-12-09T17:00:00.000Z",
        fullName: "Nguyễn Thị Ngọc Ngân",
        gender: "Nữ",
        index: 0,
    },
    {
        age: 20,
        birth: "2002-05-01T17:00:00.000Z",
        fullName: "Nguyễn Kim Anh",
        gender: "Nam",
        index: 1,
    },
    {
        age: 26,
        birth: "1996-04-02T17:00:00.000Z",
        fullName: "Trần Thị Yến",
        gender: "Nữ",
        index: 1,
    },
    {
        age: 18,
        birth: "2004-12-09T17:00:00.000Z",
        fullName: "Nguyễn Thị Nga",
        gender: "Nữ",
        index: 0,
    },













    {
        age: 18,
        birth: "2004-09-09T17:00:00.000Z",
        fullName: "Nguyễn Ái Khanh",
        gender: "Nữ",
        index: 0,
    },
    {
        age: 19,
        birth: "2003-04-02T17:00:00.000Z",
        fullName: "Nguyễn Văn Nam",
        gender: "Nam",
        index: 1,
    },
    {
        age: 18,
        birth: "2004-12-09T17:00:00.000Z",
        fullName: "Trần Thị Kiều Chi",
        gender: "Nữ",
        index: 0,
    },
    {
        age: 20,
        birth: "2002-05-01T17:00:00.000Z",
        fullName: "Nguyễn Văn Toàn",
        gender: "Nam",
        index: 1,
    },
    {
        age: 19,
        birth: "2003-04-02T17:00:00.000Z",
        fullName: "Trần Ánh Vy",
        gender: "Nữ",
        index: 1,
    },
    {
        age: 18,
        birth: "2004-12-09T17:00:00.000Z",
        fullName: "Nguyễn Mai Thu",
        gender: "Nữ",
        index: 0,
    },
    {
        age: 18,
        birth: "2004-09-09T17:00:00.000Z",
        fullName: "Nguyễn Thu Thảo",
        gender: "Nữ",
        index: 0,
    },
    {
        age: 19,
        birth: "2003-04-02T17:00:00.000Z",
        fullName: "Nguyễn Hoàng Phúc",
        gender: "Nam",
        index: 1,
    },
    {
        age: 18,
        birth: "2004-12-09T17:00:00.000Z",
        fullName: "Nguyễn Ngọc Yến",
        gender: "Nữ",
        index: 0,
    },
    {
        age: 20,
        birth: "2002-05-01T17:00:00.000Z",
        fullName: "Nguyễn Duy Anh",
        gender: "Nam",
        index: 1,
    },
    {
        age: 19,
        birth: "2003-04-02T17:00:00.000Z",
        fullName: "Trần Yến Mai",
        gender: "Nữ",
        index: 1,
    },
    {
        age: 18,
        birth: "2004-12-09T17:00:00.000Z",
        fullName: "Nguyễn Thu Hiền",
        gender: "Nữ",
        index: 0,
    },

    {
        age: 18,
        birth: "2004-09-09T17:00:00.000Z",
        fullName: "Trần Huyền Trân",
        gender: "Nữ",
        index: 0,
    },
    {
        age: 19,
        birth: "2003-04-02T17:00:00.000Z",
        fullName: "Nguyễn Khoa Đăng",
        gender: "Nam",
        index: 1,
    },
    {
        age: 18,
        birth: "2004-12-09T17:00:00.000Z",
        fullName: "Nguyễn Thu Hạnh",
        gender: "Nữ",
        index: 0,
    },
    {
        age: 20,
        birth: "2002-05-01T17:00:00.000Z",
        fullName: "Nguyễn Kim Anh",
        gender: "Nam",
        index: 1,
    },
    {
        age: 19,
        birth: "2003-04-02T17:00:00.000Z",
        fullName: "Trần Kim Yến",
        gender: "Nữ",
        index: 1,
    },
    {
        age: 18,
        birth: "2004-12-09T17:00:00.000Z",
        fullName: "Nguyễn Yên Hoa",
        gender: "Nữ",
        index: 0,
    },
    {
        age: 19,
        birth: "2003-04-02T17:00:00.000Z",
        fullName: "Trần Hà Thu",
        gender: "Nữ",
        index: 1,
    },
    {
        age: 18,
        birth: "2004-12-09T17:00:00.000Z",
        fullName: "Nguyễn Hương Thảo",
        gender: "Nữ",
        index: 0,
    },

    {
        age: 19,
        birth: "2003-04-02T17:00:00.000Z",
        fullName: "Trần Yến Mai",
        gender: "Nữ",
        index: 1,
    },
    {
        age: 18,
        birth: "2004-12-09T17:00:00.000Z",
        fullName: "Nguyễn Thu Hiền",
        gender: "Nữ",
        index: 0,
    },

    {
        age: 18,
        birth: "2004-09-09T17:00:00.000Z",
        fullName: "Trần Huyền Trân",
        gender: "Nữ",
        index: 0,
    },
    {
        age: 19,
        birth: "2003-04-02T17:00:00.000Z",
        fullName: "Nguyễn Khoa Đăng",
        gender: "Nam",
        index: 1,
    },
    {
        age: 18,
        birth: "2004-12-09T17:00:00.000Z",
        fullName: "Nguyễn Thu Hạnh",
        gender: "Nữ",
        index: 0,
    },
    {
        age: 20,
        birth: "2002-05-01T17:00:00.000Z",
        fullName: "Nguyễn Kim Anh",
        gender: "Nam",
        index: 1,
    },
    {
        age: 19,
        birth: "2003-04-02T17:00:00.000Z",
        fullName: "Trần Kim Yến",
        gender: "Nữ",
        index: 1,
    },
    {
        age: 18,
        birth: "2004-12-09T17:00:00.000Z",
        fullName: "Nguyễn Yên Hoa",
        gender: "Nữ",
        index: 0,
    },
    {
        age: 19,
        birth: "2003-04-02T17:00:00.000Z",
        fullName: "Trần Hà Thu",
        gender: "Nữ",
        index: 1,
    },
    {
        age: 18,
        birth: "2004-12-09T17:00:00.000Z",
        fullName: "Nguyễn Hương Thảo",
        gender: "Nữ",
        index: 0,
    },

    

]


const PatientCardsList = () => {
    const account = useAppSelector((state) => state.account);
    const { data } = useQuery(GET_PATIENTS_OF_DOCTOR, {
        variables: {
            id: account.id,
        },
    });

    const [patientData, setPatientData] = useState<any>(null);



    useEffect(() => {
        if (data && data.getPatientsOfDoctor) setPatientData(data.getPatientsOfDoctor);
    }, [data]);

    const patientDataArray = React.useMemo(() => {
        if (!patientData) return [];
        let newArray = patientData.concat([]);
        newArray = newArray.map((item: any, index: number) => {
            return { ...item, index }
        })
        newArray = newArray.concat(defaultList)

        return newArray;
    }, [patientData])


    return (
        <div className="patient-card-list-wrapper" >
            <img src={BG} className="doctorRecordBg" alt="" />
            <Experiment/>
            <h1 className="patient-card-list-title">Quản lý bệnh nhân</h1>

            <div className="patientList">
                {patientDataArray &&
                    patientDataArray.map((patient: any, index: number) => (
                        <div className="profile-contentinfo-item-patient" key={patient._id}>
                            <div className="profile-patient-in">
                                <div className="profile-patient-avatar">
                                    <img
                                        src={Avatar}
                                        alt="patient-avatar"
                                    />
                                </div>
                                <div className="profile-patient-text-carry">
                                    <div className="profile-patient-text">Họ và tên:{` ${patient?.fullName} `}</div>
                                    <div className="profile-patient-text">Tuổi:{` ${patient?.age || ""}`}</div>
                                    <div className="profile-patient-text">Ngày sinh:{` ${dayjs(patient?.birth).format("DD/MM/YYYY")}`}</div>
                                    <div className="profile-patient-text">Giới tính:{` ${patient?.gender || ""}`}</div>
                                </div>
                            </div>
                            <Link to={`/patients/${patient.index}`} className="profile-patient-textdetail">
                                <BiLinkExternal />
                            </Link>
                        </div>
                    ))}
            </div>
        </div>
    );
};
export default PatientCardsList;