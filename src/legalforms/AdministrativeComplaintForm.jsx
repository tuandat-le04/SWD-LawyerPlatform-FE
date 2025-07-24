import React from "react";

export default function AdministrativeComplaintForm() {
    return (
        <div className="bg-white p-6 rounded shadow text-blue-900" style={{ fontFamily: 'Times New Roman, serif' }}>
            <div className="text-center font-bold text-lg mb-2">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
            <div className="text-center mb-2">Độc lập - Tự do - Hạnh phúc</div>
            <div className="text-center mb-2">&nbsp;</div>
            <div className="text-center font-bold text-xl mb-2">ĐƠN KHIẾU NẠI</div>
            <div className="text-center mb-2">(Về việc ……… )</div>
            <div className="mb-2">Kính gửi: … (Tên cơ quan, tổ chức có thẩm quyền giải quyết)</div>
            <div className="mb-2">Tên tôi là: ………  sinh ngày … tháng … năm …</div>
            <div className="mb-2">Thường trú tại: …………………...…………… </div>
            <div className="mb-2">Số CMND: ……………………………………… </div>
            <div className="mb-2">Ngày và nơi cấp: ……………………………… </div>
            <div className="mb-2">Hiện đang (làm gì, ở đâu): ………………… </div>
            <div className="mb-2">Khiếu nại về hành vi hành chính của: .... (Ghi tên người bị khiếu nại)</div>
            <div className="font-bold mt-4 mb-2">Giải trình vụ việc cần khiếu nại:</div>
            <div className="mb-2">- Nêu tóm tắt sự việc xảy ra, ngắn gọn, đủ tình tiết.</div>
            <div className="font-bold mt-4 mb-2">Yêu cầu giải quyết khiếu nại:</div>
            <div className="mb-2">- Đề nghị thẩm tra, xác minh (có thể giới thiệu tài liệu, chứng cứ, người biết việc làm chứng…)</div>
            <div className="mb-2">- Giải quyết lại theo đúng chính sách pháp luật, đúng quyền lợi hợp pháp.</div>
            <div className="mb-2">Tôi xin cam đoan về nội dung khiếu nại trên là đúng sự thật và xin chịu trách nhiệm về nội dung đã khiếu nại.</div>
            <div className="mb-2">Mong quý cơ quan sớm xét và giải quyết để bảo vệ quyền lợi cho …</div>
            <div className="mb-2">……………………………………… </div>
            <div className="mb-2">Xin chân thành cảm ơn quý cơ quan.</div>
            <div className="mb-2">…, ngày ... tháng … năm ...</div>
            <div className="font-bold mt-8 mb-2 text-center">Người làm đơn</div>
            <div className="text-center">(Ký tên và ghi rõ họ tên)</div>
        </div>
    );
}
