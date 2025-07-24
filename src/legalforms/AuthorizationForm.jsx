import React from "react";

export default function AuthorizationForm() {
    return (
        <div className="bg-white p-6 rounded shadow text-blue-900" style={{ fontFamily: 'Times New Roman, serif' }}>
            <div className="text-center font-bold text-lg mb-2">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
            <div className="text-center mb-2">Độc lập – Tự do – Hạnh phúc</div>
            <div className="text-center mb-2">--------------------</div>
            <div className="text-center font-bold text-xl mb-2">GIẤY ỦY QUYỀN</div>
            <div className="text-center mb-2">(Dành cho cá nhân)</div>
            <div className="mb-2">- Căn cứ Bộ luật Dân sự nước Cộng hòa xã hội chủ nghĩa Việt Nam.</div>
            <div className="mb-2">- Căn cứ vào các văn bản hiến pháp hiện hành.</div>
            <div className="mb-2">.................. , ngày ...... tháng ...... năm 20..... ; chúng tôi gồm có:</div>
            <div className="font-bold mt-4 mb-2">I. BÊN ỦY QUYỀN:</div>
            <div className="mb-2">Họ tên: .............................................................................................................</div>
            <div className="mb-2">Địa chỉ: .............................................................................................................</div>
            <div className="mb-2">Số CMND: ............................. cấp ngày: ..................... nơi cấp: .....................</div>
            <div className="mb-2">Quốc tịch: ...........................................................................................................</div>
            <div className="font-bold mt-4 mb-2">II. BÊN ĐƯỢC ỦY QUYỀN:</div>
            <div className="mb-2">Họ tên: .............................................................................................................</div>
            <div className="mb-2">Địa chỉ: .............................................................................................................</div>
            <div className="mb-2">Số CMND: ............................. cấp ngày: ..................... nơi cấp: .....................</div>
            <div className="mb-2">Quốc tịch: ...........................................................................................................</div>
            <div className="font-bold mt-4 mb-2">III. NỘI DUNG ỦY QUYỀN:</div>
            <div className="mb-2">.......................................................................................................................</div>
            <div className="mb-2">.......................................................................................................................</div>
            <div className="mb-2">.......................................................................................................................</div>
            <div className="font-bold mt-4 mb-2">IV. CAM KẾT</div>
            <div className="mb-2">- Hai bên cam kết sẽ hoàn toàn chịu trách nhiệm trước Pháp luật về mọi thông tin ủy quyền ở trên.</div>
            <div className="mb-2">- Mọi tranh chấp phát sinh giữa bên ủy quyền và bên được ủy quyền sẽ do hai bên tự giải quyết.</div>
            <div className="mb-2">Giấy ủy quyền trên được lập thành .......... bản, mỗi bên giữ .......... bản.</div>
            <div className="flex justify-between mt-8">
                <div className="text-center">
                    <div className="font-bold">BÊN ỦY QUYỀN</div>
                    <div>(Ký, họ tên)</div>
                </div>
                <div className="text-center">
                    <div className="font-bold">BÊN ĐƯỢC ỦY QUYỀN</div>
                    <div>(Ký, họ tên)</div>
                </div>
            </div>
        </div>
    );
}
