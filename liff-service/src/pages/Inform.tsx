import React, 
{   useRef, 
    useEffect, 
    useState, 
    ChangeEvent } from "react";
import axios from "axios";
import liff from "@line/liff";

import QrAddress from "../components/qr-address";
import Details from "../components/detail";
import UploadImg from "../components/uploadimg";

import flexMessage from "../assets/message";
import megaPhoneIcon from "/liff-icons/megaphone.svg";

export default function Inform() {
    const [uuid_qr, setUuid_qr] = useState('');
    const [address, setAddress] = useState('');
    const [location, setLocation] = useState<{ latitude: number, longitude: number } | null>(null);
    const [type, setType] = useState('');
    const [desc, setDesc] = useState('');
    const [img, setImg] = useState<File | null>(null);

    const [displayName, setDisplayName] = useState('');
    const [groupID, setGroupID] = useState('');

    useEffect(() => {
        const getDisplayname = async () => {
            const profile = await liff.getProfile();
            const displayName = profile.displayName;
            setDisplayName(displayName);
        }
        const getGroupID = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const groupID = urlParams.get('groupId') || '';
            setGroupID(groupID);
        }
        getGroupID();
        getDisplayname();
    }
    , []);

    useEffect(() => {
        const initLoading = document.getElementById('init-loading');
            initLoading?.remove();
    }, []);

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append("uuid_qr", uuid_qr);
        formData.append("address", address);
        formData.append("latitude", location?.latitude.toString() || '');
        formData.append("longitude", location?.longitude.toString() || '');
        formData.append("inform_type", type);
        formData.append("description", desc);
        formData.append("display_name", displayName);
        formData.append("group_id", groupID);
        if (img) {
            formData.append("image", img);
        }

        const postInform = async () => {
            try {
                // await axios.post("https://ff-api.majiro.dev/inform", formData, {
                //     headers: {
                //         "Content-Type": "multipart/form-data",
                //     },
                // });
                alert("ส่งข้อมูลเรียบร้อย");
                await liff.sendMessages(flexMessage());
                liff.closeWindow();
            } catch (e) {
                alert("เกิดข้อผิดพลาดในการส่งข้อมูล");
            }
        }
        postInform();
    }

    const closeWindow = () => {
        window.close();
    }

    return (
        <>
        {/* Header */}
        <div className="card m-3 bg-dark text-white"
            style={{ boxShadow: "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)"}}>
                <div className="card-body d-flex align-items-center">
                    <img src={megaPhoneIcon} alt="Icon megaphone" />
                    <h1 className="ms-3 mb-0">
                        แจ้งเรื่องใหม่
                    </h1>
                </div>
            </div>
        <div className="m-3">
            <QrAddress 
                uuid_qr={setUuid_qr} 
                address={setAddress}
                loc={setLocation} />
        </div>
        <div className="m-3">
            <Details
                informtypes={setType}
                description={setDesc}/>
        </div>
        <div className="m-3">
            <UploadImg img={setImg} />
        </div>
        <div className="btn-group d-flex m-3"
            role="group"
            aria-label="Basic example">
            <button 
                className="btn btn-outline-secondary me-2"
                type="button"
                onClick={closeWindow}>
                    ยกเลิก
            </button>
            <button 
                className="btn btn-success"
                type="submit"
                onClick={handleSubmit}>
                    ส่งข้อมูล
            </button>
        </div>
        </>
    );
}
