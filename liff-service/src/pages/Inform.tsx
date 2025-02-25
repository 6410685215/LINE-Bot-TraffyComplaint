import { useRef, useEffect, useState, ChangeEvent } from "react";
import liff from "@line/liff";
import axios from "axios";

import Map from "../components/Map";

import megaPhoneIcon from "/liff-icons/megaphone.svg";
import informTypes from "../assets/variables";
import flexMessage from "../assets/message";

export default function Inform() {

    useEffect(() => {
        const initLoading = document.getElementById('init-loading');
            initLoading?.remove();
    }, []);

    const [userName, setUserName] = useState("");
    useEffect(() => {
        const getProfile = async () => {
            const profile = await liff.getProfile();
            setUserName(profile.displayName);
        };
        getProfile();
    }, []);

    const [groupID, setGroupID] = useState("");
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        setGroupID(urlParams.get('groupId') || "");
    }, []);

    const [uuid, setUuid] = useState("");
    const handleScanQR = async () => {
        const result = await liff.scanCodeV2();
        if (result.value) {
            const urlParams = new URLSearchParams(new URL(result.value).search);
            setUuid(urlParams.get('key') || "");
        }
    };

    const [location, setLocation] = useState<{ latitude: number, longitude: number } | null>(null);
    const [address, setAddress] = useState(null);
    const handleGetLocation = async () => {
        if (!navigator.geolocation) {
            alert("ไม่สามารถใช้งาน GPS บนอุปกรณ์ของคุณได้");
            return;
        }

        interface GetAddressOptions {
            method: string;
            url: string;
            params: {
                lat: number;
                lon: number;
                lang: string;
                mode: string;
                format: string;
            };
            headers: {
                'x-rapidapi-key': string;
                'x-rapidapi-host': string;
            };
        }

        const getAddress = async (latitude: number, longitude: number): Promise<void> => {
            const options: GetAddressOptions = {
                method: 'GET',
                url: 'https://feroeg-reverse-geocoding.p.rapidapi.com/address',
                params: {
                    lat: latitude,
                    lon: longitude,
                    lang: 'th',
                    mode: 'text',
                    format: "'[SN[, ] - [23456789ab[, ]'"
                },
                headers: {
                    'x-rapidapi-key': import.meta.env.VITE_RAPID_API_KEY,
                    'x-rapidapi-host': 'feroeg-reverse-geocoding.p.rapidapi.com'
                }
            };

            try {
                const response = await axios.request(options);
                setAddress(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        // configure geolocation
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        // get location
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setLocation({
                latitude: latitude,
                longitude: longitude
            });
            getAddress(latitude, longitude);
        }, (error) => {
            console.error(error);
        }, options);
    };

    const [informType, setInformType] = useState("");
    const [description, setDescription] = useState("");

    const [image, setImage] = useState<File | null>(null);
    const imageInput = useRef<HTMLInputElement>(null);
    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file?.type.startsWith("image/")) {
            setImage(file);
        } else {
            alert("ไฟล์ที่เลือกไม่ใช่รูปภาพ");
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("uuid_qr", uuid);
        formData.append("address", address || "");
        formData.append("inform_type", informType);
        formData.append("description", description);
        formData.append("image", image as Blob);
        formData.append("user_name", userName);
        formData.append("group_id", groupID);

        try {
            // const response = await axios.post(`${import.meta.env.VITE_ฺBACKEND_URL}/inform`, formData, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data'
            //     }
            // });
            // console.log(response.data);
            alert("uuid_qr: " + uuid + "\n" +
                "address: " + address + "\n" +
                "inform_type: " + informType + "\n" +
                "description: " + description + "\n" +
                "user_name: " + userName + "\n" +
                "group_id: " + groupID);
            liff.sendMessages(flexMessage());
            alert("ส่งข้อมูลเรียบร้อยแล้ว");
            liff.closeWindow();
        } catch (error) {
            console.error(error);
            alert(error);
        }
    };

    return (
        <div className="inform-container" id="status-ok">
            {/* Header */}
            <div className="card m-3 bg-dark text-white">
                <div className="card-body d-flex align-items-center">
                    <img src={megaPhoneIcon} alt="Icon megaphone" />
                    <h1 className="ms-3 mb-0">
                        แจ้งเรื่องใหม่
                    </h1>
                </div>
            </div>

            {/* Form */}
            <form
                className="m-3"
                onSubmit={handleSubmit}>

                {/* QRcode & Address */}
                <div className="card mb-3">
                    <div className="card-body">
                        {/* input uuid_qr */}
                        <label className="form-label">สแกน QR Code / กรอกรหัสหน่วยงาน</label>
                        <div className="input-group">
                            <input className="form-control me-2"
                                type="text"
                                value={uuid}
                                onChange={(e) => setUuid(e.target.value)} />
                            <button className="btn btn-dark d-flex align-items-center"
                                type="button"
                                onClick={handleScanQR}>
                                <span className="material-symbols-rounded">qr_code_scanner</span>
                            </button>
                        </div>
                        <br />
                        {/* input address */}
                        <label className="form-label">แชร์ตำแหน่ง</label>
                        <div>
                            <div className="mb-3">
                                {
                                    location ? (
                                        <Map location={[location.latitude, location.longitude]} mark={address || undefined} />
                                    ) : (
                                        <Map location={[13.740630, 100.531737]} mark="" />
                                    )
                                }
                            </div>
                            {
                                address ? (
                                    <p>{address}</p>
                                ) : (
                                    <p>* กรุณาแชร์ตำแหน่ง</p>
                                )
                            }
                            <div className="d-flex justify-content-end">
                                <button className="btn btn-danger d-flex px-4"
                                    type="button"
                                    onClick={handleGetLocation}>
                                    แชร์ตำแหน่ง
                                    <span className="material-symbols-rounded ms-1">share_location</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Detail */}
                <div className="card mb-3">
                    <div className="card-body">
                        {/* selection type */}
                        <label className="form-label">ประเภทเรื่อง</label>
                        <div className="input-group">
                            <select className="form-select"
                                value={informType}
                                onChange={(e) => setInformType(e.target.value)}>
                                <option value="">เลือกประเภทเรื่องแจ้ง</option>
                                {informTypes.map((type) => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                        <br />
                        {/* input detail */}
                        <label className="form-label">รายละเอียด</label>
                        <div className="input-group">
                            <textarea className="form-control"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)} />
                        </div>
                    </div>
                </div>

                {/* Import Image */}
                <div className="card mb-3">
                    <div className="card-body">
                        <label className="form-label">อัปโหลดรูปภาพ</label>
                        <div className="box-image mb-3"
                            onClick={() => imageInput.current && imageInput.current.click()}>
                            {
                                image ? (
                                    <img src={URL.createObjectURL(image)} alt="upload" />
                                ) : (
                                    <span className="material-symbols-rounded">add_photo_alternate</span>
                                )
                            }
                        </div>
                        <input className="form-control"
                            ref={imageInput}
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload} />
                    </div>
                </div>

                {/* Submit */}
                <div className="btn-group d-flex"
                    role="group"
                    aria-label="Basic example">
                    <button className="btn btn-outline-secondary me-2"
                        type="button"
                        onClick={liff.closeWindow}>
                        ยกเลิก
                    </button>
                    <button className="btn btn-success"
                        type="submit">ส่งข้อมูล
                    </button>
                </div>
            </form >
        </div >
    )
}