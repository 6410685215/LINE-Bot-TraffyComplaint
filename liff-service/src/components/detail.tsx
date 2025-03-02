import React, { useRef, useEffect, useState, ChangeEvent } from "react";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';

import informTypes from "../assets/variables";

interface DetailProps {
    informtypes: (result: string) => void;
    description: (result: string) => void;
}

const Detail: React.FC<DetailProps> = ({ informtypes, description }) => {
    const [type, setType] = useState('');
    const [desc, setDesc] = useState('');

    const handleType = (event: SelectChangeEvent) => {
        setType(event.target.value);
        informtypes(event.target.value);
    }

    const handleDesc = (event: ChangeEvent<HTMLInputElement>) => {
        setDesc(event.target.value);
        description(event.target.value);
    }

    return (
        <Card>
            <CardContent>
                <FormControl fullWidth>
                    <InputLabel id="type">ประเภทเรื่อง</InputLabel>
                    <Select
                        labelId="type"
                        id="type"
                        value={type}
                        label="ประเภทเรื่อง"
                        onChange={handleType}
                    >
                        {informTypes.map((type, index) => (
                            <MenuItem key={index} value={type}>{type}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </CardContent>
            <CardContent>
                <FormControl fullWidth>
                    <TextField
                        id="description"
                        label="รายละเอียด"
                        multiline
                        rows={4}
                        value={desc}
                        onChange={handleDesc}
                    />
                </FormControl>
            </CardContent>
        </Card>
    );
}

export default Detail;