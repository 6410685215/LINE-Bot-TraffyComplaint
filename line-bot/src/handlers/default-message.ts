import { 
    webhook,
    TextMessage 
} from "@line/bot-sdk";

export const defaultMessage = (event: webhook.Event): TextMessage => {
    let LIFF_URL = process.env.LIFF_URL || '';
    let GROUP_ID = (event.source?.type === 'group' ? event.source.groupId : '') || '';
    let PUBLIC_URL = process.env.PUBLIC_URL || '';

    return {
        type: 'text',
        text: "สวัสดีจ้า! 🙏✨ Traffy Fondue พร้อมช่วยแล้ว 🚀 บอกมาเลยว่าอยากให้ช่วยอะไร เดี๋ยวจัดการให้!",
        quickReply: {
            items: [
                {
                    type: 'action',
                    imageUrl: `${PUBLIC_URL}/quickreply-icons/megaphone.png`,
                    action: {
                        type: 'uri',
                        label: 'แจ้งเรื่อง',
                        uri: `${LIFF_URL}/inform?groupId=${GROUP_ID}`
                    }
                },
                {
                    type: 'action',
                    action: {
                        type: 'uri',
                        label: 'ตรวจสอบสถานะ',
                        uri: `${LIFF_URL}/ff/status?groupId=${GROUP_ID}`
                    }
                }
            ]
        }
    }
}