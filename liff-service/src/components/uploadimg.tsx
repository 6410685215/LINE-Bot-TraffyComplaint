import React, { useRef, useEffect, useState, ChangeEvent } from "react";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';

interface uploadImgProps {
    img: (result: File | null) => void;
}
const uploadImg: React.FC<uploadImgProps> = ({ img }) => {
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
    const fileInput = useRef<HTMLInputElement>(null);

    const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
            img(file);
        }
    };

    const handleUpload = () => {
        fileInput.current?.click();
    };

    return (
        <Card>
            <CardContent>
            <InputLabel>อัพโหลดรูปภาพ</InputLabel>
            <div className="box-image mb-3"
                onClick={() => fileInput.current?.click()}>
                {
                    image ? (
                        <img src={URL.createObjectURL(image)} alt="upload" />
                    ) : (
                        <span className="material-symbols-rounded">add_photo_alternate</span>
                    )
                }
            </div>
            <input
                type="file"
                accept="image/*"
                ref={fileInput}
                style={{ display: "none" }}
                onChange={handleFile}
            />
            <div className="d-flex justify-content-end">
            <Button
                variant="contained"
                onClick={handleUpload}
            >
                อัพโหลดรูปภาพ
            </Button>
            </div>
            </CardContent>
        </Card>
    );
}

export default uploadImg;