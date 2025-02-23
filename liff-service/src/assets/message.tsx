import { LiffMessage } from '@liff/send-messages/lib/type';

const flexMessage = (): LiffMessage[]  => {
    return [{
        type: 'flex',
        altText: 'Flex Message',
        contents: {
            "type": "bubble",
            "size": "kilo",
            "header": {
                "type": "box",
                "layout": "vertical",
                "contents": [
                    {
                        "type": "box",
                        "layout": "horizontal",
                        "contents": [
                            {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [
                                    {
                                        "type": "image",
                                        "url": "https://cdn-icons-png.flaticon.com/512/18604/18604789.png",
                                        "size": "full",
                                        "gravity": "center",
                                        "align": "center",
                                        "aspectMode": "cover"
                                    }
                                ],
                                "cornerRadius": "none",
                                "flex": 3,
                                "justifyContent": "center"
                            },
                            {
                                "type": "filler",
                                "flex": 1
                            },
                            {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [
                                    {
                                        "type": "text",
                                        "text": "ยืนยันการแจ้งเข้าระบบ",
                                        "color": "#000000",
                                        "size": "lg",
                                        "flex": 4,
                                        "weight": "bold"
                                    },
                                    {
                                        "type": "separator",
                                        "color": "#000000"
                                    },
                                    {
                                        "type": "text",
                                        "text": "รอหน่วยงานรับเรื่อง",
                                        "color": "#0e0e0e",
                                        "margin": "4px",
                                        "size": "xs"
                                    }
                                ],
                                "flex": 15
                            }
                        ],
                        "alignItems": "center",
                        "justifyContent": "space-between"
                    }
                ],
                "paddingAll": "12px",
                "spacing": "md",
                "paddingTop": "16px",
                "alignItems": "center",
                "justifyContent": "flex-start",
                "backgroundColor": "#FF5E5E",
                "paddingBottom": "16px"
            },
            "hero": {
                "type": "box",
                "layout": "vertical",
                "contents": [
                    {
                        "type": "image",
                        // ! Change the image URL here
                        "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
                        "size": "full",
                        "aspectMode": "cover"
                    }
                ],
                "height": "145px",
                "justifyContent": "center"
            },
            "body": {
                "type": "box",
                "layout": "vertical",
                "contents": [
                    {
                        "type": "text",
                        // ! Change the text here
                        "text": "dd/mm/yyyy HH:MM",
                        "color": "#b7b7b7",
                        "size": "xs",
                        "align": "start"
                    },
                    {
                        "type": "separator"
                    },
                    {
                        "type": "box",
                        "layout": "horizontal",
                        "contents": [
                            {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [
                                    {
                                        "type": "text",
                                        "align": "end",
                                        "text": "รหัส",
                                        "size": "sm"
                                    },
                                    {
                                        "type": "text",
                                        "text": "ประเภท",
                                        "align": "end",
                                        "size": "sm"
                                    },
                                    {
                                        "type": "text",
                                        "text": "หน่วยงาน",
                                        "align": "end",
                                        "size": "sm"
                                    }
                                ],
                                "flex": 2
                            },
                            {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [
                                    {
                                        "type": "box",
                                        "layout": "horizontal",
                                        "contents": [
                                            {
                                                "type": "filler"
                                            },
                                            {
                                                "type": "box",
                                                "layout": "vertical",
                                                "contents": [],
                                                "width": "2px",
                                                "backgroundColor": "#B7B7B7",
                                                "cornerRadius": "md"
                                            },
                                            {
                                                "type": "filler"
                                            }
                                        ],
                                        "flex": 1
                                    }
                                ],
                                "width": "12px"
                            },
                            {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [
                                    {
                                        "type": "text",
                                        // ! Change the text here
                                        "text": "2025-XXXXXX",
                                        "size": "sm"
                                    },
                                    {
                                        "type": "text",
                                        // ! Change the text here
                                        "text": "ถังดับเพลิง/ประปาหัวแดง",
                                        "size": "sm"
                                    },
                                    {
                                        "type": "text",
                                        // ! Change the text here
                                        "text": "ฝ่ายเทศกิจ เขตสาทร",
                                        "size": "sm"
                                    }
                                ],
                                "flex": 6,
                                "offsetStart": "5px"
                            }
                        ],
                        "paddingTop": "5px",
                        "paddingBottom": "5px"
                    },
                    {
                        "type": "separator"
                    },
                    {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                            {
                                "type": "text",
                                "text": "รายละเอียด",
                                "size": "sm"
                            },
                            {
                                "type": "text",
                                // ! Change the text here
                                "text": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
                                "size": "sm",
                                "wrap": true
                            }
                        ],
                        "paddingTop": "5px",
                        "paddingBottom": "5px"
                    },
                    {
                        "type": "separator"
                    },
                    {
                        "type": "box",
                        "layout": "horizontal",
                        "contents": [
                            {
                                "type": "text",
                                // ! Change the text here
                                "text": "HH:MM",
                                "size": "md",
                                "gravity": "center",
                                "align": "center"
                            },
                            {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [
                                    {
                                        "type": "filler"
                                    },
                                    {
                                        "type": "box",
                                        "layout": "vertical",
                                        "contents": [],
                                        "cornerRadius": "30px",
                                        "height": "12px",
                                        "width": "12px",
                                        "borderColor": "#EF454D",
                                        "borderWidth": "2px"
                                    },
                                    {
                                        "type": "filler"
                                    }
                                ],
                                "flex": 0
                            },
                            {
                                "type": "text",
                                // ! Change the text here
                                "text": "รอรับเรื่อง",
                                "gravity": "center",
                                "flex": 2,
                                "size": "lg",
                                "color": "#EF454D",
                                "weight": "bold",
                                "style": "normal",
                                "margin": "xxl"
                            }
                        ],
                        "spacing": "lg",
                        "cornerRadius": "30px",
                        "margin": "xl"
                    }
                ]
            }
        }
    }]
}

export default flexMessage;