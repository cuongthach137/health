import "./index.scss";

import { useState } from "react";
import { useAppSelector } from "app/store";

import { InfoTable } from "../PatientList/TableInfo/Table";

import ThresholdStats from "../PatientList/ThresholdStats";

import thermo from "../../../assets/themo.png";
import heart from "../../../assets/heart.png";
import spo2 from "../../../assets/spo2.jpg";
import Chart from "../PatientList/Chart/Chart";
import blood from "../../../assets/blood.png";

import Exercises from "../PatientList/Exercises";
import usePromise from "utils/usePromise";
import { Tabs } from "antd";
import MedicineSchedule from "components/Profile/MedicineSchedule";
import AppointmentSchedule from "../PatientList/AppointmentSchedule";
const { TabPane } = Tabs;

const PatientRecord = () => {
  const account = useAppSelector((state) => state.account);
  const [patientData] = usePromise(`/user/${account.id}`);

  const deviceData: any = {};

  const [thresholdStatus, setThresholdStatus] = useState({
    spO2: false,
    heartRate: false,
    bodyTemp: false,
    bloodPress: false,
  });

  const handleChangeThresholdStatus = (key: string, status: boolean) => {
    setThresholdStatus((prev) => {
      return {
        ...prev,
        [key]: status,
      };
    });
  };
  return (
    <div className="patient-wrapper">
      <div className="patient-choose"></div>
      {patientData && (
        <div className="patient-info-container">
          <Tabs type="card">
            <TabPane tab="Thông tin" key="profile">
              <div className="patient-info-title">Hồ sơ bệnh nhân</div>
              <div className="patient-info-detail">
                <InfoTable data={patientData} />
              </div>
            </TabPane>
            <TabPane tab="Bài tập" key="exercise">
              <div className="patient-info-Exercises">
                <Exercises data={patientData} role="patient" />
              </div>
            </TabPane>
            <TabPane tab="Lịch thuốc" key="medicine">
              <div className="patient-info-medicine">
                <MedicineSchedule patientAccountId={patientData.id} />
              </div>
            </TabPane>
            <TabPane tab="Stats1" key="stat_1">
              <div className="patient-info-stats">
                <ThresholdStats id={patientData._id} data={deviceData?.getDevice?.SpO2Threshold} status={thresholdStatus.spO2} unit="%" icon={spo2} name="SpO2" color="royalblue" />
                <ThresholdStats
                  id={patientData._id}
                  data={deviceData?.getDevice?.heartRateThreshold}
                  status={thresholdStatus.heartRate}
                  unit="bpm"
                  icon={heart}
                  name="Nhịp tim"
                  color="mediumseagreen"
                />
                <ThresholdStats
                  id={patientData._id}
                  data={deviceData?.getDevice?.bodyTempThreshold}
                  status={thresholdStatus.bodyTemp}
                  unit="°C"
                  icon={thermo}
                  name="Nhiệt độ"
                  color="brown"
                />
                <ThresholdStats id={patientData._id} data={deviceData?.getDevice} status={thresholdStatus.bloodPress} unit="bpm" icon={blood} name="Huyết áp cao" color="#ff668f" />
                <ThresholdStats
                  id={patientData._id}
                  data={deviceData?.getDevice}
                  status={thresholdStatus.bloodPress}
                  unit="bpm"
                  icon={blood}
                  name="Huyết áp thấp"
                  color="#ff668f"
                />
              </div>
            </TabPane>
            <TabPane tab="Chỉ số" key="chart">
              <Chart id={account.roleId} thresholdStatus={handleChangeThresholdStatus} />
            </TabPane>
            <TabPane tab="Lịch hẹn" key="apppointment">
              <AppointmentSchedule id={patientData.id} />
            </TabPane>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default PatientRecord;
