import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";

export function exportLandTransferContractToWord() {
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            alignment: "center",
            children: [
              new TextRun({
                text: "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM",
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            alignment: "center",
            children: [new TextRun("Độc lập - Tự do - Hạnh phúc")],
          }),
          new Paragraph({
            alignment: "center",
            children: [
              new TextRun({
                text: "HỢP ĐỒNG CHUYỂN NHƯỢNG",
                bold: true,
                size: 32,
              }),
            ],
          }),
          new Paragraph({
            alignment: "center",
            children: [new TextRun("QUYỀN SỬ DỤNG ĐẤT QUYỀN SỞ HỮU NHÀ Ở")],
          }),
          new Paragraph({
            alignment: "center",
            children: [new TextRun("(Số: ................/HĐCNQSDĐ)")],
          }),
          new Paragraph(
            "Hôm nay, ngày ….. tháng ……. năm .........., tại ............chúng tôi gồm:"
          ),
          new Paragraph({
            text: "BÊN CHUYỂN NHƯỢNG: (Sau đây gọi tắt là Bên A)",
            bold: true,
          }),
          new Paragraph(
            "- Ông:  ................................   Sinh năm:........... "
          ),
          new Paragraph(
            "  CMND/CCCD/Hộ chiếu số: .............. do ........................ cấp ngày..../...../............"
          ),
          new Paragraph(
            "  Hộ khẩu thường trú: .................................................................................."
          ),
          new Paragraph(
            "- Cùng vợ là bà:  ................................   Sinh năm:............. "
          ),
          new Paragraph(
            "  CMND/CCCD/Hộ chiếu số: .............. do .............................cấp ngày..../...../......"
          ),
          new Paragraph(
            "  Hộ khẩu thường trú: ..............................................................................................."
          ),
          new Paragraph({
            text: "BÊN NHẬN CHUYỂN NHƯỢNG:  (Sau đây gọi tắt là Bên B)",
            bold: true,
          }),
          new Paragraph(
            "- Ông:  ................................   Sinh năm:........... "
          ),
          new Paragraph(
            "  CMND/CCCD/Hộ chiếu số: .............. do ....................... cấp ngày..../...../............"
          ),
          new Paragraph(
            "  Hộ khẩu thường trú: .........................................................................................."
          ),
          new Paragraph(
            "- Cùng vợ là bà:  ................................   Sinh năm:............. "
          ),
          new Paragraph(
            "  CMND/CCCD/Hộ chiếu số: .............. do ................................cấp ngày..../...../......"
          ),
          new Paragraph(
            "  Hộ khẩu thường trú: ................................................................................"
          ),
          new Paragraph(
            "Hai Bên tự nguyện cùng nhau lập và ký Hợp đồng này để thực hiện việc chuyển nhượng quyền sử dụng đất, quyền sở hữu nhà ở theo các thoả thuận sau đây:"
          ),
          new Paragraph({
            text: "ĐIỀU 1: QUYỀN SỬ DỤNG ĐẤT, QUYỀN SỞ HỮU NHÀ Ở CHUYỂN NHƯỢNG",
            bold: true,
          }),
          new Paragraph(
            "1.1. Hiện Bên A đang có quyền sử dụng đất, quyền sở hữu nhà ở tại địa chỉ: .................................... theo   số ............ do ................ cấp ngày ......./........../............ "
          ),
          new Paragraph("Thông tin cụ thể như sau:"),
          new Paragraph("* Thửa đất:"),
          new Paragraph(
            "- Thửa đất số: ...................... - Tờ bản đồ: ................"
          ),
          new Paragraph(
            "- Địa chỉ: ............................................................................................."
          ),
          new Paragraph(
            "- Diện tích: ................ m2 (Bằng chữ: ....................................................)"
          ),
          new Paragraph(
            "- Hình thức sử dụng: Sử dụng riêng: ................. m2; Sử dụng chung: .......m2"
          ),
          new Paragraph("- Mục đích sử dụng: ..................."),
          new Paragraph("- Thời hạn sử dụng: ................."),
          new Paragraph(
            "- Nguồn gốc sử dụng: ......................................"
          ),
          new Paragraph("* Nhà ở:"),
          new Paragraph("- Địa chỉ: .........................."),
          new Paragraph("- Diện tích xây dựng: ............ m2"),
          new Paragraph("- Diện tích sàn: ............ m2"),
          new Paragraph("- Kết cấu: .................."),
          new Paragraph("- Cấp (hạng) nhà ở: .............."),
          new Paragraph("- Số tầng nhà ở: ............... tầng."),
          new Paragraph(
            "Ghi chú: ...................................................."
          ),
          new Paragraph(
            "1.2. Bằng Hợp đồng này Bên A đồng ý chuyển nhượng toàn bộ quyền sử dụng đất, quyền sở hữu nhà ở nói trên cho Bên B và Bên B đồng ý nhận chuyển nhượng toàn bộ quyền sử dụng đất, quyền sở hữu nhà ở nói trên như hiện trạng."
          ),
          new Paragraph({
            text: "ĐIỀU 2: GIÁ CHUYỂN NHƯỢNG VÀ PHƯƠNG THỨC THANH TOÁN",
            bold: true,
          }),
          new Paragraph(
            "2.1. Giá chuyển nhượng quyền sử dụng đất, quyền sở hữu nhà ở nêu tại Điều 1 của Hợp đồng này là: ........................ VNĐ (Bằng chữ: ……………….)."
          ),
          new Paragraph(
            "2.2. Phương thức thanh toán:  ......................................................................."
          ),
          new Paragraph(
            "Việc thanh toán số tiền nêu tại khoản 1 Điều này do hai bên tự thực hiện và tự chịu trách nhiệm trước pháp luật."
          ),
          new Paragraph({
            text: "ĐIỀU 3: QUYỀN VÀ NGHĨA VỤ CỦA BÊN A",
            bold: true,
          }),
          new Paragraph("3.1. Quyền của bên A"),
          new Paragraph(
            "- Có quyền nhận tiền chuyển nhượng theo đúng số tiền và hạn thanh toán do hai bên thỏa thuận."
          ),
          new Paragraph(
            "- Có quyền gia hạn để bên B hoàn thành nghĩa vụ, yêu cầu bên B trả lãi đối với số tiền chậm trả theo lãi suất do Ngân hàng Nhà nước công bố tương ứng với thời gian chậm trả tại thời điểm thanh toán."
          ),
          new Paragraph("3.2. Nghĩa vụ của bên A"),
          new Paragraph(
            "- Bên A có nghĩa vụ giao quyền sử dụng đất, quyền sở hữu nhà ở nêu tại Điều 1 của Hợp đồng này cùng các giấy tờ về quyền sử dụng đất, quyền sở hữu nhà ở cho bên B trước khi ký Hợp đồng."
          ),
          new Paragraph(
            "- Nộp thuế thu nhập cá nhân (nếu các bên thỏa thuận bên A nộp)."
          ),
          new Paragraph({
            text: "ĐIỀU 4: QUYỀN VÀ NGHĨA VỤ CỦA BÊN B",
            bold: true,
          }),
          new Paragraph("4.1. Nghĩa vụ của bên B"),
          new Paragraph(
            "- Trả đủ tiền, đúng thời hạn và đúng phương thức đã thỏa thuận cho bên A."
          ),
          new Paragraph(
            "- Thực hiện đăng ký quyền sử dụng đất, quyền sở hữu nhà ở tại cơ quan có thẩm quyền theo quy định của pháp luật."
          ),
          new Paragraph(
            "- Bên B chịu trách nhiệm nộp thuế thu nhập cá nhân (nếu thỏa thuận bên B nộp thay);"
          ),
          new Paragraph("- Chịu trách nhiệm nộp lệ phí trước bạ;"),
          new Paragraph(
            "- Chịu trách nhiệm nộp phí thẩm định hồ sơ cấp giấy chứng nhận theo quy định;"
          ),
          new Paragraph(
            "- Trả phí và thù lao công chứng hợp đồng chuyển nhượng;"
          ),
          new Paragraph("4.2. Quyền của bên B"),
          new Paragraph(
            "Nhận quyền sử dụng đất, quyền sở hữu nhà ở nêu tại Điều 1 của Hợp đồng này cùng các giấy tờ về quyền sử dụng đất, quyền sở hữu nhà ở từ bên A."
          ),
          new Paragraph({
            text: "ĐIỀU 5: PHƯƠNG THỨC GIẢI QUYẾT TRANH CHẤP HỢP ĐỒNG",
            bold: true,
          }),
          new Paragraph(
            "Trong quá trình thực hiện Hợp đồng này, nếu phát sinh tranh chấp, các bên cùng nhau thương lượng giải quyết trên nguyên tắc tôn trọng quyền lợi của nhau; Trong trường hợp không giải quyết được thì một trong hai bên có quyền khởi kiện để yêu cầu toà án có thẩm quyền giải quyết theo quy định của pháp luật."
          ),
          new Paragraph({ text: "ĐIỀU 6: CAM ĐOAN CỦA CÁC BÊN", bold: true }),
          new Paragraph(
            "Hai bên chịu trách nhiệm trước pháp luật về những lời cam đoan sau đây:"
          ),
          new Paragraph("1. Bên A cam đoan:"),
          new Paragraph(
            "- Những thông tin về nhân thân, về quan hệ hôn nhân và về quyền sử dụng đất, quyền sở hữu nhà ở đã nêu trong hợp đồng này là đúng sự thật;"
          ),
          new Paragraph("* Tại thời điểm giao kết Hợp đồng này:"),
          new Paragraph(
            "- Quyền sử dụng đất, quyền sở hữu nhà ở nói trên chưa tham gia bất cứ một giao dịch nào: Không tặng cho, cho thuê, cho mượn, cầm cố, đặt cọc, thế chấp, góp vốn;"
          ),
          new Paragraph(
            "- Quyền sử dụng đất, quyền sở hữu nhà ở không có tranh chấp, được phép chuyển nhượng theo quy định của pháp luật;"
          ),
          new Paragraph(
            "- Quyền sử dụng đất, quyền sở hữu nhà ở không bị kê biên để bảo đảm thi hành án;"
          ),
          new Paragraph(
            "- Quyền sử dụng đất, quyền sở hữu nhà ở không thuộc quy hoạch hoặc thuộc trường hợp bị giải phóng mặt bằng."
          ),
          new Paragraph(
            "- Có trách nhiệm tạo mọi điều kiện cho Bên B hoàn tất các thủ tục có liên quan đến việc đăng ký sang tên quyền sử dụng đất, quyền sở hữu nhà ở tại cơ quan Nhà nước có thẩm quyền."
          ),
          new Paragraph("2. Bên B cam đoan:"),
          new Paragraph(
            "- Những thông tin về nhân thân, về quan hệ hôn nhân mà Bên B cung cấp ghi trong hợp đồng là đúng sự thật;"
          ),
          new Paragraph(
            "- Bên B tự chịu trách nhiệm về việc tìm hiểu thông tin, đồng thời đã xem xét rất kỹ, biết rõ về thửa đất và nhà ở nêu tại Điều 1 của Hợp đồng này cùng các giấy tờ về quyền sử dụng đất và quyền sở hữu nhà ở nêu trên;"
          ),
          new Paragraph("3. Hai bên cam đoan:"),
          new Paragraph(
            "- Đảm bảo tính chính xác, trung thực và hoàn toàn chịu trách nhiệm trước pháp luật nếu có sự giả mạo về hồ sơ, giấy tờ cung cấp cũng như các hành vi gian lận hay vi phạm pháp luật khác liên quan tới việc ký kết hợp đồng này;"
          ),
          new Paragraph(
            "- Việc giao kết Hợp đồng này hoàn toàn tự nguyện, không bị lừa dối, không bị ép buộc;"
          ),
          new Paragraph(
            "- Thực hiện đúng và đầy đủ các thoả thuận đã ghi trong Hợp đồng này;"
          ),
          new Paragraph({ text: "ĐIỀU 7: ĐIỀU KHOẢN CUỐI CÙNG", bold: true }),
          new Paragraph(
            "Hợp đồng này có hiệu lực ngay sau khi hai Bên ký kết. Việc sửa đổi, bổ sung hoặc huỷ bỏ Hợp đồng này chỉ có giá trị khi được hai Bên lập thành văn bản và chỉ được thực hiện khi Bên B chưa đăng ký sang tên quyền sử dụng đất và quyền sở hữu nhà ở theo Hợp đồng này."
          ),
          new Paragraph(
            "Hai bên đã tự đọc nguyên văn, đầy đủ các trang của bản Hợp đồng này và không yêu cầu chỉnh sửa, thêm, bớt bất cứ thông tin gì trong bản hợp đồng này. Đồng thời hiểu rõ quyền, nghĩa vụ, lợi ích hợp pháp của mình và hậu quả pháp lý của việc giao kết Hợp đồng này."
          ),
          new Paragraph({
            alignment: "center",
            children: [new TextRun({ text: "", break: 1 })],
          }),
          new Paragraph({
            alignment: "center",
            children: [
              new TextRun({ text: "BÊN CHUYỂN NHƯỢNG (Bên A)", bold: true }),
            ],
          }),
          new Paragraph({
            alignment: "center",
            children: [new TextRun("(Ký, ghi rõ họ tên)")],
          }),
          new Paragraph({
            alignment: "center",
            children: [
              new TextRun({
                text: "BÊN NHẬN CHUYỂN NHƯỢNG (Bên B)",
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            alignment: "center",
            children: [new TextRun("(Ký, ghi rõ họ tên)")],
          }),
        ],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    const file = new Blob([blob], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    saveAs(file, "Hop_dong_chuyen_nhuong_nha_dat.docx");
  });
}
