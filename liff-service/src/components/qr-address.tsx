import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Drawer from '@mui/material/Drawer';
import Icon from '@mui/material/Icon';

import QrScanner from './qr-reader';
import Map from './Map';

import './qr-address.css';

interface QrAddressProps {
    uuid_qr: (result: string) => void;
    address: (result: string) => void;
    loc: (result: { latitude: number, longitude: number } | null) => void;
}

// uuid_qr & address is output to parent component
const QrAddress: React.FC<QrAddressProps> = ({ uuid_qr, address, loc }) => {
    const [uuidQr, setUuid] = useState('');
    const [addr, setAddr] = useState('');
    const [location, setLocation] = useState<{ latitude: number, longitude: number } | null>(null);
    const [state, setState] = useState(false)
    const toggleDrawer = (open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent,
    ) => {
        if (
            event &&
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return
        }
        setState(open)
    }

    const handleScan = (data: any) => {
        if (data) {
            const urlParams = new URLSearchParams(new URL(data).search);
            const uuid = urlParams.get('key') || '';
            uuid_qr(uuid);
            setUuid(uuid);
            setState(false);
        }
    }

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
                address(response.data);
                setAddr(response.data);
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
            loc({
                latitude: latitude,
                longitude: longitude
            });
            getAddress(latitude, longitude);
        }, (error) => {
            console.error(error);
        }, options);
    };



    return (
        <Card>
            <CardContent>
                <React.Fragment key={'bottom'}>
                    <label className="form-label">สแกน QR Code / กรอกรหัสหน่วยงาน</label>
                    <ButtonGroup
                        className='qr-input'
                        variant="contained"
                        aria-label="Basic button group">
                        <TextField
                            id="outlined-basic"
                            label="UUID - QR"
                            variant="outlined"
                            value={uuidQr}
                            onChange={(e) => {
                                setUuid(e.target.value);
                                uuid_qr(e.target.value);
                            }}
                        />
                        <Button
                            variant="contained"
                            style={{ backgroundColor: 'black', color: 'white' }}
                            onClick={toggleDrawer(true)}>
                            <Icon
                                baseClassName="material-symbols-rounded"
                            >
                                qr_code_scanner
                            </Icon>
                        </Button>
                    </ButtonGroup>
                    <Drawer
                        anchor={"bottom"}
                        open={state}
                        onClose={toggleDrawer(false)}
                        className='qr-scanner'
                    >
                        <div className='drawer-qr-header'>
                            <span></span>
                            <h3>QR Code Reader</h3>
                            <Button
                                style={{ color: 'black' }}
                                onClick={toggleDrawer(false)}
                            >
                                <Icon
                                    fontSize='large'
                                    baseClassName="material-symbols-rounded"
                                >
                                    close
                                </Icon>
                            </Button>
                        </div>
                        <QrScanner onScan={handleScan} />
                    </Drawer>
                </React.Fragment>
            </CardContent>
            <CardContent>
                <React.Fragment>
                    <label className="form-label">แชร์ตำแหน่ง</label>
                    <div>
                        <div className="mb-3">
                            {
                                location ? (
                                    <Map location={[location.latitude, location.longitude]} mark={addr || undefined} />
                                ) : (
                                    <Map location={[13.740630, 100.531737]} mark="" />
                                )
                            }
                        </div>
                        {
                            addr ? (
                                <p>{addr}</p>
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
                </React.Fragment>
            </CardContent>
        </Card>
    );
}

export default QrAddress;