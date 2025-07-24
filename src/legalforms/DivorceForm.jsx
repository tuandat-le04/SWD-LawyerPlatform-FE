import React from "react";

export default function DivorceForm() {
    return (
        <div className="bg-white p-6 rounded shadow text-blue-900" style={{ fontFamily: 'Times New Roman, serif' }}>
            <div className="text-center font-bold text-lg mb-2">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
            <div className="text-center mb-2">Độc lập - Tự do - Hạnh phúc</div>
            <div className="text-center mb-2">…….., ngày ….. tháng …. năm ………</div>
            <div className="text-center font-bold text-xl mb-2">ĐƠN YÊU CẦU GIẢI QUYẾT VIỆC DÂN SỰ</div>
            <div className="text-center mb-2">(V/v: Công nhận thuận tình ly hôn và thỏa thuận về con cái, tài sản)</div>
            <div className="mb-2">Kính gửi: Tòa án nhân dân ……………………………………………………..</div>
            <div className="font-bold mt-4 mb-2">Họ tên người yêu cầu:</div>
            <div className="mb-2">1. Tên chồng: …...…………………………….. Sinh năm: ……………………. </div>
            <div className="mb-2">Địa chỉ:............................................................................................................</div>
            <div className="mb-2">Số điện thoại: …………………(nếu có); số fax: ……………….……….(nếu có)</div>
            <div className="mb-2">Địa chỉ thư điện tử: ………....................................................................... (nếu có)</div>
            <div className="mb-2">2. Tên vợ: …...…………………………….. Sinh năm: ………...……………….</div>
            <div className="mb-2">Địa chỉ:.............................................................................................................</div>
            <div className="mb-2">Số điện thoại: …………………(nếu có); số fax: ……………….……….(nếu có)</div>
            <div className="mb-2">Địa chỉ thư điện tử: ………....................................................................... (nếu có)</div>
            <div className="mt-4">Chúng tôi xin trình bày với Tòa án nhân dân……………….. việc như sau: </div>
            <div className="font-bold mt-4 mb-2">1. Những vấn đề yêu cầu Tòa án giải quyết:</div>
            <div className="mb-2">- Về quan hệ hôn nhân: ………………………………………………………….</div>
            <div className="mb-2">- Về con chung:.......................................................................................................</div>
            <div className="mb-2">- Về tài sản chung: ……..........................................................................................</div>
            <div className="mb-2">- Về công nợ:..........................................................................................................</div>
            <div className="font-bold mt-4 mb-2">2. Lý do, mục đích yêu cầu Tòa án giải quyết những vấn đề nêu trên:</div>
            <div className="mb-2">…………………………………………………………………………………</div>
            <div className="font-bold mt-4 mb-2">3. Căn cứ của việc yêu cầu Tòa án giải quyết những vấn đề nêu trên:</div>
            <div className="mb-2">…………………………………………………………………………………</div>
            <div className="font-bold mt-4 mb-2">4. Tên và địa chỉ của những người có liên quan đến những vấn đề yêu cầu Tòa án giải quyết:</div>
            <div className="mb-2">………….……………………………………………………………………..</div>
            <div className="font-bold mt-4 mb-2">5. Thông tin khác:</div>
            <div className="mb-2">…………………………………………………………………………………</div>
            <div className="font-bold mt-4 mb-2">Danh mục tài liệu, chứng cứ kèm theo đơn gồm có:</div>
            <div className="mb-2">1. Chứng minh nhân dân (bản chứng thực)</div>
            <div className="mb-2">2. Sổ hộ khẩu (Bản chứng thực)</div>
            <div className="mb-2">3. Giấy khai sinh (Bản chứng thực)</div>
            <div className="mb-2">4. Đăng ký kết hôn</div>
            <div className="mb-2">5. Một số giấy tờ khác có liên quan</div>
            <div className="mb-2">Tôi cam kết những lời khai trong đơn là hoàn toàn đúng sự thực.</div>
            <div className="font-bold mt-8 mb-2 text-center">NGƯỜI YÊU CẦU</div>
            <div className="flex justify-between mt-8">
                <div className="text-center">
                    <div className="font-bold">Vợ</div>
                </div>
                <div className="text-center">
                    <div className="font-bold">Chồng</div>
                </div>
            </div>
        </div>
    );
}
